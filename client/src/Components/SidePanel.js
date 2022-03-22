import React from "react";
import { useEffect, useState } from "react";
import styles from "../Styles/Sidepanel.module.css";
import SidePanelButton from "./SidePanelButton";
import useProps from "../Context/PropContex";
import { Link } from "react-router-dom";
import logo from "../Images/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";

function SidePanel() {
  const [user_name, setUserName] = useState("");
  const [user_img, setUserImg] = useState("");
  const [user_id, setUserId] = useState("");
  const { access_token, setUser, setUserID, setCountry, setSubscription, setDevice } =
    useProps();
  const linkStyle = { textDecoration: "none" };

  useEffect(() => {
    if (access_token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((fetch_response) => fetch_response.json())
        .then((user_profile) => {
          setUserID(user_profile.id)
          setUser(user_profile.display_name);
          setUserName(user_profile.display_name);
          setUserImg(user_profile.images[0].url);
          setUserId(user_profile.id);
          setCountry(user_profile.country);
          setSubscription(user_profile.product);
        })
        .catch((err) => console.log(err));

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
    }
  }, [access_token]);

  return (
    <div className={styles.sidepanel}>
      <div className={styles.userprofile}>
        <img
          src={user_img}
          alt={`${user_id}`}
          className={styles.userphoto}
        ></img>
        <p className={styles.username}>{user_name}</p>
      </div>

      <Link to="/home" style={linkStyle}>
        <SidePanelButton button_value={"Home"} panel="sidepanel"/>
      </Link>
      <Link to="/search" style={linkStyle}>
        <SidePanelButton button_value={"Search"} panel="sidepanel"/>
      </Link>
      <Link to="/library/playlists" style={linkStyle}>
        <SidePanelButton button_value={"Library"} panel="sidepanel"/>
      </Link>

      <div className={styles.logo_div}>
        <img src={logo} className={styles.logo}></img>
      </div>
    </div>
  );
}

export default SidePanel;

