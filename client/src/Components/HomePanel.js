import React, { useEffect, useState } from "react";
import styles from "../Styles/Homepanel.module.css";
import ReviewPost from "./ReviewPost";
import useProps from "../Context/PropContex";
import { formatDistanceToNow } from "date-fns";

function HomePanel() {
  const [allReviews, setAllReviews] = useState([]);
  const { access_token, setDevice, setNavlinkActivelValue } = useProps();

  const arrangeReviews = (reviews) => {
    const latestReviews = reviews.reverse();
    setAllReviews(latestReviews);
  };

  useEffect(() => {
    setNavlinkActivelValue("None");
    fetch(`http://localhost:5000/posts`)
      .then((fetch_response) => fetch_response.json())
      .then((reviews) => {
        arrangeReviews(reviews);
      });
    if (access_token) {
      try {
        fetch(`https://api.spotify.com/v1/me/player/devices`, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
          .then((fetch_response) => fetch_response.json())
          .then((devices) => {
            if (devices.devices.length > 0) {
              setDevice(devices.devices[0].id);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [access_token]);

  return (
    <div className={styles.homepanel}>
      {allReviews
        ? allReviews.map((review) => (
            <ReviewPost review={review} key={review._id} />
          ))
        : null}
    </div>
  );
}

export default HomePanel;
