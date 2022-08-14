import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { ReactElement } from "react";
import { PlayerHero } from "../../pages";
import { useAppContext } from "../../src/context/state";
import HeroListItem from "./HeroListItem";
import HeroPowerIcon from "./HeroPowerIcon/HeroPowerIcon";


interface Props {
  heroes: PlayerHero[];
  refetch: () => void;
}

export interface ColDef {
  label: string,
  getValue: (hero: PlayerHero) => string | ReactElement[],
}

const updateHeroInstance = (power: number, heroInstanceId: number, refetch: () => void) => {
  fetch("/api/update-hero-instance", {
    method: "post",
    body: JSON.stringify({
      heroInstanceId,
      power,
    })
  }).then(() => refetch());
}

const createHeroInstance = (power: number, heroId: number, authorId: number, refetch: () => void) => {
  return fetch("/api/create-hero-instance", {
    method: "post",
    body: JSON.stringify({
      heroId,
      power,
      authorId,
    })
  }).then(() => refetch());;
}

const getHeroIcon = (hero: PlayerHero): ReactElement => {
  return [<Avatar
    alt="error"
    src={`https://armyplannerimages.s3.eu-central-1.amazonaws.com/${hero.img}`}
  />]
}

const getHeroPower = (hero: PlayerHero, refetch: () => void) => {
  const {
    power,
    instantiated,
    heroId,
    heroInstanceId,
  } = hero;
  
  const [state] = useAppContext();
  
  const clickHandler = instantiated ?
    (level) => updateHeroInstance(level, heroInstanceId, refetch) :
    (level) => createHeroInstance(level, heroId, state.user.id, refetch);

  return [...Array(5)].map((_, level) => {
    let type = 'full';
    if(power - 0.5 === level) type = 'half';
    if(power <= level) type = 'empty';

    return <HeroPowerIcon
      type={type}
      level={level}
      clickHandler={clickHandler}
    />
  });
}

export const HeroList = (props: Props) => {
  const {
    heroes = [],
    refetch
  } = props;

  const columnDef: ColDef[] = [
    {
      label: "Name",
      getValue: (hero: PlayerHero) => getHeroIcon(hero),
    },
    {
      label: "Name",
      getValue: (hero: PlayerHero) => hero.name
    },
    {
      label: "Power",
      getValue: (hero: PlayerHero) => getHeroPower(hero, refetch),
    }
  ];

  return <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columnDef.map(({ label }) =>
                <TableCell>{label}</TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            heroes.map(hero =>
              <HeroListItem
                key={hero.heroId}
                hero={hero}
                columnDef={columnDef}
              />
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  </div>
}

export default HeroList;