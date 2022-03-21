import React, { useEffect, useState } from "react";
import styles from "../Styles/Homepanel.module.css";
import ReviewPost from "./ReviewPost";
import useProps from "../Context/PropContex";

function ReviewPanel() {
  const [userReviews, setuserReviews ] = useState([]);
  const { access_token, user, setNavlinkActivelValue } = useProps();

  useEffect(() => {
    setNavlinkActivelValue("Reviews")
    
    fetch(`http://localhost:5000/posts/reviews/${user}`)
      .then((fetch_response) => fetch_response.json())
      .then((reviews) => {
        setuserReviews(reviews);
      });

  }, []);

  return (
    <div className={styles.homepanel}>
      {userReviews
        ? userReviews.map((review) => (
            <ReviewPost review={review} key={review._id} />
          ))
        : null}
    </div>
  );
}

export default ReviewPanel;
