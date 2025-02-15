import React from "react";
import Card from "../Card/Card";
import styles from "./AddPodcastCard.module.css";

const AddPodcastCard = ({heading , description , image , onClick}) => {
  return (
      <Card>
        <div className={styles.card} onClick={onClick}>
      <div className={styles.text}>
        <div className={styles.heading}>{heading}</div>

        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.image}>{image}</div>
    </div>
    </Card>
  );
};

export default AddPodcastCard;
