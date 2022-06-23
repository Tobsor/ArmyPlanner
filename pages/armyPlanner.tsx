import React, { useEffect, useState } from "react";

import { DragDropContext } from 'react-beautiful-dnd';

import styles from "./armyPlanner.module.scss";
import { HeroListDraggable } from "../components/HeroListDraggable/HeroListDraggable";
import { HeroSummary } from "../components/HeroSummary/HeroSummary";
import { Button } from "@mui/material";

import ReplyIcon from '@mui/icons-material/Reply';
import { useRouter } from "next/router";

import type { GetServerSideProps } from "next";

interface Props {
  host: string;
};

export const ArmyPlanner = (props: Props) => {
  const [heroes, setHeroes] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);

  const draggableIds = ["selectedHeroes", "nonSelectedHeroes"];

  const router = useRouter();

  const { host } = props;

  const fetchHeroes = () => {
    return fetch("/api/get-all-heroes", {
      method: "post",
    })
      .then(data => data.json())
  }

  useEffect(() => {
    const preselected = router.query.selected || [];

    fetchHeroes()
      .then(data => {
        if(!preselected || !preselected.length) {
          setHeroes(data);
          return;
        }

        const preselectedHeroes = data.filter(hero => preselected.includes(hero.id));
        const rest = data.filter(hero => !preselected.includes(hero.id));

        setHeroes(rest);
        setSelectedHeroes(preselectedHeroes);
      });
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const draggableConfig = {
      [draggableIds[0]]: {
        items: selectedHeroes,
        setter: setSelectedHeroes,
      },
      [draggableIds[1]]: {
        items: heroes,
        setter: setHeroes,
      }
    }

    const from = draggableConfig[result.source.droppableId];
    const to = draggableConfig[result.destination.droppableId]

    if (result.destination.droppableId === result.source.droppableId) {
      const items = Array.from(from.items);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      from.setter(items);
      return;
    }

    const fromItems = Array.from(from.items);
    const toItems = Array.from(to.items);

    const [reorderedItem] = fromItems.splice(result.source.index, 1);
    toItems.splice(result.destination.index, 0, reorderedItem);

    from.setter(fromItems);
    to.setter(toItems);
  }

  const generateShareLink = () => {
    const allSelectedIds = selectedHeroes.map(hero => hero.id);

    const link = `${host}/${router.asPath}?selected=${allSelectedIds}`;

    navigator.clipboard.writeText(link);
  };

  return <div className={styles.root}>
    <div className={styles.dragzone}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Button
          variant="outlined" 
          onClick={generateShareLink}
          startIcon={<ReplyIcon />}
          className={styles.shareButton}
        >Share</Button>
        <HeroListDraggable
          heroes={selectedHeroes}
          droppableId={draggableIds[0]}
          className={styles.selected}
        />
        <HeroListDraggable
          heroes={heroes}
          droppableId={draggableIds[1]}
        />
      </DragDropContext>
    </div>
    <HeroSummary heroes={selectedHeroes} />
  </div>
};

export const getServerSideProps: GetServerSideProps<Props> =
  async context => ({ props: { host: context.req.headers.host || null } });

export default ArmyPlanner;
