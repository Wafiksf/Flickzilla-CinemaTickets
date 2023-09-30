import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies/all")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMovies = movies
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 3);
  return (
    <div className="w-full text-center sm:text-left" id="modal-headline">
      <div className="relative text-gray-600">
        <input
          type="text"
          name="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          className="w-full border rounded-md pl-10 pr-4 py-2 focus:outline-none border-pink focus:border-pink bg-white/10 text-pink"
        />
        <div className="absolute top-0 left-0 mt-3 ml-3">
          <AiOutlineSearch size={18} className="text-pink"/>
        </div>
      </div>
      {/* Display the search results */}
      {filteredMovies.length > 0 ? (
        <ul className="mt-4">
          {filteredMovies.map((movie) => (
            <li
              key={movie._id}
              className="flex my-2 py-3 px-4 bg-white/10 hover:bg-gray-100/20 cursor-pointer rounded"
              onClick={() => {
                navigate(`/movies/${movie._id}`);
              }}
            >
              <div>
                <img src={movie.poster[0]} width="50px" alt={movie.title}></img>
              </div>
              <div className="px-3">
                <h3 className="text-pink text-left">{movie.title}</h3>
                <p className="font-thin text-sm text-white text-left">by {movie.director}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-center text-pink">No Movies/Director Found!</p>
      )}
    </div>
  );
}
