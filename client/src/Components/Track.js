import React from "react";
import styles from "../Styles/Track.module.css";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import PlayButton from "./PlayButton";
import { useEffect, useState } from "react";
import useProps from "../Context/PropContex";

export default function Track({ item, id, type, albumImg }) {
  const [artists, setArtists] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { access_token, device, setPlaying, subscription } = useProps();

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    var allArtists = "";
    if (type === "artist" || type === "album" || type === "track") {
      if (item.artists.length > 1) {
        for (let i = 0; i < item.artists.length; i++) {
          allArtists = allArtists.concat(item.artists[i].name);
          if (i < item.artists.length - 1) {
            allArtists = allArtists.concat(", ");
          }
        }
        setArtists(allArtists);
      } else setArtists(item.artists[0].name);
    } else if (type === "playlist") {
      if (item.track.artists.length > 1) {
        for (let i = 0; i < item.track.artists.length; i++) {
          allArtists = allArtists.concat(item.track.artists[i].name);
          if (i < item.track.artists.length - 1) {
            allArtists = allArtists.concat(", ");
          }
        }
        setArtists(allArtists);
      } else setArtists(item.track.artists[0].name);
    }
  }, [artists, item]);

  const play = () => {
    if (subscription === "premium") {
      setPlaying(id);
      var uri_holder = "";
      if (type === "artist" || type === "album" || type === "track") {
        uri_holder = item.uri;
      } else {
        uri_holder = item.track.uri;
      }
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
        method: "PUT",
        body: JSON.stringify({ uris: [uri_holder] }),
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }).then((res) => {
        if (res.status === 404) {
          window.alert("OPEN SPOTIFY");
        }
      });
    } else window.alert("UPGRADE TO PREMIUM TO PLAY MUSIC");
  };

  return (
    <div className={styles.track}>
      {(type === "artist" || type === "track") && (
        <img src={item.album.images[0].url} alt=" " onClick={play}></img>
      )}
      {type === "album" && <img src={albumImg} alt=" " onClick={play}></img>}
      {type === "playlist" && (
        <img src={item.track.album.images[0].url} alt=" " onClick={play}></img>
      )}

      {(type === "artist" || type === "album" || type === "track") && (
        <div className={styles.track_names_wrapper}>
          <div className={styles.track_name}>{item.name}</div>
          <div className={styles.track_artist}>{artists}</div>
        </div>
      )}

      {type === "playlist" && (
        <div className={styles.track_names_wrapper}>
          <div className={styles.track_name}>{item.track.name}</div>
          <div className={styles.track_artist}>{artists}</div>
        </div>
      )}

      <ReviewButton
        button_value="Track"
        openModal={openModal}
      />

      <PlayButton
        play={play}
      />

      {showModal && (
        <ReviewModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={
            type === "artist" || type === "album" || type === "track"
              ? item.name
              : item.track.name
          }
          type="Track"
          id={id}
        />
      )}
    </div>
  );
}
