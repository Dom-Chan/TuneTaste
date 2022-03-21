import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProps from "../Context/PropContex";
import Card from "./Card";
import styles from "../Styles/Playlistpanel.module.css"

export default function PlaylistPanel() {
  const { access_token, setNavlinkActivelValue } = useProps();
  const [user_playlists, setUserPlaylists] = useState([]);
  const linkStyle = { textDecoration: "none"};
  
 
  useEffect(() => {
    setNavlinkActivelValue("Playlists")
    if (access_token) {
      //https://api.spotify.com/v1/users/${user_id}/playlists
      //`https://api.spotify.com/v1/me/tracks`
      fetch(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((fetch_response) => fetch_response.json())
        .then((playlists) => {
          setUserPlaylists(playlists.items);
        })
        .catch((err) => console.log(err));
    }
  }, [access_token]);


  return (
    <div className={styles.playlistpanel}>
      {user_playlists
        ? user_playlists.map((playlist) => (
            <Link to={`playlist/${playlist.id}`} key={playlist.id} style={linkStyle}>
              <Card type={playlist.type} card_value={playlist}/>
            </Link>
          ))
        : console.log('empty playlists')}
    </div>
  );
}
