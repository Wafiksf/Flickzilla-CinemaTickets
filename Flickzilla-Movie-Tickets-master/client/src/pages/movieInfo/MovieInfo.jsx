import "./MovieInfo.css";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/loading";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add this import
import { fetchUserInfoFromToken } from "../../components/fetchUser";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Icons from "../../components/icons/icons";
import { Waveform } from '@uiball/loaders'

export default function MovieInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reviewContent, setReviewContent] = useState("");
  const [user, setUser] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [reviewsLoading, setReviewsLoading] = useState(false); // Loading state for reviews


  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
    fetchReviews();
  }, []);

  const handleReviewChange = (event) => {
    setReviewContent(event.target.value);
  };
  const handleReviewSubmit = async () => {
    try {
      if (!user) {
        console.error("User data is not available.");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/save", {
        userId: user._id,
        movieId: id,
        content: reviewContent,
      });

      if (response.status === 200) {
        console.log("Review submitted:", reviewContent);
        setReviewContent("");

        // Update the reviews state with the new review
        const newReview = {
          _id: response.data._id, // Replace this with the actual property from the response
          userId: user,
          content: reviewContent,
        };
        setReviews((prevReviews) => [newReview, ...prevReviews]);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/movies/find/${id}`)
      .then((response) => response.json())
      .then((data) => setMovieData(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  useEffect(() => {
    if (movieData && movieData.genre) {
      // Choose the first genre from the list
      const selectedGenre = movieData.genre.split(",")[0].trim();
      console.log(selectedGenre);

      fetch(
        `http://localhost:5000/movies/bygenre?genre=${encodeURIComponent(
          selectedGenre
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Get the first 4 related movies
          const relatedMoviesSlice = data.slice(0, 4);
          setRelatedMovies(relatedMoviesSlice);
        })
        .catch((error) =>
          console.error("Error fetching related movies:", error)
        );
    }
  }, [movieData]);

  useEffect(() => {
    // Fetch reviews for the specific movie ID
    setReviewsLoading(true);

    axios
      .get(`http://localhost:5000/api/reviews/${id}`)
      .then(async (response) => {
        const updatedReviews = [];

        for (const review of response.data) {
          try {
            const userResponse = await axios.get(
              `http://localhost:5000/users/find/${review.userId}`
            );
            const userData = userResponse.data;

            updatedReviews.push({
              _id: review._id,
              userId: userData,
              content: review.content,
            });
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }

        setReviews(updatedReviews);
        setReviewsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviewsLoading(false);
      });
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews/all"); // Change this URL to match your backend route
      const data = await response.json();
      console.log(data);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  if (!movieData) {
    return <Loading />;
  }

  const {
    title,
    plot,
    poster,
    trailerVideoId,
    director,
    backdrop,
    writer,
    runtime,
    rated,
    genre,
    released,
    cast,
    language,
    isComingSoon,
  } = movieData;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleGetTicketClick = (movieId) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/getTicket/${movieId}`);
    } else {
      // Store the intended redirect path and then navigate to the login page
      localStorage.setItem("redirectPath", `/getTicket/${movieId}`);
      navigate("/login");
    }
  };

  return (
    <>
      <div className="movie-info-container">
        <div className="robot-about">
          <img src={backdrop[0]} alt={title} />
          <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold text-center">
            {title}
          </h1>
        </div>
        <div className="rubon mt-3">
          <img
            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
            alt="rubon"
          ></img>
        </div>
        <div className="movie-details">
          <div className="top-content">
            <div className="movie-heading">
              <h1 className="movie-title font-bold">{title}</h1>
              <p>
                {genre} / {runtime}
              </p>
            </div>

            <div className="btn-tiket">
              {!isComingSoon && (
                <button
                onClick={() => handleGetTicketClick(id)}
                className="btn btn-booking"
              >
                Get Ticket
              </button>
              )}
            </div>
          </div>

          <div className="movie-content">
            <div className="movie-image">
              <img src={poster[0]} alt={title} />
            </div>
            <div id="player" className="movie-trailer">
              <YouTube
                videoId={trailerVideoId}
                opts={{ height: "500", width: "800" }}
              />
            </div>
          </div>

          <ul className="info-list">
            <li className="item item-0">
              <h4 className="info-title">Director:</h4>
              <span className="value">{director}</span>
            </li>
            <li className="item item-1">
              <h4 className="info-title">Released:</h4>
              <span className="value">{released}</span>
            </li>
            <li className="item item-2">
              <h4 className="info-title">Writer:</h4>
              <span className="value">{writer}</span>
            </li>
            <li className="item item-3">
              <h4 className="info-title">Time:</h4>
              <span className="value">{runtime} </span>
            </li>
            <li className="item item-4">
              <h4 className="info-title">Rating:</h4>
              <span className="value">{rated}</span>
            </li>
            <li className="item item-5">
              <h4 className="info-title">Language:</h4>
              <span className="value">{language}</span>
            </li>
          </ul>
          <hr />

          <div className="movie-cast">
            <h1 className="movie-title-h1 cast-title">Top Cast</h1>
            <div className="movie-cast-list four_column">
              {cast.cast.map((castMember) => (
                <div key={castMember.id} className="movie-cast-item">
                  <div className="cast-thumbnail">
                    <img
                      src={
                        castMember.profile_path
                          ? `https://image.tmdb.org/t/p/original/${castMember.profile_path}`
                          : "https://img.freepik.com/free-icon/man_318-677829.jpg"
                      }
                      alt={castMember.name}
                    />
                  </div>
                  <div className="cast-info">
                    <h4 className="cast-name">{castMember.name}</h4>
                    <p className="cast-description">
                      as {castMember.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="main-content">
            <h1 className="movie-title-h1 story-title">Story Line</h1>
            <p>{plot}</p>
          </div>

          <div className="reviews-container bg-black text-white p-6 shadow-md my-10">
            <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>
            {/* Display user's first and last name */}
            <textarea
              className="w-full p-3 bg-gray-100 text-black rounded border border-pink2 focus:outline-none focus:ring focus:ring-pink2"
              placeholder="Write your review here..."
              value={reviewContent}
              onChange={handleReviewChange}
            />
            <div className="flex items-center justify-between">
              <div>
            <button
              className="mr-5 py-2 px-4 trending-btn text-white rounded focus:outline-none focus:ring focus:ring-red-300"
              onClick={handleReviewSubmit}
            >
              Send
            </button>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold flicklogo text-xl">Share Your Experience On : </h1>
              <div className="mt-2">
                <FacebookShareButton
                  url={backdrop[0]}
                  quote={`"${title}" - amazing movie`}
                  hashtag={`#${title}`}
                >
                  <div className="mx-2">
                    <Icons.Facebook size={30} className="text-[#1877F2]" />
                  </div>
                </FacebookShareButton>
                <TwitterShareButton
                  url={backdrop[0]}
                  title={`"${title}" - amazing movie`}
                  hashtag={`#${title}`}
                >
                  <div className="mx-2">
                    <Icons.Twitter size={30} className="text-[#1DA1F2]" />
                  </div>
                </TwitterShareButton>
              </div>
            </div>
            </div>

            {/* Display reviews */}
            <h2 className="text-2xl font-semibold mt-6 mb-4">Reviews</h2>
            {reviews.length === 0 ? (
            <div className="flex justify-center items-center">
              {reviewsLoading ? (
                <Waveform size={30} color="#fff" />
              ) : (
                "No reviews yet."
              )}
            </div>
          ) : (
              <ul>
                {reviews.map((review) => (
                  <li key={review._id} className="mb-4">
                    <div className="review-header flex">
                      <div className="profile-pic ">
                        <img
                          src={
                            review.userId.profilePic ||
                            "default-profile-pic-url"
                          }
                          alt={`${review.userId.firstName} ${review.userId.lastName}'s Profile Pic`}
                          className="w-12 border rounded-full"
                        />
                      </div>
                      <div className="ml-2">
                        <h3 className="text-lg font-semibold">
                          {`${review.userId.firstName} ${review.userId.lastName}`}
                        </h3>
                        <p>{review.content}</p>
                      </div>
                    </div>
                    <hr className="mt-5"></hr>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="main-content">
            <h1 className="movie-title-h1 story-title">
              More Movies Like This
            </h1>
          </div>
          <div className="movies">
            {relatedMovies.map((relatedMovie) => (
              <div className="movie" key={relatedMovie._id}>
                <img src={relatedMovie.poster[0]} alt={relatedMovie.title} />
                <div className="movieInfo">
                  <h1 className="font-bold">{relatedMovie.title}</h1>
                  <h5 className="font-light hide">{relatedMovie.language}</h5>
                  <p className="hide">{relatedMovie.plot}</p>
                  <div>
                    <button
                      onClick={() => {
                        navigate(`/movies/${relatedMovie._id}`);
                        scrollToTop();
                      }}
                      className="moreInfoBtn rounded hover:bg-pink2"
                    >
                      More Info
                    </button>
                    <button className="bookBtn rounded hover:bg-pink hide">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
