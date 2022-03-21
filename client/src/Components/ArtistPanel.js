import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProps from "../Context/PropContex";
import Card from "./Card";
import styles from "../Styles/Artistpanel.module.css"

export default function ArtistPanel() {
  const { access_token, setNavlinkActivelValue } = useProps();
  const [user_artists, setUserArtists] = useState([]);
  const linkStyle = { textDecoration: "none"};
 
  useEffect(() => {
    setNavlinkActivelValue("Artists")
    if (access_token) {
      fetch(`https://api.spotify.com/v1/me/following?type=artist`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((fetch_response) => fetch_response.json())
        .then((artists) => {
          setUserArtists(artists.artists.items);
        })
        .catch((err) => console.log(err));
    }
  }, [access_token]);

  return (
    <div className={styles.artistpanel}>
      {user_artists
        ? user_artists.map((artist) => (
            <Link to={`artist/${artist.id}`} key={artist.id} style={linkStyle}>
              <Card type={artist.type} card_value={artist}/>
            </Link>
          ))
        : null}
    </div>
  );
}
