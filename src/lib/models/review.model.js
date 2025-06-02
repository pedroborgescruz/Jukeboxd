import mongoose from 'mongoose'; 

// This is a MongoDB schema for a review on Jukeboxd.

const reviewSchema = new mongoose.Schema(
  {
    albumId: {   // ID for the album associated to the review.
      type: String,
    },
    text: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { // Name of the user who wrote the review
        type: String,
        required: true,
    },
    username: { // Username of the user who wrote the review
        type: String,
        required: true,
    },
    profileImg: { // Profile image URL of the user who wrote the review
        type: String,
        required: true,
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    comments: {
        type: [
          {
            comment: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who wrote the comment
            name: String, // Name of the user who wrote the comment
            username: String, // Username of the user who wrote the comment
            profileImg: String, // Profile image URL of the user who wrote the comment
            createdAt: { type: Date, default: Date.now },
          },
        ],
        default: [],
    },
  },
  { timestamps: true } 
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;