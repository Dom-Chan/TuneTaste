import React from "react";
import styles2 from "../Styles/Track.module.css";
import { BsFillPlayFill } from "react-icons/bs";

function PlayButton({play}) {
  return (
    <div className={styles2.reviewButton_sm} onClick={play}>
      <BsFillPlayFill title="Play this track"/>
    </div>
  );
}

export default PlayButton;
