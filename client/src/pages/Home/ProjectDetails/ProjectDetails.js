import React, { useEffect, useState } from "react";
import styles from "./ProjectDetails.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AddPodcastCard from "../../../components/AddPodcastCard/AddPodcastCard";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import Card from "../../../components/Card/Card";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import SidebarWrapper from "../../../layouts/SidebarWrapper";
import {ReactComponent as RssFeedIcon} from "../../../assets/images/icons/rss.svg";
import {ReactComponent as YoutubeIcon} from "../../../assets/images/icons/youtube.svg";
import {ReactComponent as UploadIcon} from "../../../assets/images/icons/upload.svg";

const ProjectDetails = () => {
  const { id } = useParams();
  const [podcasts, setPodcasts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    transcript: "",
  });

  const addPodcast = async (formData) => {
    if (!formData.name || !formData.transcript) {
      alert("Please fill both fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/podcast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...formData, projectId: id }),
      });
      const data = await res.json();
      console.log(data);
      setPodcasts((prev) => [...prev, data]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name, "Value:", value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    setFormData({
      name: "",
      transcript: "",
    });
    addPodcast(formData);
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchPodcasts(id);
  }, []);

  const fetchPodcasts = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/podcasts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setPodcasts(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const projectDetailsData = [
    {
      heading: "RSS Feed",
      description: "Lorem ipsum dolor sit.Dolor lorem sit.",
      image: <RssFeedIcon/>,
    },
    {
      heading: "Youtube Video",
      description: "Lorem ipsum dolor sit.Dolor lorem sit.",
      image: <YoutubeIcon/>,
    },
    {
      heading: "Upload Files",
      description: "Lorem ipsum dolor sit.Dolor lorem sit.",
      image: <UploadIcon/>,
    },
  ];

  const handleDelete = async (podcastId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this podcast?"
    );

    if (!isConfirmed) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/podcast/${podcastId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setPodcasts((prev) =>
        prev.filter((podcast) => podcast._id !== podcastId)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleView = async (podcastId) => {
    navigate(`/podcast/${podcastId}`);
  };

  return (
    <div className={styles.ProjectDetails}>
      <SidebarWrapper>
        <main>
          <h1>Add Podcast</h1>
          <div className={styles.addPodcastOptions}>
            {projectDetailsData.map((project) => (
              <div key={project.heading}>
                <AddPodcastCard
                  onClick={openModal}
                  heading={project.heading}
                  description={project.description}
                  image={project.image}
                />
              </div>
            ))}
          </div>

          {isModalOpen && (
            <Modal onClose={closeModal}>
              <Card className={styles.uploadModalCard}>
                <h2>Upload from</h2>
                <TextInput
                className={styles.uploadModalInput}
                  label="Name"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="name"
                  value={formData.name || ""}
                />
                <TextInput
                                className={styles.uploadModalInput}

                  label="Transcript"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="transcript"
                  value={formData.transcript || ""}
                />
                <Button
                  className={styles.uploadModalButton}
                  onClick={handleSubmit}
                >
                  upload
                </Button>
                <span className={styles.closeModalBtn} onClick={closeModal}>X</span>
              </Card>
            </Modal>
          )}

          <div className={styles.container}>
            <h3 className={styles.title}>Your Files</h3>
            <div className={styles.table}>
              <div className={styles.row + " " + styles.header}>
                <div className={styles.cell}>No.</div>
                <div className={styles.cell}>Name</div>
                <div className={styles.cell}>Upload Date & Time</div>
                <div className={styles.cell}>Action</div>
              </div>

              {podcasts.map((podcast, i) => (
                <div key={i} className={styles.row}>
                  <div className={styles.cell}>{i + 1}</div>
                  <div className={styles.cell}>{podcast.name}</div>
                  <div className={styles.cell}>{podcast.createdAt}</div>
                  <div className={styles.cell + " " + styles.actions}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => {
                        handleView(podcast._id);
                      }}
                    >
                      View
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        handleDelete(podcast._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </SidebarWrapper>
    </div>
  );
};

export default ProjectDetails;
