import React, { useState, useEffect } from "react";
import Icons from "../../components/icons/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./dashboard.css";
import SideBar from "../../components/sidebar/sideBar";
import Loading from "../../components/loading/loading";
import DeleteConfirmationModal from "../../components/modals/deleteModal";
import UpdateMovieModal from "../../components/modals/updateModal";
import SaveMovieModal from "../../components/modals/saveModal";

export default function Movies() {
  const [imdbId, setImdbId] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state variable
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateMovieData, setUpdateMovieData] = useState({
    title: "",
    runtime: "",
    trailerVideoId: "",
  });
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [isAddingMovie, setIsAddingMovie] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movieToDeleteId, setMovieToDeleteId] = useState(null);
  const [customMovieData, setCustomMovieData] = useState({
    title: "",
    year: "",
    rated: "",
    released: "",
    runtime: "",
    genre: "",
    director: "",
    writer: "",
    actors: "",
    plot: "",
    language: "",
    poster: "",
    imdbId: "",
    trailerVideoId: "",
    backdrop: "",
    // Add other relevant fields here
  });
  // Function to update custom movie input fields
  const handleCustomMovieDataChange = (field, value) => {
    setCustomMovieData({ ...customMovieData, [field]: value });
  };

  // State variable to control custom movie modal visibility
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Function to open and close the custom movie modal
  const openCustomModal = () => {
    setIsCustomModalOpen(true);
  };

  const closeCustomModal = () => {
    setIsCustomModalOpen(false);
    setCustomMovieData({
      title: "",
      genre: "",
      runtime: "",
      // Reset other input fields here
    });
  };

  const openDeleteModal = (movieId) => {
    setMovieToDeleteId(movieId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMovieToDeleteId(null);
  };

  const openUpdateModal = (movie) => {
    setSelectedMovieId(movie._id);
    setUpdateMovieData({
      title: movie.title,
      year: movie.year,
      rated: movie.rated,
      released: movie.released,
      runtime: movie.runtime,
      genre: movie.genre,
      director: movie.director,
      writer: movie.writer,
      actors: movie.actors,
      plot: movie.plot,
      language: movie.language,
      poster: movie.poster,
      imdbId: movie.imdbId,
      trailerVideoId: movie.trailerVideoId,
      backdrop: movie.backdrop,
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedMovieId("");
    setUpdateMovieData({
      title: "",
      runtime: "",
      trailerVideoId: "",
    });
  };

  const handleUpdateMovie = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/movies/update/${selectedMovieId}`,
        updateMovieData,
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Movie updated successfully");
        toast.success("Movie Updated Successfully!", {
          theme: "colored",
        });
        setMoviesData((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === selectedMovieId
              ? { ...movie, ...updateMovieData }
              : movie
          )
        );
        closeUpdateModal();
      } else {
        console.error("Failed to update movie");
        toast.error("Failed to update movie!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddMovie = async () => {
    try {
      setIsAddingMovie(true); // Set the flag to show loading toast
      const response = await axios.post(
        "http://localhost:5000/movies/save",
        { imdbId },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Movie added successfully");
        toast.success("Movie added successfully!", {
          theme: "colored",
        });
        // Update moviesData state by appending the new movie
        if (response.data && response.data.movie) {
          setMoviesData((prevMovies) => [...prevMovies, response.data.movie]);
        }

        setImdbId("");
      } else {
        console.error("Failed to add movie");
        toast.error("Failed to add movie!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message, {
        theme: "colored",
      });
    } finally {
      setIsAddingMovie(false); // Reset the loading flag
    }
  };

  const handleAddCustomMovie = async () => {
    try {
      setIsAddingMovie(true); // Set the flag to show loading toast
      const response = await axios.post(
        "http://localhost:5000/movies/customsave",
        {
          title: customMovieData.title,
          year: customMovieData.year,
          rated: customMovieData.rated,
          released: customMovieData.released,
          runtime: customMovieData.runtime,
          genre: customMovieData.genre,
          director: customMovieData.director,
          writer: customMovieData.writer,
          actors: customMovieData.actors,
          plot: customMovieData.plot,
          language: customMovieData.language,
          poster: customMovieData.poster,
          imdbId: customMovieData.imdbId,
          trailerVideoId: customMovieData.trailerVideoId,
          backdrop: customMovieData.backdrop,
          isComingSoon: customMovieData.isComingSoon,
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Custom movie added successfully");
        toast.success("Custom movie added successfully!", {
          theme: "colored",
        });

        // Update moviesData state by appending the new movie
        if (response.data && response.data.movie) {
          setMoviesData((prevMovies) => [...prevMovies, response.data.movie]);
        }

        // Clear other input fields if applicable
      } else {
        console.error("Failed to add custom movie");
        toast.error("Failed to add custom movie!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message, {
        theme: "colored",
      });
    } finally {
      setIsAddingMovie(false); // Reset the loading flag
    }
  };

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movies/all");
        if (response.status === 200) {
          setMoviesData(response.data);
          setIsLoading(false); // Data fetching is complete
        }
      } catch (error) {
        console.error("Error fetching movies data:", error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/movies/delete/${movieId}`,
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Movie deleted successfully");
        toast.success("Movie deleted successfully!", {
          theme: "colored",
        });
        setMoviesData(moviesData.filter((movie) => movie._id !== movieId));
        closeDeleteModal();
      } else {
        console.error("Failed to delete movie");
        toast.error("Failed to delete movie!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();

    const filtered = moviesData.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query)
    );

    setFilteredMovies(filtered);
    setSearchQuery(query);
  };
  return (
    <>
      {isAddingMovie && <Loading />}
      <ToastContainer />
      <div className="dash-body">
        <div>
          <SideBar />
        </div>

        <div className="content">
          <div className="title-info">
            <p>Add Movie</p>
            <i>
              <Icons.Film />
            </i>
          </div>

          <div className="data-info">
            <div className="">
              <input
                type="text"
                id="imdbId"
                className="input-field bg-wblack px-8 py-4 xl:w-96 rounded-lg mr-2"
                placeholder="Enter IMBD Id"
                required
                value={imdbId}
                onChange={(e) => setImdbId(e.target.value)}
              />
              <button
                className="bg-pink2 text-white font-bold py-2 px-4 rounded-lg my-3"
                onClick={handleAddMovie}
              >
                Add
              </button>
              <button
                className="bg-pink2 text-white font-bold py-2 px-4 rounded-lg my-3 mx-3"
                onClick={openCustomModal} // Open the custom modal
              >
                Add Custom
              </button>
            </div>
          </div>

          <div className="data-movie">
            <div className="title-info">
              <p>All Movies</p>
              <i>
                <Icons.Film />
              </i>
            </div>
            <div className="">
              <div className="">
                <input
                  type="text"
                  id="searchQuery"
                  className="input-field bg-wblack px-8 py-4 xl:w-96 rounded-lg"
                  placeholder="Search movies by title or director"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {filteredMovies.length === 0 && searchQuery !== "" && (
                  <div className="bg-red-500 text-white text-sm font-bold px-5 py-5 m-3 rounded-lg">
                    Movies/Director Not Found!
                  </div>
                )}
              </div>
            </div>

            <table className="dash-table" id="movies-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Run Time</th>
                  <th>imdbId</th>
                  <th>Coming Soon</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {(searchQuery !== "" ? filteredMovies : moviesData).map(
                  (movie, index) => (
                    <tr key={movie._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={movie.poster[0]}
                          alt={movie.title}
                          style={{ width: "80px" }}
                          className="m-auto border border-pink2 my-1 rounded"
                        />
                      </td>
                      <td>{movie.title}</td>
                      <td>{movie.runtime}</td>
                      <td>{movie.imdbId}</td>
                      <td>{movie.isComingSoon ? "Yes" : "No"}</td>
                      <td>
                        <div className="flex justify-center">
                          <button
                            className="bg-green-600 hover:bg-pink text-white font-bold p-2 rounded-lg m-1"
                            onClick={() => openUpdateModal(movie)}
                          >
                            <Icons.EditAlt size={25} />
                          </button>
                          <button
                            className="bg-red-600 hover:bg-pink text-white font-bold p-2 rounded-lg m-1"
                            onClick={() => openDeleteModal(movie._id)}
                          >
                            <Icons.OutlineDelete size={25} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onCancel={closeDeleteModal}
              onConfirm={() => handleDeleteMovie(movieToDeleteId)}
            />
            <UpdateMovieModal
              isOpen={isUpdateModalOpen}
              onClose={closeUpdateModal}
              updateMovieData={updateMovieData}
              onUpdateMovie={handleUpdateMovie}
              onUpdateMovieDataChange={(field, value) =>
                setUpdateMovieData({ ...updateMovieData, [field]: value })
              }
            />
            <SaveMovieModal
              isOpen={isCustomModalOpen}
              onClose={closeCustomModal}
              onSaveCustomMovie={handleAddCustomMovie}
              customMovieData={customMovieData}
              handleCustomMovieDataChange={handleCustomMovieDataChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
