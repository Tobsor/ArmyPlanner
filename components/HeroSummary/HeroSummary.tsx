import React, { useMemo } from "react";
import { Hero } from "@prisma/client";

interface Props {
  heroes: Hero[];
}

export const HeroSummary = (props: Props) => {
  const { heroes } = props;

  const heroesProps = [
    {
      propName: "attackPower",
      label: "Attack Power",
    }
  ];

  const allAggregatedValues = useMemo(() => {
    return heroes.reduce((aggregated, hero) => {
      heroesProps.forEach(({ propName }) => (aggregated[propName] += hero[propName]));

      return aggregated;
    }, { attackPower: 0 })
  }, [heroes]);

  return <div>
    {heroesProps.map(prop => <p>{prop.label}: {allAggregatedValues[prop.propName]}</p>)}
  </div>
}

export default HeroSummary;