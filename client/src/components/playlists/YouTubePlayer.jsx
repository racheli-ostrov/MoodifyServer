import { useEffect, useRef, useState } from "react";
import styles from "../playlists/PlaylistList.module.css";

export default function YouTubePlayer({ videoUrl, onEnd }) {
    const playerRef = useRef(null);
    const [ready, setReady] = useState(false);

    const extractVideoId = (url) => {
        const match = url.match(/(?:\?v=|\.be\/)([^&]+)/);
        return match ? match[1] : null;
    };

    useEffect(() => {
        const videoId = extractVideoId(videoUrl);

        const createPlayer = () => {
            if (playerRef.current) {
                try { playerRef.current.destroy(); } catch (e) { }
                playerRef.current = null;
            }

            playerRef.current = new window.YT.Player("yt-player", {
                videoId,
                height: "360",
                width: "640",
                events: {
                    onReady: (event) => {
                        setReady(true);
                        event.target.playVideo();
                    },

                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            onEnd();
                        }
                    }
                }
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
            if (playerRef.current?.destroy) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [videoUrl]);

    return (
        <div className={styles.playerWrapper}>
            <div id="yt-player" className={styles.player}></div>
            {ready && (
                <div className={styles.controls}></div>
            )}
        </div>
    );
}