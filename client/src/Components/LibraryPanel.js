import React, { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Playlist from "./Playlist";
import PlaylistPanel from "./PlaylistPanel";
import styles from "../Styles/Librarypanel.module.css";
import useProps from "../Context/PropContex";
import ArtistPanel from "./ArtistPanel";
import AlbumPanel from "./AlbumPanel";
import Artist from "./Artist";
import Album from "./Album";
import ReviewPanel from "./ReviewPanel";

export default function () {
  const { isNavlinkActive_value, access_token, setDevice, playing } = useProps();

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/me/player/devices`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((fetch_response) => fetch_response.json())
      .then((devices) => {
        if (devices.devices.length > 0) {
          setDevice(devices.devices[0].id);
        }
      });
  }, [playing]);

  return (
    <div className={styles.librarypanel}>
      <div className={styles.navpanel}>
        <Link
          to="/library/playlists"
          className={
            isNavlinkActive_value === "Playlists"
              ? styles.navlink_active
              : styles.navlink_div
          }
        >
          Playlists
        </Link>
        <Link
          to="/library/artists"
          className={
            isNavlinkActive_value === "Artists"
              ? styles.navlink_active
              : styles.navlink_div
          }
        >
          Artists
        </Link>
        <Link
          to="/library/albums"
          className={
            isNavlinkActive_value === "Albums"
              ? styles.navlink_active
              : styles.navlink_div
          }
        >
          Albums
        </Link>
        <Link
          to="/library/reviews"
          className={
            isNavlinkActive_value === "Reviews"
              ? styles.navlink_active
              : styles.navlink_div
          }
        >
          Reviews
        </Link>
      </div>

      <Routes>
        <Route path="/playlists/*" element={<PlaylistPanel />} />
        <Route path="/artists/*" element={<ArtistPanel />} />
        <Route path="/albums/*" element={<AlbumPanel />} />
        <Route path="/reviews" element={<ReviewPanel />} />
        <Route path="/playlists/playlist/:id" element={<Playlist />} />
        <Route path="/artists/artist/:id" element={<Artist />} />
        <Route path="/albums/album/:id" element={<Album />} />
      </Routes>
    </div>
  );
}
