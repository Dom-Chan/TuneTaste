import React from "react";
import { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import useProps from "../Context/PropContex";
import Card from "./Card";
import styles from "../Styles/Albumpanel.module.css"

export default function AlbumPanel() {
  const { access_token, setNavlinkActivelValue } = useProps();
  const [user_albums, setUserAlbums] = useState([]);
  const linkStyle = { textDecoration: "none"};
 
  useEffect(() => {
    setNavlinkActivelValue("Albums")
    if (access_token) {
      fetch(`https://api.spotify.com/v1/me/albums`, {
        headers: {Authorization: "Bearer " + access_token}})
        .then((fetch_response) => fetch_response.json())
        .then((albums) => {
          setUserAlbums(albums.items);
        })
        .catch((err) => console.log(err));
    }
  }, [access_token]);

  return (
    <div className={styles.albumpanel}>
      {user_albums
        ? user_albums.map((album) => (
            <Link to={`album/${album.album.id}`} key={album.album.id} style={linkStyle}>
              <Card type={album.album.type} card_value={album.album}/>
            </Link>
          ))
        : null}
    </div>
  );
}
