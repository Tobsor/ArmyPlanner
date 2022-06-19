import React from "react";

import { Droppable } from 'react-beautiful-dnd';

export const ArmyPlannerBoard = () => {
  return <Droppable droppableId="selected">
    {(provided) => (
      <p  {...provided.droppableProps} ref={provided.innerRef}>Dropzone</p>
    )}
  </Droppable>;
}

export default ArmyPlannerBoard;