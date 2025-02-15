import React from "react";
import styles from "./SidebarWrapper.module.css";
import Sidebar from "../components/Sidebar/Sidebar";

const SidebarWrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <aside>
        <Sidebar></Sidebar>
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default SidebarWrapper;
