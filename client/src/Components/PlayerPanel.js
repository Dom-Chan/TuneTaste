import React from "react";
import styles from "../Styles/Player.module.css";
import useProps from "../Context/PropContex";
import { useEffect, useState } from "react";
import playbutton from "../Images/play.webp";
import pausebutton from "../Images/pause.png";
import logo from "../Images/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";

function PlayerPanel() {
  const { access_token, playing, device } = useProps();
  const [trackImg, setTrackImg] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [playstate, setPlaystate] = useState(false);

  useEffect(() => {
    
    fetch(`https://api.spotify.com/v1/me/player`, {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }).then((fetch_response) => fetch_response.json())
    .then((player) => {
      if (player.is_playing){
        setPlaystate(true)
      }else setPlaystate(false)
    }).catch((err) => console.log(err));


    if (playing) {
      fetch(`https://api.spotify.com/v1/tracks/${playing}`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((fetch_response) => fetch_response.json())
        .then((track) => {
          setTrackImg(track.album.images[0].url);
          setTrackTitle(track.name);
          setTrackArtist(track.artists[0].name);
          setPlaystate(true);
        });
    }
  }, [playing]);

  const play = () => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + access_token },
    });
    setPlaystate(true);
  };

  const pause = () => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + access_token },
    });
    setPlaystate(false);
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
      {(!playstate && playing) && (
        <img onClick={play} className={styles.button} src={playbutton} />
      )}
      {(playstate && playing) && (
        <img onClick={pause} className={styles.button} src={pausebutton} />
      )}
    </div>
  );
}

export default PlayerPanel;
