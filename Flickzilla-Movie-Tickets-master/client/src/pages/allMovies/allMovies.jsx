import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/loading";
import { fetchMovies } from "../../utils/HandleApi";
import Footer from "../../components/footer/Footer";
import "./allMovies.css";

const AllMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("all");

  useEffect(() => {
    fetchMovies()
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movie data:", error));
  }, []);

  const categories = ["all", "Action", "Adventure", "Comedy", "Crime", "Drama", "Horror", "Sci-Fi", "Thriller", "History", "Biography"];
  const languages = ["all", "Arabic", "English", "French", "Spanish", "Korean","Russian", "German"];

  // Filter movies based on the selected category, language, and year
  const filteredMovies = movies.filter(
    (movie) =>
      (activeCategory === "all" || movie.genre.includes(activeCategory)) &&
      (activeLanguage === "all" || movie.language === activeLanguage)
  );

  if (movies.length === 0) {
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

  return (
    <>
        <div className="robot-about">
          <img src="https://image.tmdb.org/t/p/original/yEWkS8G6s6SzuHXkNso88luR2mF.jpg"  alt="All Movies" />
          <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">All Movies</h1>
        </div>
        <div className="rubon mt-3">
          <img
            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
            alt="rubon"
          ></img>
        </div>
        <section className="firstSec">
        <div className="filterSelects flex justify-center my-4">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="rounded-md mx-2 mt-10 px-4 py-2 border border-pink2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All Movies" : category}
            </option>
          ))}
        </select>
        <select
          value={activeLanguage}
          onChange={(e) => setActiveLanguage(e.target.value)}
          className="rounded-md mx-2 mt-10 px-4 py-2 border border-pink2"
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language === "all" ? "All Languages" : language}
            </option>
          ))}
        </select>
      </div>
        <div className="movies">
      {filteredMovies.length === 0 ? (
        <div className="m-auto mt-10 font-bold text-2xl">
        <p>No Movies Found!</p>
        </div>
      ) : (
          filteredMovies.map((movie) => (
            <div className="movie" key={movie._id}>
              <img src={movie.poster[0]} alt={movie.title} />
              <div className="movieInfo">
                <h1 className="font-bold">{movie.title}</h1>
                <h5 className="font-light">{movie.language}</h5>
                <p>{movie.plot}</p>
                <div>
                  <button onClick={() => navigate(`/movies/${movie._id}`)} className="moreInfoBtn rounded">More Info</button>
                  <button
                    className="bookBtn rounded hover:bg-pink hide"
                    onClick={() => handleBookClick(movie._id)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
            ))
            )}
        </div>
      </section>
        <footer>
          <Footer />
        </footer>
      </>
      );
};

      export default AllMovies;
