// export default function PlaylistDetails({ playlist }) {
//   const extractVideoId = (url) => {
//     try {
//       const match = url.match(/(?:\?v=|\.be\/)([^&]+)/);
//       return match ? match[1] : null;
//     } catch {
//       return null;
//     }
//   };

//   return (
//     <div style={{ border: "1px solid #aaa", margin: "1em 0", padding: "1em" }}>
//       {/* <h3>{playlist.name}</h3> */}
//       {/* <p>{playlist.description}</p> */}
//       {/* <p>מצב רוח: {playlist.mood}</p> */}

//       {playlist.songs && playlist.songs.length > 0 && (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
//           {playlist.songs.map(song => {
//             const videoId = extractVideoId(song.url);
//             return (
//               <div key={song.id} style={{ width: "300px" }}>
//                 {/* <h4>{song.title}</h4> */}
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
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import api from "../../services/api";

// מיפוי רגשות לצבעים, אייקונים ואנימציות
const moodStyle = {
  happy:     { icon: "😊", color: "#fff9c4", animation: "pulse" },
  sad:       { icon: "😢", color: "#e1f5fe", animation: "fade" },
  fear:      { icon: "😱", color: "#ede7f6", animation: "shake" },
  angry:     { icon: "😠", color: "#ffebee", animation: "shake" },
  surprised: { icon: "😲", color: "#f3e5f5", animation: "bounce" },
  calm:      { icon: "🌿", color: "#e8f5e9", animation: "float" },
  neutral:   { icon: "😐", color: "#f5f5f5", animation: "none" },
  unknown:   { icon: "🎵", color: "#ffffff", animation: "" }
};

export default function PlaylistDetails({ playlist }) {
  const playerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const currentSong = playlist.songs[currentIndex];
  const moodData = moodStyle[playlist.mood?.toLowerCase()] || moodStyle.unknown;
  

//   const extractVideoId = (url) => {
//     const match = url.match(/(?:\?v=|\.be\/)([^&]+)/);
//     return match ? match[1] : null;
//   };
const extractVideoId = (url) => {
    try {
      const match = url.match(/(?:\?v=|\.be\/)([^&]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };


  const loadYouTubeAPI = () => {
    if (window.YT) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  };

  useEffect(() => {
    loadYouTubeAPI();

    window.onYouTubeIframeAPIReady = () => {
      const videoId = extractVideoId(currentSong.url);
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        height: "360",
        width: "640",
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: onPlayerStateChange,
        },
      });
    };

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (playerReady && playerRef.current) {
      const nextVideoId = extractVideoId(currentSong.url);
      playerRef.current.loadVideoById(nextVideoId);
    }
  }, [currentIndex, playerReady]);

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      setCurrentIndex((prev) => (prev + 1) % playlist.songs.length);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.songs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? playlist.songs.length - 1 : prev - 1
    );
  };

  const handlePause = () => {
    playerRef.current?.pauseVideo();
  };

  const handlePlay = () => {
    playerRef.current?.playVideo();
  };

  return (
    <div style={{
      backgroundColor: moodData.color,
      marginTop: "2em",
      padding: "1em",
      border: "1px solid #ccc",
      borderRadius: "12px"
    }}>
       {/* כפתור הצג פלייליסט (אם יש) */}
    <button type="button">הצג פלייליסט</button>
    {/* כפתור חדש "לללל" */}
   <button
        type="button"
        style={{ marginRight: "1em" }}
        onClick={() => setShowAll(true)}
      >
       נגן ברצף
      </button>
      
{playlist.songs && playlist.songs.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
          {playlist.songs.map(song => {
            const videoId = extractVideoId(song.url);
            return (
              <div key={song.id} style={{ width: "300px" }}>
                {/* <h4>{song.title}</h4> */}
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
      {/* <h3>{playlist.name}</h3> */}
      <div className={moodData.animation} style={{ fontSize: "2.5em" }}>
        {moodData.icon}
      </div>
      {/* <p>{playlist.description}</p> */}
      {/* <p>מצב רוח: {playlist.mood}</p> */}

      {/* <h4>{currentSong.title}</h4> */}
      <div id="yt-player" style={{ width: "100%", height: "360px" }}></div>

      <div style={{ marginTop: "1em", display: "flex", gap: "1em", flexWrap: "wrap" }}>
        <button type="button" onClick={handlePrev}>⏮️ הקודם</button>
        <button type="button" onClick={handlePause}>⏸️ השהייה</button>
        <button type="button" onClick={handlePlay}>▶️ המשך</button>
       <button type="button" onClick={handleNext}>⏭️ הבא</button>
      </div>
    </div>
  );
}