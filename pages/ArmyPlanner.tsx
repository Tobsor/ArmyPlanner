import React, { useEffect, useState } from "react";

import ArmyPlannerBoard from "../components/ArmyPlannerBoard/ArmyPlannerBoard";
import HeroTile from "../components/HeroTile/HeroTile";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const ArmyPlanner = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch("/api/get-all-heroes", {
      method: "post",
    })
      .then(data => data.json())
      .then(data => setHeroes(data))
  }, []);

  return <DragDropContext>
    <Droppable droppableId="selected">
      {(provided) => (
        <ul
          {...provided.droppableProps}
          ref={provided.innerRef}
        > {
            heroes.map((hero, index) =>
              <HeroTile
                hero={hero}
                index={index}
              />
            )
          }
        </ul>
      )}
    </Droppable>
  </DragDropContext>
};

export default ArmyPlanner;