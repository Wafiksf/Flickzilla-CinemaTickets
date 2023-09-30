const express = require('express');
const router = express.Router();
const {
  submitReview,
  getMovieReviews,
  deleteReview,
  getAllReviews
} = require('../controllers/ReviewController');

router.post('/save', submitReview);
router.get('/reviews/:id', getMovieReviews);


// Delete a review
router.delete('/reviews/delete/:reviewId', deleteReview);
// Get all reviews
router.get('/reviews/all', getAllReviews);

module.exports = router;
