import React, { useEffect, useState } from "react";

import ArmyPlannerBoard from "../components/ArmyPlannerBoard/ArmyPlannerBoard";
import HeroOverview from "../components/HeroOverview/HeroOverview";

export const ArmyPlanner = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch("/api/get-all-heroes", {
      method: "post",
    })
      .then(data => data.json())
      .then(data => setHeroes(data))
  }, []);

  return <div>
    <ArmyPlannerBoard />
    <HeroOverview heroes={heroes}/>
  </div>
};

export default ArmyPlanner;