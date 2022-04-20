import React, { useState, useEffect, useRef } from "react";
import useProps from "../Context/PropContex";
import { useParams } from "react-router-dom";
import styles from "../Styles/Playlist.module.css";
import Track from "./Track";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import { MdAlbum } from "react-icons/md";

export default function Album() {
  const [album, setAlbum] = useState([]);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let { id } = useParams();
  const { access_token, country } = useProps();

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    let isCancelled = false;
    fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((fetch_response) => fetch_response.json())
      .then((album) => {
        if (!isCancelled) {
          setAlbum(album);
          setAlbumTracks(album.tracks.items)
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
        {album.images !== undefined && album.images.length > 0 ? (
          <img
            src={album.images[0].url}
            className={styles.playlist_img}
            alt=""
          ></img>
        ) : album.images === undefined ? (
          null
        ) : (
          <div className={styles.default_img}><MdAlbum /></div>
        )}

        <div className={styles.playlist_header_text}>
          <p className={styles.type}>ALBUM</p>
          <p className={styles.playlist_title}>{album.name}</p>
          <ReviewButton button_value="Album" openModal={openModal} />
          {showModal && (
            <ReviewModal
              showModal={showModal}
              setShowModal={setShowModal}
              title={album.name}
              type="Album"
              id={album.id}
            />
          )}
        </div>
      </div>

      <div className={styles.separator}></div>

      {albumTracks
        ? albumTracks.map((track) => (
            <Track item={track} key={track.id} id={track.id} type="album" albumImg={album.images[0].url}/>
          ))
        : null}
    </div>
  );
}
