import React, { useEffect, useState } from "react";
import Icons from "../../components/icons/icons";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/loading";
import {
  fetchMovies,
  fetchRandomBackdrop,
  fetchUpcomingMovies,
  fetchTrendingMovie,
} from "../../utils/HandleApi";
import "./Home.css";
import Footer from "../../components/footer/Footer";
import "../../input.css";
import YouTube from "react-youtube";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [backdrops, setBackdrops] = useState(null);
  const [upcomings, setUpcomings] = useState([]);
  const [trendings, setTrendings] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        const firstFourMovies = data.slice(0, 8);
        setMovies(firstFourMovies);
      })
      .catch((error) => console.error("Error fetching movie data:", error));
  }, []);

  useEffect(() => {
    fetchRandomBackdrop()
      .then((data) => setBackdrops(data))
      .catch((error) => console.error("Error fetching movie data:", error));
  }, []);

  useEffect(() => {
    fetchUpcomingMovies()
      .then((data) => {
        const threeupcomings = data.slice(0, 3);
        setUpcomings(threeupcomings);
      })
      .catch((error) => console.error("Error fetching movie data:", error));
  }, []);

  useEffect(() => {
    fetchTrendingMovie()
      .then((data) => setTrendings(data))
      .catch((error) => console.error("Error fetching movie data:", error));
  }, []);

  useEffect(() => {
    if (backdrops) {
      const backdropLengths = backdrops.map((movie) => movie.backdrop.length);

      const randomNumber = Math.floor(Math.random() * backdropLengths);
      setRandomNumber(randomNumber);
    }
  }, [backdrops]);
  const onEndHandler = (event) => {
    event.target.seekTo(30);
    event.target.playVideo();
  };

  if (!backdrops) {
    return <Loading />;
  }
  const handleBookClick = (movieId) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/getTicket/${movieId}`);
    } else {
      navigate("/login");
    }
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
      {backdrops.map((movie) => (
        <section className="backdrop" key={movie._id}>
          {videoPlaying ? (
            <div className="youtube-wrapper">
              <YouTube
                videoId={movie.trailerVideoId}
                opts={{
                  playerVars: {
                    autoplay: 1,
                    start: 30,
                    end: 45,
                    controls: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    autohide: 1,
                    loop: 1,
                    mute: 0,
                  },
                }}
                onEnd={onEndHandler}
              />
            </div>
          ) : (
            <img
              className="cover"
              src={movie.backdrop[randomNumber]}
              alt={movie.title}
            ></img>
          )}
          {movie.isComingSoon ? (
            <div className="animated-slide-in-home absolute top-40 left-40 text-center text-white comingsIn">
              <h1 className="flicklogo font-bold text-xl">Comings In</h1>
              <p>{movie.released}</p>
              <hr className="border border-pink2"></hr>
            </div>
          ) : null}
          <div className="moreInfo animated-slide-in-home">
            <div className="flicklogo font-bold">
              <h1 className="xl:text-xl">{movie.genre}</h1>
            </div>
            <div className="title hover:text-pink">
              <h1 onClick={() => navigate(`/movies/${movie._id}`)}>
                {movie.title}
              </h1>
            </div>
            <div className="director">directed by {movie.director}</div>
            <div>
              <button
                className="ticketBtn rounded hover:bg-pink hide"
                onClick={() => handleGetTicketClick(movie._id)}
              >
                Get Ticket
              </button>
            </div>
          </div>
          <div className="animated-slide-in-home-reverse">
            <button
              className="playButton"
              onClick={() => setVideoPlaying(!videoPlaying)}
            >
              {videoPlaying ? (
                <Icons.StopCircle size={25} className="text-pink" />
              ) : (
                <Icons.PlayCircle
                  size={25}
                  className="text-white hover:text-pink transition-colors duration-300"
                />
              )}
            </button>
          </div>
        </section>
      ))}
      <div className="rubon mt-3">
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
          alt="rubon"
        ></img>
      </div>
      <section className="firstSec">
        <div className="moviesNowPlaying">
          <div>
            <Icons.Film size={32} className="text-pink2" />
          </div>
          <p className="flicklogo font-bold">Now Playing</p>
          <div>
            <h1 className="font-bold">Movies Now Playing</h1>
          </div>
        </div>
        <div className="movies">
          {movies.map((movie) => (
            <div className="movie" key={movie._id}>
              <img src={movie.poster[0]} alt={movie.title} />
              <div className="movieInfo">
                <h1 className="font-bold">{movie.title}</h1>
                <h5 className="font-light hide">{movie.language}</h5>
                <p className="hide">{movie.plot}</p>
                <div>
                  <button
                    onClick={() => navigate(`/movies/${movie._id}`)}
                    className="moreInfoBtn rounded hover:bg-pink2"
                  >
                    More Info
                  </button>
                  <button
                    className="bookBtn rounded hover:bg-pink hide"
                    onClick={() => handleBookClick(movie._id)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="sec">
        <div className="moviesNowPlaying">
          <div>
            <Icons.Film size={32} className="text-pink2" />
          </div>
          <p className="flicklogo font-bold">New Upcoming Movies</p>
          <div>
            <h1 className="font-bold text-white">Movies Coming Soon</h1>
          </div>
        </div>
        <div className="upMovies">
          {upcomings.map((movie) => (
            <div className="upMovie" key={movie._id}>
              <figure>
                <img
                  className="rotate"
                  src={movie.backdrop[0]}
                  alt={movie.title}
                />
                <div className="childInfo">
                  <p>Coming In {movie.released}</p>
                  <h2>{movie.title}</h2>
                  <button
                    onClick={() => navigate(`/movies/${movie._id}`)}
                    className="wTrailer rounded"
                  >
                    Watch Trailer
                  </button>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </section>
      <section className="h-screen flex justify-center items-center bg-classic home-trending border-b-2">
        <div className="flex container mx-10 flex-col-reverse md:flex-row">
          {trendings.map((trending, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 md:order-2">
                <img
                  src={trending.poster[0]}
                  alt="Upcoming Book"
                  className="w-[60%] mx-auto shadow-2xl"
                />
              </div>
              <div className="flex-1 md:order-1 my-auto cont-trending-info">
                <div className="moviesNowPlaying-left">
                  <div>
                    <Icons.Film size={32} className="text-pink2" />
                  </div>
                  <p className="flicklogo font-bold w-min">Trending</p>
                  <div>
                    <h1 className="font-bold text-black">Trending Movie</h1>
                  </div>
                </div>
                <div className="link-p">
                  <h1 className="font-bold lg:text-2xl">{trending.title}</h1>
                  <p>{trending.language}</p>
                  <p className="mb-6 mt-3">
                    {trending.plot}
                  </p>
                  <button
                    onClick={() => navigate(`/movies/${trending.movieId}`)}
                    className="trending-btn text-white px-6 py-3 rounded"
                  >
                    More Info
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="icons-section my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
          <div className="flex items-center justify-center flex-col">
            <Icons.EventSeat className="service-icon" size={48} />
            <h2 className="text-center mt-3 text-lg font-bold">Choose Seats</h2>
          </div>
          <div className="flex items-center justify-center flex-col">
            <Icons.Child className="service-icon" size={48} />
            <h2 className="text-center mt-3 text-lg font-bold">Family Shows</h2>
          </div>
          <div className="flex items-center justify-center flex-col">
            <Icons.CreditCard className="service-icon" size={48} />
            <h2 className="text-center mt-3 text-lg font-bold">
              Payment Choices
            </h2>
          </div>
          <div className="flex items-center justify-center flex-col">
            <Icons.Crown className="service-icon" size={48} />
            <h2 className="text-center mt-3 text-lg font-bold">Vip Tickets</h2>
          </div>
          <div className="flex items-center justify-center flex-col">
            <Icons.Clock className="service-icon" size={48} />
            <h2 className="text-center mt-3 text-lg font-bold">
              Live Seat Status
            </h2>
          </div>
          <div className="flex items-center justify-center flex-col">
            <Icons.Popcorn className="service-icon" size={48} />
            <h2 className="text-center mt-3 text-lg font-bold">
              Food & Drinks
            </h2>
          </div>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
