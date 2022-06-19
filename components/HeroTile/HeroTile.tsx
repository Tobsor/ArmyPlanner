import { Hero } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  hero: Hero,
  index: number,
}

export const HeroTile = (props: Props) => {
  const {
    hero,
    index,
  } = props;

  return (
    <Draggable
      key={hero.id.toString()}
      draggableId={hero.id.toString()}
      index={index}
    >
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {hero.name}
          <Image
            src={`https://armyplannerimages.s3.eu-central-1.amazonaws.com/${hero.img}`}
            height="200"
            width="200"
          />
        </li>
      )}
    </Draggable>
  )
}

export default HeroTile;