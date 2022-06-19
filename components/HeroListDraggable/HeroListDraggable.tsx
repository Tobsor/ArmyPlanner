import { Hero } from "@prisma/client";
import React from "react";

import { Droppable } from 'react-beautiful-dnd';
import HeroTile from "../HeroTile/HeroTile";

interface Props {
  heroes: Hero[];
  droppableId: string;
  className?: string;
}

export const HeroListDraggable = (props: Props) => {
  const {
    heroes,
    droppableId,
    className,
  } = props;

  return (
    <div className={className}>
        <Droppable droppableId={droppableId} direction="horizontal">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
            > {
                heroes.map((hero, index) =>
                  <HeroTile
                    hero={hero}
                    index={index}
                    key={hero.name}
                  />
                )
              }
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
  )
}