import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/movies/all")
    .then((response) => setMovies(response.data))
    .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCloseModal = () => {
    setSearchQuery("");
    onClose();
  };

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      || movie.director.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 3);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className="w-full text-center sm:text-left"
                id="modal-headline"
              >
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Search By Title/Director 
                </h3>
                <div className="mt-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-pink rounded-md w-full p-2"
                  />
                </div>
                {/* Display the search results */}
                {filteredMovies.length > 0 ? (
                  <ul className="mt-2">
                    {filteredMovies.map((movie) => (
                      <li
                      key={movie.id}
                      className="flex py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/movies/${movie._id}`);
                        handleCloseModal(); // Close the modal when a movie title is clicked
                      }}
                    >
                      <div><img src={movie.poster[0]} width="50px" alt={movie.title}></img></div>
                      <div className="px-3">
                        <h3 className="text-pink">{movie.title}</h3>
                        <p className="font-thin text-sm">by {movie.director}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-center">No Movies/Director Found!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
