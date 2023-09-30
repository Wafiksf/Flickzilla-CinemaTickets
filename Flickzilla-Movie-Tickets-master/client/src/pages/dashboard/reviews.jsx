import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../components/sidebar/sideBar";
import "./dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState({});

  useEffect(() => {
    fetchReviewsWithUserInfo();
  }, []);

  async function fetchReviewsWithUserInfo() {
    try {
      const response = await axios.get("http://localhost:5000/reviews/all");

      const reviewsWithUserInfo = await Promise.all(
        response.data.map(async (review) => {
          const userResponse = await axios.get(
            `http://localhost:5000/users/find/${review.userId}`
          );
          const user = userResponse.data;
          return { ...review, user };
        })
      );

      setReviews(reviewsWithUserInfo);
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  }

  async function fetchMovieDetails(movieId) {
    try {
      const response = await axios.get(`http://localhost:5000/movies/find/${movieId}`);
      setMovies(prevMovies => ({ ...prevMovies, [movieId]: response.data }));
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  useEffect(() => {
    reviews.forEach(review => {
      if (!movies[review.movieId]) {
        fetchMovieDetails(review.movieId);
      }
    });
  }, [reviews]);

  async function handleDeleteReview(reviewId) {
    try {
      await axios.delete(`http://localhost:5000/reviews/delete/${reviewId}`);
      fetchReviewsWithUserInfo(); // Fetch reviews again after deletion
      toast.success("Review Deleted!", {
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  return (
    <div className="dash-body">
      <div>
        <SideBar />
      </div>
      <div className="content">
        <ToastContainer />
        <div className="title-info">
          <p>Reviews</p>
          <i></i>
        </div>

        <table className="dash-table" id="reviews-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Movie</th>
              <th>Review Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.user.email}</td>
                <td>{movies[review.movieId]?.title || "Loading..."}</td>
                <td>{review.content}</td>
                <td>
                  <button
                    className="bg-red-600 rounded-lg p-2 m-2"
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reviews;
