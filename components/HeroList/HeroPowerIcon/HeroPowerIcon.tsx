import React from "react";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export type StarState = 'full' | 'half' | 'empty';

interface Props {
  type: StarState;
  level: number;
  clickHandler: (level: number) => void
}

const HeroPowerIcon = (props: Props) => {
  const { type, level, clickHandler } = props;

  switch(type){
    case 'full': return <StarIcon onClick={() => clickHandler(level + 1)} />
    case 'half': return <StarHalfIcon onClick={() => clickHandler(level + 1)} />
    case 'empty':
    default: return <StarOutlineIcon onClick={() => clickHandler(level + 1)} />
  }
}

export default HeroPowerIcon;