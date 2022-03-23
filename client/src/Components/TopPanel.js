import React from "react";
import { useEffect, useState } from "react";
import styles from "../Styles/Toppanel.module.css";
import SidePanelButton from "./SidePanelButton";
import useProps from "../Context/PropContex";
import { Link } from "react-router-dom";

function TopPanel() {
  const {
    access_token,
    setUser,
    setUserID,
    setCountry,
    setSubscription,
    setDevice,
  } = useProps();


  useEffect(() => {
    if (access_token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((fetch_response) => fetch_response.json())
        .then((user_profile) => {
          setUserID(user_profile.id);
          setUser(user_profile.display_name);
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
    <div className={styles.toppanel}>
      <Link to="/home" className={styles.link}>
        <SidePanelButton button_value={"Home"} className={styles.botbutton}/>
      </Link>
      <Link to="/search" className={styles.link}>
        <SidePanelButton button_value={"Search"} />
      </Link>
      <Link to="/library/playlists" className={styles.link}>
        <SidePanelButton button_value={"Library"} />
      </Link>
    </div>
  );
}

export default TopPanel;
