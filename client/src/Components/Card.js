import React from "react";
import styles from "../Styles/Card.module.css";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { MdAudiotrack } from "react-icons/md";

export default function Card({ type, card_value }) {
  const album = "Album";
  const artist = "Artist";
  const track = "Song";
  if (card_value.description) {
    let filter1 = card_value.description.replaceAll("&quot;", '"');
    let filter2 = filter1.replaceAll("&#x2F;", "/");
    card_value.description = filter2;
  }

  return (
    <div className={styles.card}>
      {type !== "track" &&
      card_value.images !== undefined &&
      card_value.images.length > 0 ? (
        <img
          className={
            type === "artist" ? styles.card_artist_img : styles.card_img
          }
          src={card_value.images.length > 0 ? card_value.images[0].url : null}
          alt=""
        ></img>
      ) : (
        <div className={styles.card_img_default}>
          {type === "playlist" ? (
            <IoMusicalNotesSharp />
          ) : type === "artist" ? (
            <BsFillPersonFill />
          ) : type === "album" ? (
            <MdAlbum />
          ) : type === "track" ? (
            <MdAudiotrack />
          ) : null}
        </div>
      )}
      <p className={styles.card_title}>{card_value.name}</p>
      <p className={styles.card_description}>
        {type === "playlist"
          ? card_value.description
          : type === "album"
          ? album
          : type === "artist"
          ? artist
          : track}
      </p>
    </div>
  );
}
