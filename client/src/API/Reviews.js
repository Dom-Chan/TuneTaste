export const createReview = ({
  itemTitle,
  creator,
  review,
  reviewType,
  itemId,
  user_id
}) => {
  fetch(
    `http://localhost:5000/posts/${itemId}`,
    {
      method: "POST",
      body: JSON.stringify({
        itemTitle: itemTitle,
        creator: creator,
        review: review,
        reviewType: reviewType,
        itemId: itemId,
        creator_id: user_id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((fetch_response) => console.log(fetch_response));
};

export const editReview = ({
  itemTitle,
  creator,
  review,
  reviewType,
  itemId,
  _id,
  user_id
}) => {
  fetch(
    `http://localhost:5000/posts/edit/${_id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        itemTitle: itemTitle,
        creator: creator,
        review: review,
        reviewType: reviewType,
        itemId: itemId,
        creator_id: user_id
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }
  ).then((fetch_response) => console.log(fetch_response));
};

export const deleteReview = ({ _id }) => {
  fetch(`http://localhost:5000/posts/reviews/delete/${_id}`, {
    method: "DELETE",
  }).then((fetch_response) => console.log(fetch_response));
};
