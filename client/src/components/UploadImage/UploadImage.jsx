import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Webcam from "react-webcam";
import api from "../../services/api";
import PlaylistDetails from "../playlists/PlaylistDetails";
import styles from "../UploadImage/UploadImage.module.css";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showImageLimitModal, setShowImageLimitModal] = useState(false);
  const [showPlaylistsBtn, setShowPlaylistsBtn] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);

  const fileInputRef = useRef();
  const webcamRef = useRef();
  const { user } = useContext(AuthContext);

  const handleReset = () => {
    setImage(null);
    setPreviewUrl(null);
    setMood(null);
    setPlaylists([]);
    setShowPlaylistsBtn(true);
    setShowOptions(false);
    setShowWebcam(false);
    setLoading(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMood(null);
    setPlaylists([]);
    if (!image || !user) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await api.post("/images/upload", formData);
      setMood(res.data.mood.trim().toLowerCase());
    } catch (err) {
      const error = err?.response?.data?.error || err.message;
      if (err?.response?.status === 403 && error.includes("Free users can store up to 4 images")) {
        setShowImageLimitModal(true);
      } else {
        setMood("Error: " + error);
      }
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowOptions(false);
      setMood(null);
      setPlaylists([]);
    }
  };

  const handleTakePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
        setImage(file);
        setPreviewUrl(imageSrc);
        setShowWebcam(false);
        setShowOptions(false);
        setMood(null);
        setPlaylists([]);
      });
  };

  const fetchPlaylistsByMood = async () => {
    setShowPlaylistsBtn(false);
    try {
      const res = await api.get(`/playlists/bymood/${mood}`);
      if (res.data) {
        setPlaylists([res.data]);
        await api.post(`/playlists/${res.data.id}/save`);
      } else {
        alert("No playlist found for this mood.");
      }
    } catch (err) {
      const error = err?.response?.data?.error || err.message;
      if (err?.response?.status === 403 && error.includes("Free users can only create")) {
        setShowLimitModal(true);
      } else {
        alert("Error loading playlist: " + error);
      }
    }
  };

  return (
     <div className={styles.uploadPageBg}>
  <form onSubmit={handleUpload} className={styles.uploadForm}>
    {(image || mood || playlists.length > 0 || showWebcam) && (
      <button
        type="button"
        onClick={handleReset}
        className={styles.resetBtn}
      >
        🔄
      </button>
    )}

      {!image && <h4 className={styles.title}>Upload an image for sentiment analysis</h4>}

      {!previewUrl && (
        <div className={styles.avatarPreview}>
          <span role="img" aria-label="avatar">👤</span>
        </div>
      )}

      {previewUrl && (
        <div className={styles.imagePreviewWrapper}>
          <img src={previewUrl} alt="preview" className={styles.imagePreview} />
        </div>
      )}

      {!image && !showWebcam && (
        <button type="button" onClick={() => setShowOptions((v) => !v)} className={styles.mainUploadBtn}>
          Upload Image
        </button>
      )}

      {showOptions && !image && !showWebcam && (
        <div className={styles.uploadOptions}>
          <button type="button" onClick={() => fileInputRef.current.click()} className={styles.optionBtn}>
            Uploading a picture from the computer
          </button>
          <button type="button" onClick={() => { setShowWebcam(true); setShowOptions(false); }} className={styles.optionBtn}>
            taking a photo
          </button>
          <div className={styles.dragArea}>Drag an image here</div>
        </div>
      )}

      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />

      {showWebcam && (
        <div className={styles.webcamWrapper}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={280}
            height={220}
            videoConstraints={{ facingMode: "user" }}
            className={styles.webcamView}
          />
          <button type="button" onClick={handleTakePhoto} className={styles.takePhotoBtn}>📸 Take Photo</button>
          <button type="button" onClick={() => setShowWebcam(false)} className={styles.cancelBtn}>Cancel</button>
        </div>
      )}

      {image && !mood && (
        <button type="submit" disabled={loading} className={styles.analyzeBtn}>
          {loading ? "...Uploading" : "Mood Analysis"}
        </button>
      )}

      {mood && showPlaylistsBtn && playlists.length === 0 && (
        <div className={styles.analysisResult}>
          <h5>Detected Mood: <b>{mood}</b></h5>
          <button type="button" onClick={fetchPlaylistsByMood} className={styles.showPlaylistsBtn}>
            Show playlists
          </button>
        </div>
      )}

      {mood && !showPlaylistsBtn && playlists.length === 0 && (
        <div className={styles.analysisResult}>
          <h5>Detected Mood: <b>{mood}</b></h5>
        </div>
      )}

      {playlists.length > 0 && (
        <div className={styles.playlistContainer}>
          <h3>Matching playlists</h3>
          {playlists.map((pl) => (
            <PlaylistDetails key={pl.id} playlist={pl} />
          ))}
        </div>
      )}

      {showLimitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Playlist Limit Reached</h2>
            <p className={styles.modalMessage}>Free users can only create up to 3 playlists. Upgrade to Pro for unlimited access.</p>
            <div className={styles.modalButtons}>
              <button className={styles.modalPrimaryBtn} onClick={() => window.location.href = "/upgrade"}>Upgrade to Pro</button>
              <button className={styles.modalSecondaryBtn} onClick={() => setShowLimitModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showImageLimitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Image Limit Reached</h2>
            <p className={styles.modalMessage}>Free users can only store up to 4 images. Upgrade to Pro to remove this limit.</p>
            <div className={styles.modalButtons}>
              <button className={styles.modalPrimaryBtn} onClick={() => window.location.href = "/upgrade"}>Upgrade to Pro</button>
              <button className={styles.modalSecondaryBtn} onClick={() => setShowImageLimitModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </form>
    </div>
  );
}