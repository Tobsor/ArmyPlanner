import { Hero } from "@prisma/client";
import React from "react";

interface Props {
  heroes: Hero[],
}

export const HeroOverview = (props: Props) => {
  const {
    heroes
  } = props;

  return <div>
    { 
      heroes.map(hero => <p>{hero.name}</p>)
    }
  </div>;
}

export default HeroOverview;