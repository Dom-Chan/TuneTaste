import React, { useEffect, useState } from "react";
import useProps from "../Context/PropContex";
import styles from "../Styles/Reviewpost.module.css";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import { deleteReview } from "../API/Reviews";
import logo from "../Images/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { MdAudiotrack } from "react-icons/md";

function ReviewPost({ review }) {
  const { access_token, device, country, isNavlinkActive_value, setPlaying } =
    useProps();
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
          setPhotoUri(playlist.images[0].url);
          setplayObject(playlist.uri);
        });
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
          setPhotoUri(artist.images[0].url);
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
  const play = () => {
    //play first track in a playlist
    if (review.reviewType === "Playlist") {
      setPlaying(playlist.tracks.items[0].track.id);
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
        method: "PUT",
        body: JSON.stringify({
          context_uri: `spotify:playlist:${playlist.id}`,
          offset: { uri: playlist.tracks.items[0].track.uri },
        }),
        headers: { Authorization: "Bearer " + access_token },
      }).then((res) => {
        if (res.status === 404) {
          window.alert("OPEN SPOTIFY and refresh page");
        }
      });
    }

    //play a single track
    if (review.reviewType === "Track") {
      setPlaying(playId);
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
        method: "PUT",
        body: JSON.stringify({ uris: [playObject] }),
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }).then((res) => {
        if (res.status === 404) {
          window.alert("OPEN SPOTIFY and refresh page");
        }
      });
    }
    //play an artist's track from their album
    if (review.reviewType === "Artist") {
      fetch(
        `https://api.spotify.com/v1/artists/${review.itemId}/albums?include_groups=album,single&market=${country}`,
        { headers: { Authorization: "Bearer " + access_token } }
      )
        .then((fetch_response) => fetch_response.json())
        .then((arr) => {
          return fetch(`https://api.spotify.com/v1/albums/${arr.items[0].id}`, {
            headers: { Authorization: "Bearer " + access_token },
          })
            .then((fetch_response) => fetch_response.json())
            .then((album) => {
              setPlaying(album.tracks.items[0].id);
              return fetch(
                `https://api.spotify.com/v1/me/player/play?device_id=${device}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    context_uri: album.uri,
                    offset: { uri: album.tracks.items[0].uri },
                  }),
                  headers: { Authorization: "Bearer " + access_token },
                }
              );
            })
            .then((res) => {
              if (res.status === 404) {
                window.alert("OPEN SPOTIFY and refresh page");
              }
            });
        })
        .catch((err) => console.log(err));
    }

    //play an album
    if (review.reviewType === "Album") {
      setPlaying(album.tracks.items[0].id);
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
        method: "PUT",
        body: JSON.stringify({
          context_uri: album.uri,
          offset: { uri: album.tracks.items[0].uri },
        }),
        headers: { Authorization: "Bearer " + access_token },
      }).then((res) => {
        if (res.status === 404) {
          window.alert("OPEN SPOTIFY and refresh page");
        }
      });
    }
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
