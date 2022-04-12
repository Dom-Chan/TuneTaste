import React, { useState, useEffect, useRef } from "react";
import useProps from "../Context/PropContex";
import { useParams } from "react-router-dom";
import styles from "../Styles/Playlist.module.css";
import Track from "./Track";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import { IoMusicalNotesSharp } from "react-icons/io5";

export default function Playlist() { 
  const [playlist_tracks, setPlaylistTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlist_owner, setPlaylistOwner] = useState("");
  const [playlist_title_scrolled, setIsPlaylistTitleScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let { id } = useParams();
  const { access_token } = useProps();

  const openModal = () => {
    setShowModal(true);
  };

  const checkY = () => {
    if (window.scrollY > 378) {
      setIsPlaylistTitleScrolled(true);
    } else setIsPlaylistTitleScrolled(false);
  };

  

  useEffect(() => {
    let isCancelled = false;
    window.addEventListener("scroll", checkY);
    fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((fetch_response) => fetch_response.json())
      .then((playlist) => {
        let filter1 = playlist.description.replaceAll("&quot;", '"');
        let filter2 = filter1.replaceAll("&#x2F;", "/");
        playlist.description = filter2;

        if (!isCancelled) {
          setPlaylist(playlist);
          setPlaylistTracks(playlist.tracks.items);
          setPlaylistOwner(playlist.owner.display_name);
        }
      })
      .catch((err) => console.log(err));

      return ()=> {
        window.removeEventListener("scroll", checkY);
        isCancelled = true
      }
  }, [access_token, id]);

  return (
    <div className={styles.playlist}>
      <div className={styles.playlist_header}>
        {playlist.images !== undefined && playlist.images.length > 0 ? (
          <img
            src={playlist.images[0].url}
            className={styles.playlist_img}
            alt=""
          ></img>
        ) : playlist.images === undefined ? (
          null
        ) : (
          <div className={styles.default_img}><IoMusicalNotesSharp /></div>
        )}

        <div className={styles.playlist_header_text}>
          <p className={styles.type}>PLAYLIST</p>
          <p className={styles.owner}>by {playlist_owner}</p>
          <p className={styles.playlist_title}>{playlist.name}</p>
          <p className={styles.playlist_description}>{playlist.description}</p>
          <ReviewButton button_value="Playlist" openModal={openModal} />
          {showModal && (
            <ReviewModal
              showModal={showModal}
              setShowModal={setShowModal}
              title={playlist.name}
              owner={playlist_owner}
              type="Playlist"
              id={playlist.id}
            />
          )}
        </div>
      </div>

      <div className={styles.separator}></div>
      {playlist_title_scrolled && (
        <p className={styles.playlist_title_active}>{playlist.name}</p>
      )}

      {playlist_tracks
        ? playlist_tracks.map((playlist) => (
            <Track
              item={playlist}
              key={playlist.track.id}
              id={playlist.track.id}
              type="playlist"
            />
          ))
        : null}
    </div>
  );
}

/* <iframe style={{ borderRadius:12 }} src="https://open.spotify.com/embed/playlist/3GWFbJN7QQoaxwcoCBF0um?utm_source=generator" width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe> */
