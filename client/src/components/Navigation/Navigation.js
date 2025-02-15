import React from "react";
import { ReactComponent as NotificationIcon } from "../../assets/images/icons/notifications.svg";
import { ReactComponent as SettingsIcon } from "../../assets/images/icons/settings.svg";

import styles from "./Navigation.module.css";

const icons = [
    { id: 1, Component: SettingsIcon },
    { id: 2, Component: NotificationIcon },
  ];
  
  const Navigation = () => {
    return (
      <div className={styles.navigation}>
        <ul>
          {icons.map(({ id, Component }) => (
            <li key={id}>
              <Component className={styles.icon} />
            </li>
          ))}
        </ul>
      </div>
    );
  };
export default Navigation;
