import React, {useEffect} from "react";
import styles from "../Styles/Contentpanel.module.css";
import { Routes, Route, } from "react-router-dom";
import LibraryPanel from "./LibraryPanel";
import HomePanel from "./HomePanel";
import SearchPanel from "./SearchPanel";
import Playlist from "./Playlist";
import Artist from "./Artist";
import Album from "./Album";
import useProps from "../Context/PropContex";

function ContentPanel() {
  const { access_token, setDevice} = useProps();
  const style = { color: "white" };

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
  
  }, [])
  
  
  return (
    <div className={styles.contentpanel}>
      <Routes>
        <Route index path="/home" element={<HomePanel/>} />
        <Route path="/search/*" element={<SearchPanel/>} />
        <Route path="/library/*" element={<LibraryPanel/>} />

        <Route path="/search/artist/:id" element={<Artist/>} />
        <Route path="/search/playlist/:id" element={<Playlist/>} />
        <Route path="/search/album/:id" element={<Album/>} />
      </Routes>
    </div>
  );
}

export default ContentPanel;