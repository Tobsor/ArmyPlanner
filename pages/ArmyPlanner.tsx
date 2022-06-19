import React, { useEffect, useState } from "react";

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import styles from "./armyPlanner.module.scss";
import { HeroListDraggable } from "../components/HeroListDraggable/HeroListDraggable";
import { RestaurantMenu } from "@mui/icons-material";

export const ArmyPlanner = () => {
  const [heroes, setHeroes] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  
  const draggableIds = ["selectedHeroes", "nonSelectedHeroes"];

  useEffect(() => {
    fetch("/api/get-all-heroes", {
      method: "post",
    })
      .then(data => data.json())
      .then(data => setHeroes(data))
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const draggableConfig = {
      [draggableIds[0]] :{
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

    if(result.destination.droppableId === result.source.droppableId) {
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

  return <div className={styles.root}>
    <DragDropContext onDragEnd={handleOnDragEnd}>
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
};

export default ArmyPlanner;