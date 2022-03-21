import React from "react";
import styles from "../Styles/Sidepanel.module.css";
import { MdHome } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md"
import useProps from "../Context/PropContex"

function SidePanelButton({ button_value }) {
  const { setSidePanelValue, setSideButtonActivelValue, isButtonActive_value } = useProps()

  return (
    <div
      className={isButtonActive_value === button_value ? styles.sidepanel_item_active : styles.sidepanel_item}
      onClick={() => {
        setSideButtonActivelValue(button_value);
        setSidePanelValue(button_value);     
      }}
    >
      {button_value === "Home" && <MdHome className={styles.icon} size="2em" />}
      {button_value === "Search" && <MdSearch className={styles.icon} size="2em" />}
      {button_value === "Library" && <MdLibraryMusic className={styles.icon} size="2em" />}
      
      {button_value === "Home" && "Home"}
      {button_value === "Search" && "Search"}
      {button_value === "Library" && "Your Library"}

    </div>
  );
}

export default SidePanelButton;
