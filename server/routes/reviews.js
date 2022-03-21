import express from "express";
import { getAllReviews, getUserReviews } from "../controllers/reviews.js";
import { createReview, editReview, deleteReview } from "../controllers/reviews.js";
const router = express.Router()

router.get('/', getAllReviews)
router.get('/reviews/:user', getUserReviews)
router.post('/:itemId', createReview)
router.put('/edit/:_id', editReview)
router.delete('/reviews/delete/:_id', deleteReview)

export default router


// /:review/:reviewType/:itemId/:photoUri/:createdAt