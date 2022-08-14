import React from "react";

import { TableCell, TableRow } from "@mui/material";

import { ColDef } from "../HeroList";
import { PlayerHero } from "../../../pages";

import styles from "./HeroListItem.module.scss";

interface Props {
  hero: PlayerHero,
  columnDef: ColDef[],
}

export const HeroLostItem = (props: Props) => {
  const { hero, columnDef } = props;

  const classList = [
    styles.iconCell,
    styles.heroNameCell,
    styles.heroPowerCell,
  ]

  return <TableRow
    key={hero.name}
  >
    {
      columnDef.map(({ getValue }, index) => 
        <TableCell className={classList[index]}>{getValue(hero)}</TableCell>
      )
    }
  </TableRow>

}