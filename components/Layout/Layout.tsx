import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { ReactNode } from "react";
import { Footer } from "./Footer";
import Header from "./Header";

import styles from "./layout.module.scss";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className={styles.root}>
    <Header />
    <div className={styles.content}>{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
