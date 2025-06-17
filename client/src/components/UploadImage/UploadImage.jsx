import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Webcam from "react-webcam";
import api from "../../services/api";
import PlaylistDetails from "../playlists/PlaylistDetails";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [useCamera, setUseCamera] = useState(false);
  const webcamRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showImageLimitModal, setShowImageLimitModal] = useState(false);

  const handleUpload = async (e) => {
    console.log("👤 user from context:", user);

    e.preventDefault();
    setMood(null);
    setPlaylists([]);

    if (!image) return;
    if (!user) {
      alert("יש להתחבר כדי להעלות תמונה");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await api.post("/images/upload", formData
        // headers: {
        //   "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${user.token}`,
        // },
      );
      setMood(res.data.mood.trim().toLowerCase());
    } catch (err) {
      const error = err?.response?.data?.error || err.message;
      if (
        err?.response?.status === 403 &&
        error.includes("Free users can store up to 4 images")
      ) {
        setShowImageLimitModal(true);
      } else {
        setMood("שגיאה: " + error);
      }
    }

    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setMood(null);
      setPlaylists([]);
    } else {
      setPreviewUrl(null);
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
        setUseCamera(false);
        setMood(null);
        setPlaylists([]);
      });
  };

  const fetchPlaylistsByMood = async () => {
    try {
      const res = await api.get(`/playlists/bymood/${mood}`);
      if (res.data) {
        setPlaylists([res.data]);
        await api.post(`/playlists/${res.data.id}/save`);
      } else {
        alert("No playlist found for this mood.");
      }
    } catch (err) {
      if (
        err?.response?.status === 403 &&
        err?.response?.data?.error?.includes("Free users can only create")
      ) {
        setShowLimitModal(true);
      } else {
        alert("Error loading playlist: " + (err?.response?.data?.error || err.message));
      }
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ maxWidth: 40000, margin: "auto" }}>
      <h4>Upload Image from Computer or Camera</h4>
      <button
        type="button"
        style={{ marginBottom: 8, marginTop: 4 }}
        onClick={() => setUseCamera((v) => !v)}
      >
        {useCamera ? "Choose from Computer" : "Take a Picture"}
      </button>

      {useCamera ? (
        <div style={{ marginBottom: 10 }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={280}
            height={220}
            videoConstraints={{ facingMode: "user" }}
            style={{ borderRadius: 8, boxShadow: "0 2px 8px #ddd" }}
          />
          <button
            type="button"
            style={{ marginTop: 8 }}
            onClick={handleTakePhoto}
          >
            📸 Take Picture
          </button>
        </div>
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required={!image}
        />
      )}

      {previewUrl && (
        <div style={{ margin: "1em 0" }}>
          <img
            src={previewUrl}
            alt="preview"
            style={{ maxWidth: "220px", maxHeight: "220px", borderRadius: "8px" }}
          />
        </div>
      )}

      <button type="submit" disabled={loading || !image}>
        {loading ? "Uploading..." : "Analyze Mood"}
      </button>

      {mood && (
        <div style={{ marginTop: "1em" }}>
          <h3>Detected Mood: <b>{mood}</b></h3>
          <button type="button" onClick={fetchPlaylistsByMood}>
            Show Playlists
          </button>
        </div>
      )}

      {playlists.length > 0 && (
        <div style={{ marginTop: "2em" }}>
          <h3>Matching Playlists:</h3>
          {playlists.map((pl) => (
            <PlaylistDetails key={pl.id} playlist={pl} />
          ))}
        </div>
      )}

      {showLimitModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Playlist Limit Reached</h2>
            <p className="modal-message">
              Free users can only create up to 3 playlists.<br />
              Upgrade to Pro for unlimited access.
            </p>
            <div className="modal-buttons">
              <button
                className="modal-btn-primary"
                onClick={() => window.location.href = "/upgrade"}
              >
                Upgrade to Pro
              </button>
              <button
                className="modal-btn-secondary"
                onClick={() => setShowLimitModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showImageLimitModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Image Limit Reached</h2>
            <p className="modal-message">
              Free users can only store up to 4 images.<br />
              Upgrade to Pro to remove this limit.
            </p>
            <div className="modal-buttons">
              <button
                className="modal-btn-primary"
                onClick={() => window.location.href = "/upgrade"}
              >
                Upgrade to Pro
              </button>
              <button
                className="modal-btn-secondary"
                onClick={() => setShowImageLimitModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}