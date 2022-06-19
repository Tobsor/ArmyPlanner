import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';

import styles from "./layout.module.scss";

export const Footer = () => {
  const [routingVal, setRoutingValue] = useState("");
  const rooter = useRouter();

  return (
    <div className={styles.footer}>
      <BottomNavigation
        showLabels
        value={routingVal}
        onChange={(event, newValue) => {
          rooter.push(newValue);
          setRoutingValue(newValue)
        }}
      >
        <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction value="/hero/add" label="New Hero" icon={<AddIcon />} />
        <BottomNavigationAction value="/armyPlanner" label="Army Planner" icon={<PeopleIcon />} />
      </BottomNavigation>
    </div>
  );
}