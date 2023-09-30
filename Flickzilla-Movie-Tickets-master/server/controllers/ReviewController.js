const ReviewModel = require("../models/ReviewsModel");

// Controller to handle submitting a review
exports.submitReview = async (req, res) => {
  try {
    const { userId, movieId, content } = req.body;

    ReviewModel.create({ userId, movieId, content }).then(
      (data) => {
        console.log("Review Added Successfully...");
        console.log(data);
        res.status(200).json({ msg: "Thank you for your review. It has been submitted." });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error." });
  }
};


// Controller to get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching reviews' });
  }
};


// Assuming you have the following code in your ReviewController

// Controller function to delete a review
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(204).end(); // Successfully deleted
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller to handle getting reviews for a specific movie
exports.getMovieReviews = async (req, res) => {
  try {
    const movieId = req.params.id; // Get the movie ID from the URL parameter

    const reviews = await ReviewModel.find({ movieId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching reviews' });
  }
};
