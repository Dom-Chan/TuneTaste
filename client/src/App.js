import React, { useEffect, useState, useLayoutEffect } from "react";
import authenticate from "./API/Authenticate";
import "./App.css";
import SidePanel from "./Components/SidePanel";
import ContentPanel from "./Components/ContentPanel";
import useProps from "./Context/PropContex";
import PlayerPanel from "./Components/PlayerPanel";
import TopPanel from "./Components/TopPanel";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function App() {
  const accesstoken = authenticate();
  const { setAccessToken, playing, access_token, setUser, setUserID, setCountry, setSubscription, setDevice, subscription } = useProps();
  const [width, height] = useWindowSize();

  useEffect(() => {
    setAccessToken(accesstoken);
  }, [accesstoken]);

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
          setCountry(user_profile.country);
          setSubscription(user_profile.product);
          console.log(user_profile)
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
    <div className="container">
      {width < 600 && <TopPanel />}
      <div className="page">
        {width > 600 && <SidePanel />}
        <ContentPanel />
        {(width > 1200 && playing && subscription === "premium") && <PlayerPanel />}
      </div>
    </div>
  );
}

export default App;
