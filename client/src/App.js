import React, { useEffect, useState, useLayoutEffect } from "react";
import authenticate from "./API/Authenticate";
import "./App.css";
import SidePanel from "./Components/SidePanel";
import ContentPanel from "./Components/ContentPanel";
import useProps from "./Context/PropContex";
import PlayerPanel from "./Components/PlayerPanel";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


function App() {
  const accesstoken = authenticate();
  const { setAccessToken, playing } = useProps();
  const [media, setMedia] = useState("")
  const [width, height] = useWindowSize();


  useEffect(() => {
    setAccessToken(accesstoken)
  }, [accesstoken]);

  return (
    <div className="page">
      <SidePanel />
      <ContentPanel />
      {(width > 1200 && playing) && <PlayerPanel/>}
    </div>
  );
}

export default App;
