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
    if (!image) return;
    if (!user) {
      alert("You must log in to upload a picture");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await api.post("/images/upload", formData
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
        setMood("Error: " + error);
      }
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowOptions(false);
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
        setShowWebcam(false);
        setShowOptions(false);
        setUseCamera(false);
        setMood(null);
        setPlaylists([]);
        setShowOptions(false);
      });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowOptions(false);
    }
  };
  const handleDragOver = (e) => e.preventDefault();

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

  const handleCameraChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowOptions(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      style={{
        maxWidth: 400,
        margin: "2em auto",
        background: "#f8fafc",
        borderRadius: "18px",
        boxShadow: "0 2px 12px #0001",
        padding: "2em",
        textAlign: "center",
        position: "relative"
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >

      {(image || mood || playlists.length > 0 || showWebcam) && (
        <button
          type="button"
          onClick={handleReset}
          title="upload a new image"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "#e3f2fd",
            color: "#1976d2",
            border: "2px solid #1976d2",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3em",
            cursor: "pointer",
            zIndex: 2
          }}
        >
          🔄
        </button>
      )}

      {!image && (<h4 style={{ marginBottom: "1em" }}>Upload an image for sentiment analysis</h4>)}

      {/* Preview an image or icon */}
      {!previewUrl && (
        <div
          style={{
            background: "#e3e7ed",
            borderRadius: "50%",
            width: 120,
            height: 120,
            margin: "0 auto 1em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 60,
            color: "#b0b8c1"
          }}
        >
          <span role="img" aria-label="avatar">👤</span>
        </div>
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

      {/* Main button to open options */}
      {!image && !showWebcam && (
        <button
          type="button"
          style={{
            background: "#e3f2fd",
            color: "#1976d2",
            border: "none",
            borderRadius: "20px",
            padding: "0.7em 1.5em",
            fontSize: "1.1em",
            cursor: "pointer",
            marginBottom: "1em"
          }}
          onClick={() => setShowOptions((v) => !v)}
        >
          Upload Image
        </button>
      )}

      {/* Options Menu */}
      {showOptions && !image && !showWebcam && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            marginTop: "1em",
            boxShadow: "0 2px 8px #0002",
            padding: "1em"
          }}
        >
          <button
            style={{
              display: "block",
              width: "100%",
              marginBottom: "0.5em",
              background: "#e3f2fd",
              border: "none",
              borderRadius: "12px",
              padding: "0.7em",
              cursor: "pointer"
            }}
            onClick={() => fileInputRef.current.click()}
            type="button"
          >
            Uploading a picture from the computer
          </button>
          <button
            style={{
              display: "block",
              width: "100%",
              marginBottom: "0.5em",
              background: "#e3f2fd",
              border: "none",
              borderRadius: "12px",
              padding: "0.7em",
              cursor: "pointer"
            }}
            onClick={() => {
              setShowWebcam(true);
              setShowOptions(false);
            }}
            type="button"
          >
            taking a photo
          </button>
          <div
            style={{
              border: "2px dashed #b0b8c1",
              borderRadius: "12px",
              padding: "1em",
              color: "#b0b8c1",
              fontSize: "1em"
            }}
          >
            Drag an image here
          </div>
        </div>
      )}

      {/* Hidden inputs */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {/* Take a picture with a webcam */}
      {showWebcam && (
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
            style={{ marginTop: 8, marginLeft: 8 }}
            onClick={handleTakePhoto}
          >
            📸 Take Photo
          </button>
          <button
            type="button"
            style={{ marginTop: 8 }}
            onClick={() => setShowWebcam(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Mood Analysis Button */}
      {image && !mood && (
        <button type="submit" disabled={loading} style={{
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "20px",
          padding: "0.7em 1.5em",
          fontSize: "1.1em",
          cursor: "pointer",
          marginTop: "1em"
        }}>
          {loading ? "...Uploading" : "Mood Analysis"}
        </button>
      )}

      {/* Analysis results */}
      {mood && showPlaylistsBtn && playlists.length === 0 && (
        <div style={{ marginTop: "1em" }}>
          <h3>Detected Mood: <b>{mood}</b></h3>
          <button type="button" onClick={fetchPlaylistsByMood}
            style={{
              background: "#e3f2fd",
              color: "#1976d2",
              border: "2px solid #1976d2",
              borderRadius: "20px",
              padding: "0.5em 1em",
              fontSize: "0.95em",
              cursor: "pointer",
              marginTop: "1em"
            }}
          >
            Show playlists
          </button>
        </div>
      )}
      {mood && !showPlaylistsBtn && playlists.length === 0 && (
        <div style={{ marginTop: "1em" }}>
          <h3>Detected Mood: <b>{mood}</b></h3>
        </div>
      )}

      {playlists.length > 0 && (
        <div style={{ marginTop: "2em" }}>
          <h3>Matching playlists</h3>
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
              Free users can only create up to 3 playlists
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