import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const navigation = [
    {
      icon: 1,
      text: "Add your Podcast(s)",
    },
    {
      icon: 2,
      text: "Create & Repurpose",
    },
    {
      icon: 2,
      text: "Podcast Widget",
    },
    {
      icon: 2,
      text: "Upgrade",
    },
  ];
  const footer = [
    {
      icon: 1,
      text: "Help",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
        <span onClick={toggleSidebar} className={styles.openBtn}>
            {!isSidebarOpen ?  ">" : null}
          </span>
      {isSidebarOpen && (
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <Logo />
          </div>

        
          <span onClick={toggleSidebar} className={styles.closeBtn}>
            {isSidebarOpen ? "<" : ">"}
          </span>

          {navigation.map((item, index) => (
            <div key={index} className={styles.navigation}>
              <div className={styles.navigationItem}>
                <p>{item.icon}</p>
                <p>{item.text}</p>
              </div>
            </div>
          ))}

          <hr />

          <div className={styles.footer}>
            {footer.map((item, index) => (
              <div key={index} className={styles.navigation}>
                <div className={styles.navigationItem}>
                  <p>{item.icon}</p>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
            <hr />
            <div className={styles.userDetails}>
              <div className={styles.img}>img</div>
              <div className={styles.userDetailsText}>
                <div className={styles.username}>username</div>
                <div className={styles.email}>email</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
