import React from "react";
import styles from "../Styles/Reviewbutton.module.css";
import styles2 from "../Styles/Track.module.css";
import { BsPencilSquare } from "react-icons/bs";

function ReviewButton({ button_value, openModal }) {
  return (
    <div
      className={
        (button_value !== "Track" && button_value !== "Review")
          ? styles.reviewButton_lg
          : button_value === "Review"
          ? styles.reviewButton_lg_edit
          : styles2.reviewButton_sm
      }
      onClick={openModal}
    >
      {button_value !== "Track" && button_value !== "Review" && (
        <p className={styles.text}>Review this {button_value}</p>
      )}

      {button_value === "Review" && <p className={styles.text}>Edit </p>}
      <BsPencilSquare title="Review this track"/>
    </div>
  );
}

export default ReviewButton;
