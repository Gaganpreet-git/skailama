import React from "react";
import styles from "./ProjectCard.module.css";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ name, totalFiles, lastUpdated ,projectId}) => {
  const navigate = useNavigate();
  const handleClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div onClick={()=>{handleClick(projectId)}} className={styles.ProjectCard}>
      <div className={styles.projectImage}>AB</div>
      <div className={styles.projectDetails}>
        <div className={styles.projectName}>{name}</div>
        <div className={styles.files}>{totalFiles}</div>
        <div className={styles.lastEdited}>Last edited  {lastUpdated}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
