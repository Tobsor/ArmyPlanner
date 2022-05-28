import React from "react";

import styles from "./layout.module.scss";

const Header: React.FC = () => {

  return (
    <div className={styles.header}>
      <h1>
        *Icon* ArmyPlanner
      </h1>
    </div>
  );
};

export default Header;
