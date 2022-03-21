import React from "react";
import styles from "../Styles/Reviewmodal.module.css";

function ModalBackground({ setShowModal }) {
  return (
    <div
      className={styles.background}
      onClick={() => setShowModal(false)}
    ></div>
  );
}

export default ModalBackground;
