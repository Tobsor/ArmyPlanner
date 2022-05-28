import { Hero } from "@prisma/client";
import React from "react";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { ColDef } from "../HeroList";

interface Props {
  hero: Hero,
  columnDef: ColDef[],
}

export const HeroLostItem = (props: Props) => {
  const { hero, columnDef } = props;

  return <TableRow
    key={hero.name}
  >
    {
      columnDef.map(({ getValue }) => 
        <TableCell>{getValue(hero)}</TableCell>
      )
    }
  </TableRow>

}