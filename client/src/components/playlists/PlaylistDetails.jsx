// import { useState, useRef, useEffect } from "react";
// import api from "../../services/api";

// // מיפוי רגשות לצבעים, אייקונים ואנימציות
// const moodStyle = {
//   happy:     { icon: "😊", color: "#fff9c4", animation: "pulse" },
//   sad:       { icon: "😢", color: "#e1f5fe", animation: "fade" },
//   fear:      { icon: "😱", color: "#ede7f6", animation: "shake" },
//   angry:     { icon: "😠", color: "#ffebee", animation: "shake" },
//   surprised: { icon: "😲", color: "#f3e5f5", animation: "bounce" },
//   calm:      { icon: "🌿", color: "#e8f5e9", animation: "float" },
//   neutral:   { icon: "😐", color: "#f5f5f5", animation: "none" },
//   unknown:   { icon: "🎵", color: "#ffffff", animation: "" }
// };

// export default function PlaylistDetails({ playlist }) {
//   const playerRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playerReady, setPlayerReady] = useState(false);
//   const [viewMode, setViewMode] = useState("player"); // ברירת מחדל: נגן ברצף

//   // הלייקים/דיסלייקים לא משפיעים על הנגן!
//   const [likes, setLikes] = useState(playlist.likes || 0);
//   const [dislikes, setDislikes] = useState(playlist.dislikes || 0);

//   const currentSong = playlist.songs[currentIndex];
//   const moodData = moodStyle[playlist.mood?.toLowerCase()] || moodStyle.unknown;

//   const extractVideoId = (url) => {
//     try {
//       const match = url.match(/(?:\?v=|\.be\/)([^&]+)/);
//       return match ? match[1] : null;
//     } catch {
//       return null;
//     }
//   };

//   // יצירת נגן – תלות אך ורק ב־currentIndex, viewMode!
//   useEffect(() => {
//     if (viewMode !== "player") return;

//     const videoId = extractVideoId(currentSong.url);

//     const createPlayer = () => {
//       if (playerRef.current) {
//         try { playerRef.current.destroy(); } catch (e) {}
//         playerRef.current = null;
//       }
//       playerRef.current = new window.YT.Player("yt-player", {
//         videoId,
//         height: "360",
//         width: "640",
//         events: {
//           onReady: () => setPlayerReady(true),
//           onStateChange: onPlayerStateChange,
//         },
//       });
//     };

//     if (window.YT && window.YT.Player) {
//       createPlayer();
//     } else {
//       window.onYouTubeIframeAPIReady = createPlayer;
//       if (!document.getElementById("youtube-iframe-api")) {
//         const tag = document.createElement("script");
//         tag.id = "youtube-iframe-api";
//         tag.src = "https://www.youtube.com/iframe_api";
//         document.body.appendChild(tag);
//       }
//     }

//     return () => {
//       if (playerRef.current && typeof playerRef.current.destroy === "function") {
//         playerRef.current.destroy();
//         playerRef.current = null;
//       }
//     };
//     // eslint-disable-next-line
//   }, [currentIndex, viewMode]);

//   // כשמשנים currentIndex (כלומר, הבא/הקודם/מעבר אוטומטי), נטען אוטומטית השיר הבא
//   useEffect(() => {
//     if (
//       playerReady &&
//       playerRef.current &&
//       typeof playerRef.current.loadVideoById === "function" &&
//       viewMode === "player"
//     ) {
//       const nextVideoId = extractVideoId(currentSong.url);
//       playerRef.current.loadVideoById(nextVideoId);
//       if (typeof playerRef.current.playVideo === "function") {
//         playerRef.current.playVideo();
//       }
//     }
//     // eslint-disable-next-line
//   }, [currentIndex, playerReady, viewMode]);

//   const onPlayerStateChange = (event) => {
//     if (event.data === window.YT.PlayerState.ENDED && viewMode === "player") {
//       setCurrentIndex((prev) => (prev + 1) % playlist.songs.length);
//     }
//   };

//   // --- פעולות נגן ---
//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % playlist.songs.length);
//   };
//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? playlist.songs.length - 1 : prev - 1
//     );
//   };
//   const handlePause = () => {
//     if (
//       playerRef.current &&
//       typeof playerRef.current.pauseVideo === "function"
//     ) {
//       playerRef.current.pauseVideo();
//     }
//   };
//   const handlePlay = () => {
//     if (
//       playerRef.current &&
//       typeof playerRef.current.playVideo === "function"
//     ) {
//       playerRef.current.playVideo();
//     }
//   };

//   // --- פעולות לייק ודיסלייק ---
//   const handleLike = async () => {
//     try {
//       const res = await api.post(`/playlists/${playlist.id}/like`);
//       setLikes(res.data.likes);
//       setDislikes(res.data.dislikes);
//       // לא נוגעים ב־currentIndex או viewMode – לא נוצר נגן חדש!
//     } catch (err) {
//       alert("שגיאה בלייק");
//     }
//   };
//   const handleDislike = async () => {
//     try {
//       const res = await api.post(`/playlists/${playlist.id}/dislike`);
//       setLikes(res.data.likes);
//       setDislikes(res.data.dislikes);
//     } catch (err) {
//       alert("שגיאה בדיסלייק");
//     }
//   };

//   return (
//     <div style={{
//       backgroundColor: moodData.color,
//       marginTop: "2em",
//       padding: "1em",
//       border: "1px solid #ccc",
//       borderRadius: "12px"
//     }}>
//       {/* מעבר בין מצבים */}
//       {viewMode === "player" && (
//         <button type="button" onClick={() => setViewMode("list")}>
//           מעבר לרשימת פלייליסט
//         </button>
//       )}
//       {viewMode === "list" && (
//         <button type="button" onClick={() => setViewMode("player")}>
//           מעבר לנגן ברצף
//         </button>
//       )}

//       {/* מצב רשימת שירים */}
//       {viewMode === "list" && playlist.songs && playlist.songs.length > 0 && (
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: "1em",
//           marginTop: "1em"
//         }}>
//           {playlist.songs.map(song => {
//             const videoId = extractVideoId(song.url);
//             return (
//               <div key={song.id} style={{ width: "100%" }}>
//                 <div style={{ fontWeight: "bold", marginBottom: "0.5em" }}>{song.title}</div>
//                 {videoId ? (
//                   <iframe
//                     width="100%"
//                     height="180"
//                     src={`https://www.youtube.com/embed/${videoId}`}
//                     title={song.title}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 ) : (
//                   <p>⚠️ לא ניתן להציג את הסרטון</p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* מצב נגן ברצף */}
//       {/* ה-div של yt-player תמיד קיים, רק מוסתר */}
//       <div style={{ display: viewMode === "player" ? "block" : "none" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <button type="button" onClick={handleLike}>👍</button>
//           <span>{likes}</span>
//           <button type="button" onClick={handleDislike}>👎</button>
//           <span>{dislikes}</span>
//         </div>
//         <h4>{currentSong.title}</h4>
//         <div id="yt-player" style={{ width: "100%", height: "360px" }}></div>
//         <div style={{ marginTop: "1em", display: "flex", gap: "1em", flexWrap: "wrap" }}>
//           <button type="button" onClick={handlePrev}>⏮️ הקודם</button>
//           <button type="button" onClick={handlePause}>⏸️ השהייה</button>
//           <button type="button" onClick={handlePlay}>▶️ המשך</button>
//           <button type="button" onClick={handleNext}>⏭️ הבא</button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import api from "../../services/api";

// מיפוי רגשות לצבעים, אייקונים ואנימציות
const moodStyle = {
  happy:     { icon: "😊", color: "#fff9c4", animation: "pulse" },
  sad:       { icon: "😢", color: "#e1f5fe", animation: "fade" },
  fear:      { icon: "😱", color: "#ede7f6", animation: "shake" },
  angry:     { icon: "😠", color: "#ffebee", animation: "shake" },
  surprise: { icon: "😲", color: "#f3e5f5", animation: "bounce" },
  calm:      { icon: "🌿", color: "#e8f5e9", animation: "float" },
  neutral:   { icon: "😐", color: "#f5f5f5", animation: "none" },
  unknown:   { icon: "🎵", color: "#ffffff", animation: "" }
};

export default function PlaylistDetails({ playlist }) {
  const playerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [viewMode, setViewMode] = useState("player"); // ברירת מחדל: נגן ברצף

  // --- לייק/דיסלייק ---
  const [likes, setLikes] = useState(playlist.likes || 0);
  const [dislikes, setDislikes] = useState(playlist.dislikes || 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);

  const currentSong = playlist.songs[currentIndex];
  const moodData = moodStyle[playlist.mood?.toLowerCase()] || moodStyle.unknown;

  const extractVideoId = (url) => {
    try {
      const match = url.match(/(?:\?v=|\.be\/)([^&]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  // יצירת נגן – תלות אך ורק ב־currentIndex, viewMode!
  useEffect(() => {
    if (viewMode !== "player") return;

    const videoId = extractVideoId(currentSong.url);

    const createPlayer = () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (e) {}
        playerRef.current = null;
      }
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        height: "360",
        width: "640",
        events: {
            onReady: (event) => {
            setPlayerReady(true);
            event.target.playVideo(); // הפעל אוטומטית כשנוצר
          },
          onStateChange: onPlayerStateChange,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [currentIndex, viewMode]);

  // בכל שינוי currentIndex/מעבר אוטומטי – טעינה וניגון מיידי של השיר הבא
useEffect(() => {
  if (
    playerReady &&
    playerRef.current &&
    typeof playerRef.current.loadVideoById === "function" &&
    viewMode === "player"
  ) {
    const nextVideoId = extractVideoId(currentSong.url);
    playerRef.current.loadVideoById(nextVideoId);
    // אין צורך ב-playVideo כאן!
  }
  // eslint-disable-next-line
}, [currentIndex, playerReady, viewMode]);

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED && viewMode === "player") {
      setCurrentIndex((prev) => (prev + 1) % playlist.songs.length);
    }
  };

  // --- פעולות נגן ---
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.songs.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? playlist.songs.length - 1 : prev - 1
    );
  };
  const handlePause = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.pauseVideo === "function"
    ) {
      playerRef.current.pauseVideo();
    }
  };
  const handlePlay = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.playVideo === "function"
    ) {
      playerRef.current.playVideo();
    }
  };

  // --- פעולות לייק ודיסלייק (כולל טעינה) ---
  // const handleLike = async () => {
  //   setLikeLoading(true);
  //   try {
  //     const res = await api.post(`/playlists/${playlist.id}/like`);
  //     setLikes(res.data.likes);
  //     setDislikes(res.data.dislikes);
  //   } catch (err) {
  //     alert("שגיאה בלייק");
  //   }
  //   setLikeLoading(false);
  // };
  // const handleDislike = async () => {
  //   setDislikeLoading(true);
  //   try {
  //     const res = await api.post(`/playlists/${playlist.id}/dislike`);
  //     setLikes(res.data.likes);
  //     setDislikes(res.data.dislikes);
  //   } catch (err) {
  //     alert("שגיאה בדיסלייק");
  //   }
  //   setDislikeLoading(false);
  // };
  // לייק עם ספינר
  const handleLike = async () => {
    setLikeLoading(true);
    try {
      const res = await api.post(`/playlists/${playlist.id}/vote`, { vote: "like" });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.log("שגיאה בלייק");
    }
    setLikeLoading(false);
  };
  // דיסלייק עם ספינר
  const handleDislike = async () => {
    setDislikeLoading(true);
    try {
      const res = await api.post(`/playlists/${playlist.id}/vote`, { vote: "dislike" });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      alert("שגיאה בדיסלייק");
    }
    setDislikeLoading(false);
  };


  return (
    <div style={{
      backgroundColor: moodData.color,
      marginTop: "2em",
      padding: "1em",
      border: "1px solid #ccc",
      borderRadius: "12px"
    }}>
      {/* מעבר בין מצבים */}
      {viewMode === "player" && (
        <button type="button" onClick={() => setViewMode("list")}>
          מעבר לרשימת פלייליסט
        </button>
      )}
      {viewMode === "list" && (
        <button type="button" onClick={() => setViewMode("player")}>
          מעבר לנגן ברצף
        </button>
      )}

      {/* מצב רשימת שירים */}
      {viewMode === "list" && playlist.songs && playlist.songs.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1em",
          marginTop: "1em"
        }}>
          {playlist.songs.map(song => {
            const videoId = extractVideoId(song.url);
            return (
              <div key={song.id} style={{ width: "100%" }}>
                <div style={{ fontWeight: "bold", marginBottom: "0.5em" }}>{song.title}</div>
                {videoId ? (
                  <iframe
                    width="100%"
                    height="180"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={song.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>⚠️ לא ניתן להציג את הסרטון</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* מצב נגן ברצף */}
      <div style={{ display: viewMode === "player" ? "block" : "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <button
            type="button"
            onClick={handleLike}
            disabled={likeLoading}
            style={{ fontSize: "1.4em" }}
          >
            {likeLoading ? "⏳" : "👍"}
          </button>
          <span>{likes}</span>
          <button
            type="button"
            onClick={handleDislike}
            disabled={dislikeLoading}
            style={{ fontSize: "1.4em" }}
          >
            {dislikeLoading ? "⏳" : "👎"}
          </button>
          <span>{dislikes}</span>
        </div>
        <h4>{currentSong.title}</h4>
        <div id="yt-player" style={{ width: "100%", height: "360px" }}></div>
        <div style={{ marginTop: "1em", display: "flex", gap: "1em", flexWrap: "wrap" }}>
          <button type="button" onClick={handlePrev}>⏮️ הקודם</button>
          <button type="button" onClick={handlePause}>⏸️ השהייה</button>
          <button type="button" onClick={handlePlay}>▶️ המשך</button>
          <button type="button" onClick={handleNext}>⏭️ הבא</button>
        </div>
      </div>
    </div>
  );
}
