import React, { useEffect, useState } from "react";
import styles from "./PodcastDetails.module.css";
import Card from "../../components/Card/Card";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import SidebarWrapper from "../../layouts/SidebarWrapper";

const PodcastDetails = () => {
  const [podcast, setPodcast] = useState(null);
  const [updatedTranscript, setUpdatedTranscript] = useState("");
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTranscript(podcast?.transcript || "");
  };

  useEffect(() => {
    fetchPodcast(id);
  }, []);

  const handleTranscriptChange = (e) => {
    setUpdatedTranscript(e.target.value);
  };

  const handleUpdate = async () => {
    setIsEditing(false);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/podcast/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ transcript: updatedTranscript }),
      });
      const data = await res.json();

      console.log(data);

      setPodcast(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchPodcast = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/podcast/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setPodcast(data);
      setUpdatedTranscript(data.transcript);
    } catch (error) {
      alert(error.message);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.podcastDetails}>
      <SidebarWrapper>
        <main >
          {/* <Card className={styles.card}> */}
          <p className={styles.goBackBtn } onClick={goBack}> &lt; Edit Transcript</p>
          <div className={styles.btnContainer}>
            {!isEditing && (
              <Button onClick={handleEdit} className={styles.editBtn}>
                Edit
              </Button>
            )}
            {isEditing && (
              <Button onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </Button>
            )}
            {isEditing && (
              <Button onClick={handleUpdate} className={styles.updateBtn}>
                Save
              </Button>
            )}
            </div>

            <TextInput
            type="textarea"
              value={updatedTranscript}
              onChange={handleTranscriptChange}
              readOnly={!isEditing}
              className={styles.transcriptInput}
            />
          {/* </Card> */}
        </main>
      </SidebarWrapper>
    </div>
  );
};

export default PodcastDetails;
