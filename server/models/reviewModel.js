import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    itemTitle: String,
    creator: String,
    review: String,
    reviewType: String, //Plalist, Artist, or album
    itemId: String,
    creator_id: String,
    createdAt: {
        type: Date,
        default: new Date()
    },

})

const ReviewModel = mongoose.model('ReviewModel', reviewSchema)

export default ReviewModel