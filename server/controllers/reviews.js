import reviewModel from "../models/reviewModel.js";

export const getAllReviews = async (req, res) => {
  try {
    const allReviews = await reviewModel.find();
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserReviews = async (req, res) => {
  const { user } = req.params;
  try {
    const userReviews = await reviewModel.find({ creator: user });
    res.status(200).json(userReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  //const { itemTitle, creator, review, reviewType, itemId } = req.params;
  const { itemTitle, creator, review, reviewType, itemId, creator_id } = req.body;
  console.log(req.body)
 
  const newReview = reviewModel({
    itemTitle,
    creator,
    review,
    reviewType,
    itemId,
    creator_id
  });

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editReview = async (req, res) => {
  const { _id } = req.params;
  const { itemTitle, creator, review, reviewType, itemId, creator_id } = req.body;
  const newReview = { itemTitle, creator, review, reviewType, itemId, creator_id };
  try {
    await reviewModel.findByIdAndUpdate(_id, newReview, { new: true });
    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { _id } = req.params;
  try {
    const newReview = await reviewModel.findByIdAndDelete(_id);
    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
