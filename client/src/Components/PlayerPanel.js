import React from "react";
import styles from "../Styles/Player.module.css";
import useProps from "../Context/PropContex";
import { useEffect, useState, useRef } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import playbutton from "../Images/play.webp";
import pausebutton from "../Images/pause.png";
import logo from "../Images/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";

function PlayerPanel() {
  const { access_token, playing, device, setPlaying } = useProps();
  const [trackImg, setTrackImg] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [playstate, setPlaystate] = useState(true);
  const playstate_ref = useRef(true);
  const pause_time_ref = useRef(0);

  useEffect(() => {
    let isCancelled = false;
    const interval = setInterval(() => {
      if (pause_time_ref.current > 3) {
        setPlaying(false);
      }
      fetch(`https://api.spotify.com/v1/me/player`, {
        method: "GET",
        headers: { Authorization: "Bearer " + access_token },
      })
        .then((fetch_response) => fetch_response.json())
        .then((player) => {
          if (!isCancelled) {
            if (player.is_playing) {
              setPlaying(player.item.id);
              setPlaystate(true);
              pause_time_ref.current = 0;
            } else {
              pause_time_ref.current += 1;
              setPlaystate(false);
            }
          }
        })
        .catch((err) => setPlaying(false));

      return () => {
        isCancelled = true;
      };
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    if (playing) {
      fetch(`https://api.spotify.com/v1/tracks/${playing}`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((fetch_response) => fetch_response.json())
        .then((track) => {
          if (!isCancelled) {
            setTrackImg(track.album.images[0].url);
            setTrackTitle(track.name);
            setTrackArtist(track.artists[0].name);
          }
        });

      return () => {
        isCancelled = true;
      };
    }
  }, [playing]);

  const play = () => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + access_token },
    });
    setPlaystate(true);
    playstate_ref.current = true;
  };

  const pause = () => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + access_token },
    });
    setPlaystate(false);
    playstate_ref.current = false;
  };

  return (
    <div className={styles.player}>
      {trackImg && (
        <div className={styles.spotify_wrapper}>
          NOW PLAYING ON <img src={logo} className={styles.logo}></img>
        </div>
      )}
      {trackImg && (
        <img
          className={
            playstate === "playing" ? styles.image_playing : styles.image
          }
          src={trackImg}
        />
      )}
      {trackTitle && <div className={styles.title}>{trackTitle}</div>}
      {trackArtist && <div className={styles.artist}>{trackArtist}</div>}
      {!playstate && playing && (
        //<img onClick={play} className={styles.button} src={playbutton} />
        <div onClick={play} className={styles.playbutton}>
          <BsFillPlayCircleFill />
        </div>
      )}
      {playstate && playing && (
        //<img onClick={pause} className={styles.button} src={pausebutton} />
        <div onClick={pause} className={styles.pausebutton}>
          <BsPauseCircleFill />
        </div>
      )}
    </div>
  );
}

export default PlayerPanel;
