import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { fetchUpcomingMovies } from "../../utils/HandleApi";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Upcoming.css";

const Upcoming = () => {
  const [upcomings, setUpcomings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUpcomingMovies()
      .then((data) => setUpcomings(data))
      .catch((error) => console.error("Error fetching movie data:", error));
  }, []);

  if (upcomings.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className="robot-about">
        <img
          src="https://image.tmdb.org/t/p/original/pZvZjxPFfWWIwtPQodsNygQ6u5Z.jpg"
          alt="interstaller"
        />
        <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">
          Upcoming Movies
        </h1>
      </div>
      <div className="rubon mt-3">
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
          alt="rubon"
        ></img>
      </div>
      <section className="firstSec">
        <div className="upMovies mt-20">
          {upcomings.map((movie) => (
            <div className="upMovie" key={movie._id}>
              <figure className="shadow-2xl">
                <img
                  className="rotate"
                  src={movie.backdrop[0]}
                  alt={movie.title}
                />
                <div className="childInfo">
                  <p>Coming In {movie.released}</p>
                  <h2>{movie.title}</h2>
                  <button onClick={() => navigate(`/movies/${movie._id}`)} 
                  className="wTrailer rounded">Watch Trailer</button>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Upcoming;
