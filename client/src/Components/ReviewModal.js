import React from "react";
import { useState, useEffect } from "react";
import styles from "../Styles/Reviewmodal.module.css";
import logo from "../Images/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_White.png";
import { ImCancelCircle } from "react-icons/im";
import { createReview, editReview } from "../API/Reviews";
import useProps from "../Context/PropContex";

function ReviewModal({
  setShowModal,
  title,
  type,
  id,
  current_review,
  modalFunction,
  ObjectId,
  setUpdatedPost,
}) {
  const [reviewString, setReviewString] = useState("");
  const [sendPost, setSendPost] = useState(false)
  const { user, userID } = useProps();

  const sendReview = () => {
    const itemTitle = title;
    const creator = user;
    const review = reviewString;
    const reviewType = type;
    const itemId = id;
    const _id = ObjectId;
    const user_id = userID
    setSendPost(true)
    setTimeout(() => {
      setShowModal(false);
    }, 200)
    if (modalFunction === "updateReview") {
      editReview({ itemTitle, creator, review, reviewType, itemId, _id, user_id });
      setUpdatedPost([review]);
    } else createReview({ itemTitle, creator, review, reviewType, itemId, user_id });
  };

  return (
    <>
      <div
        className={sendPost ? styles.sentBackground : styles.background}
        onClick={() => setShowModal(false)}
      ></div>
      <div className={styles.modal}>
        <div className={styles.cancel_button_wrapper}>
          <ImCancelCircle
            className={styles.cancel_button}
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className={styles.title_wrapper}>
          <img src={logo} alt="" className={styles.logo}></img>

          <p className={styles.title}>{title}</p>
          <div className={styles.owner_wrapper}></div>
        </div>

        <div className={styles.separator}></div>
        <textarea
          className={styles.textarea}
          placeholder="Write your review here..."
          onChange={(e) => setReviewString(e.target.value)}
          defaultValue={current_review}
        ></textarea>

        <div
          className={
            reviewString.length > 0
              ? styles.button_post
              : styles.button_post_disabled
          }
          onClick={sendReview}
        >
          Post
        </div>
      </div>
    </>
  );
}

export default ReviewModal;
