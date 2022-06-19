import React from "react";

import ArmyPlannerBoard from "../components/ArmyPlannerBoard/ArmyPlannerBoard";
import HeroOverview from "../components/HeroOverview/HeroOverview";

export const ArmyPlanner = () => {
  return <div>
    <ArmyPlannerBoard />
    <HeroOverview />
  </div>
};

export default ArmyPlanner;