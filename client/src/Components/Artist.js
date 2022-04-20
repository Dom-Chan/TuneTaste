import React, { useState, useEffect, useRef } from "react";
import useProps from "../Context/PropContex";
import { useParams } from "react-router-dom";
import styles from "../Styles/Playlist.module.css";
import Track from "./Track";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import { BsFillPersonFill } from "react-icons/bs";

export default function Artist() {
  const [artist, setArtist] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let { id } = useParams();
  const { access_token, country } = useProps();

  const openModal = () => {
    setShowModal(true);
  };
 
  useEffect(() => {
    let isCancelled = false;
    fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((fetch_response) => fetch_response.json())
      .then((artist) => {
        if (!isCancelled) {
          setArtist(artist);
          //onsole.log(artist)
        }
      })
      .catch((err) => console.log(err));

    fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${country}`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((fetch_response) => fetch_response.json())
      .then((tracks_array) => {
        if (!isCancelled) {
          setTracks(tracks_array.tracks);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isCancelled = true;
    };
  }, [access_token, id]);

  return (
    <div className={styles.playlist}>
      <div className={styles.playlist_header}>
        {artist.images !== undefined && artist.images.length > 0 ? (
          <img
            src={artist.images[0].url}
            className={styles.playlist_img}
            alt=""
          ></img>
        ) : artist.images === undefined ? (
          null
        ) : (
          <div className={styles.default_img}><BsFillPersonFill /></div>
        )}

        <div className={styles.playlist_header_text}>
          <p className={styles.type}>ARTIST</p>
          <p className={styles.playlist_title}>{artist.name}</p>
          <ReviewButton button_value="Artist" openModal={openModal} />
          {showModal && (
            <ReviewModal
              showModal={showModal}
              setShowModal={setShowModal}
              title={artist.name}
              type="Artist"
              id={artist.id}
            />
          )}
        </div>
      </div>

      <div className={styles.separator}></div>

      {tracks
        ? tracks.map((track) => (
            <Track
              item={track}
              key={track.id}
              id={track.id}
              type="artist"
            />
        ))
        : null}
    </div>
  );
}
