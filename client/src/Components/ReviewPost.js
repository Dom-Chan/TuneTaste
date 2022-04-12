import React, { useEffect, useState } from "react";
import useProps from "../Context/PropContex";
import styles from "../Styles/Reviewpost.module.css";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import { deleteReview } from "../API/Reviews";
import {play_track,play_playlist,play_artist,play_album,} from "../API/Play";
import logo from "../Images/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { MdAudiotrack } from "react-icons/md";

function ReviewPost({ review }) {
  const {
    access_token,
    device,
    country,
    isNavlinkActive_value,
    setPlaying,
    subscription,
  } = useProps();
  const [playlist, setPlaylist] = useState([]);
  const [album, setAlbum] = useState([]);
  const [photoUri, setPhotoUri] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [playObject, setplayObject] = useState("");
  const [playId, setplayId] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updatedPost, setUpdatedPost] = useState([]);
  const [deletedPost, setDeletedPost] = useState(false);
  const type1 = "PLAYLIST";
  const type2 = "ARTIST";

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/users/${review.creator_id}`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((fetch_response) => fetch_response.json())
      .then((user) => {
        setUserPhoto(user.images[0].url);
      });

    if (review.reviewType === "Playlist") {
      fetch(`https://api.spotify.com/v1/playlists/${review.itemId}`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((fetch_response) => fetch_response.json())
        .then((playlist) => {
          setPlaylist(playlist);
          if (playlist.images[0] !== undefined) {
            setPhotoUri(playlist.images[0].url);
          }
          setplayObject(playlist.uri);
        })
        .catch((err) => console.log(err));
    } else if (review.reviewType === "Track") {
      fetch(`https://api.spotify.com/v1/tracks/${review.itemId}`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((fetch_response) => fetch_response.json())
        .then((track) => {
          setPhotoUri(track.album.images[0].url);
          setplayObject(track.uri);
          setTrackArtist(track.artists[0].name);
          setplayId(track.id);
        });
    } else if (review.reviewType === "Artist") {
      fetch(`https://api.spotify.com/v1/artists/${review.itemId}`, {
        headers: { Authorization: "Bearer " + access_token },
      })
        .then((fetch_response) => fetch_response.json())
        .then((artist) => {
          if (artist.images[0] !== undefined) {
            setPhotoUri(artist.images[0].url);
          }
          setplayObject(artist.uri);
        });
    } else if (review.reviewType === "Album") {
      fetch(`https://api.spotify.com/v1/albums/${review.itemId}`, {
        headers: { Authorization: "Bearer " + access_token },
      })
        .then((fetch_response) => fetch_response.json())
        .then((album) => {
          setPhotoUri(album.images[0].url);
          setplayObject(album.uri);
          setAlbum(album);
        });
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
  };
  const play = async () => {
    if (subscription === "premium") {
      //play first track in a playlist
      if (review.reviewType === "Playlist") {
        setPlaying(playlist.tracks.items[0].track.id);
        play_playlist({ device, playlist, access_token });
      }

      //play a single track
      if (review.reviewType === "Track") {
        setPlaying(playId);
        play_track({ device, playObject, access_token });
      }
      //play an artist's track from their album
      if (review.reviewType === "Artist") {
        const artist_track_id = await play_artist({device,review,country,access_token,});
        setPlaying(artist_track_id);
      }

      //play an album
      if (review.reviewType === "Album") {
        setPlaying(album.tracks.items[0].id);
        play_album({ device, album, access_token });
      }
    } else window.alert("UPGRADE TO PREMIUM TO PLAY MUSIC");
  };

  const handleDelete = () => {
    console.log(review._id);
    deleteReview({ _id: review._id });
    setDeletedPost(true);
  };

  return (
    <>
      {!deletedPost && (
        <div className={styles.post}>
          {isNavlinkActive_value === "Reviews" && (
            <div
              className={styles.cancel_button_wrapper}
              title="Delete review?"
              onClick={handleDelete}
            >
              <ImCancelCircle />
            </div>
          )}
          <div className={styles.title_wrapper} title="PLAY ON SPOTIFY">
            {photoUri.length > 0 ? (
              <img
                className={styles.image}
                src={photoUri}
                alt=""
                onClick={play}
              ></img>
            ) : (
              <div className={styles.card_img_default}>
                {review.reviewType === "Playlist" ? (
                  <IoMusicalNotesSharp />
                ) : review.reviewType === "Artist" ? (
                  <BsFillPersonFill />
                ) : review.reviewType === "Album" ? (
                  <MdAlbum />
                ) : review.reviewType === "Track" ? (
                  <MdAudiotrack />
                ) : null}
              </div>
            )}

            <div className={styles.secondary_wrapper}>
              <img src={logo} className={styles.logo}></img>
              <p className={styles.title}>{review.itemTitle}</p>
              <p className={styles.subtitle}>
                {review.reviewType === "Playlist"
                  ? type1
                  : review.reviewType === "Artist"
                  ? type2
                  : review.reviewType === "Track"
                  ? trackArtist
                  : "ALBUM"}
              </p>
              {review.reviewType === "Track" && (
                <p className={styles.song}>SONG</p>
              )}
            </div>
          </div>
          <div className={styles.separator}></div>
          <p className={styles.review}>
            {updatedPost.length > 0 ? updatedPost : review.review}
          </p>

          <p className={styles.name}>
            <img src={userPhoto} className={styles.userphoto}></img>
            {review.creator}
          </p>
          {isNavlinkActive_value === "Reviews" && (
            <ReviewButton button_value="Review" openModal={openModal} />
          )}
          {showModal && (
            <ReviewModal
              showModal={showModal}
              setShowModal={setShowModal}
              title={review.itemTitle}
              type={review.reviewType}
              id={review.itemId}
              ObjectId={review._id}
              current_review={review.review}
              modalFunction="updateReview"
              setUpdatedPost={setUpdatedPost}
            />
          )}
        </div>
      )}
    </>
  );
}

export default ReviewPost;
