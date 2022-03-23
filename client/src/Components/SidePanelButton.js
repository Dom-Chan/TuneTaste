import React from "react";
import styles from "../Styles/Sidepanel.module.css";
import styles2 from "../Styles/Toppanel.module.css";
import { MdHome } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import useProps from "../Context/PropContex";

function SidePanelButton({ button_value, panel }) {
  const { setSidePanelValue, setSideButtonActivelValue, isButtonActive_value } =
    useProps();

  return (
    <div
      className={
        isButtonActive_value === button_value
          ? styles.sidepanel_item_active
          : styles.sidepanel_item
      }
      onClick={() => {
        setSideButtonActivelValue(button_value);
        setSidePanelValue(button_value);
      }}
    >
      {button_value === "Home" && (
        <MdHome
          className={panel === "sidepanel" ? styles.icon : styles2.botbutton}
          size="2em"
        />
      )}
      {button_value === "Search" && (
        <MdSearch
          className={panel === "sidepanel" ? styles.icon : styles2.botbutton}
          size="2em"
        />
      )}
      {button_value === "Library" && (
        <MdLibraryMusic
          className={panel === "sidepanel" ? styles.icon : styles2.botbutton}
          size="2em"
        />
      )}

      {button_value === "Home" && panel === "sidepanel" && "Home"}
      {button_value === "Search" && panel === "sidepanel" && "Search"}
      {button_value === "Library" && panel === "sidepanel" && "Your Library"}
    </div>
  );
}

export default SidePanelButton;
