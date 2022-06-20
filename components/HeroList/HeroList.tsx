import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Hero } from "@prisma/client";
import React from "react";
import HeroListItem from "./HeroListItem";

interface HeroWithAuthor extends Hero {
  author: {
    id: string,
    name: string,
  }
}

interface Props {
  heroes: HeroWithAuthor[]
}

export interface ColDef {
  label: string,
  getValue: (hero: Hero) => string,
}

export const HeroList = (props: Props) => {
  const {
    heroes = []
  } = props;

  const columnDef: ColDef[] = [
    {
      label: "Name",
      getValue: (hero: Hero) => hero.name
    },
    {
      label: "Attack Power",
      getValue: (hero: Hero) => hero.attackPower.toString()
    },
    {
      label: "Author",
      getValue: (hero: HeroWithAuthor) => hero.author.name
    },
    {
      label: "Updated",
      getValue: (hero: Hero) => new Date(hero.updatedAt).toISOString()
    },
    {
      label: "Created",
      getValue: (hero: Hero) => new Date(hero.createdAt).toISOString()
    },
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
              <HeroListItem hero={hero} columnDef={columnDef} />
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  </div>
}

export default HeroList;