import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { ReactComponent as HeroImage } from "../../assets/images/hero.svg";
import Button from "../../components/Button/Button";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Card from "../../components/Card/Card";
import TextInput from "../../components/TextInput/TextInput";
import Modal from "../../components/Modal/Modal";
import HeaderWrapper from "../../layouts/HeaderWrapper/HeaderWrapper";
import moment from "moment";


const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/project`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);

      setProjects(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreate = async () => {
    if (!projectName) {
      alert("Please enter a project name");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: projectName,
        }),
      });
      const data = await res.json();

      setProjects([...projects, data]);
      setIsModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  
  return (
    <div className={styles.homepage}>
      <HeaderWrapper>
        {projects.length > 0 ? (
          <>
            <header className={styles.header}>
              <h3>Projects</h3>
              <Button onClick={showModal}>Create New Project</Button>
            </header>

            <div className={styles.projects}>
              {projects.map((project) => (
                <div key={project.id}>
                    <ProjectCard
                      projectId={project._id}
                      name={project.name}
                      totalFiles={project.podcastsCount || 0}
                      lastUpdated={moment(project.updatedAt).fromNow()}
                    />
                </div>
              ))}
            </div>

            {isModalOpen && (
              <Modal className={styles.modal}>
                <Card className={styles.modalCard}>
                  <h1>Create Project</h1>
                  <TextInput
                    className={styles.input}
                    onChange={(e) => setProjectName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Type here"
                    label="Enter Project Name:"
                  />
                  <div className={styles.modalBtnContainer}>
                    <Button
                      className={styles.cancelModalBtn}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={styles.createModalBtn}
                      onClick={handleCreate}
                    >
                      Create
                    </Button>
                  </div>
                </Card>
              </Modal>
            )}
          </>
        ) : (
          <>
            <h1 className={styles.heading}>Create a New Project</h1>
            <HeroImage className={styles.heroImage} />
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in.
            </p>
            <Button onClick={showModal}>Create New Project</Button>

            {isModalOpen && (
              <Modal className={styles.modal}>
                <Card className={styles.modalCard}>
                  <h1>Create Project</h1>
                  <TextInput
                    className={styles.input}
                    onChange={(e) => setProjectName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Type here"
                    label="Enter Project Name:"
                  />
                  <div className={styles.modalBtnContainer}>
                    <Button
                      className={styles.cancelModalBtn}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={styles.createModalBtn}
                      onClick={handleCreate}
                    >
                      Create
                    </Button>
                  </div>
                </Card>
              </Modal>
            )}
          </>
        )}
      </HeaderWrapper>
    </div>
  );
};

export default HomePage;
