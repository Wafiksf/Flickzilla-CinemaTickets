import React from "react";

const SaveModal = ({
  isOpen,
  onClose,
  onSaveCustomMovie,
  customMovieData,
  handleCustomMovieDataChange,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleAddCustomMovie = () => {
    onSaveCustomMovie();
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Add Movie
              </h3>
              <div className="mt-2">
                <span className="flex mt-3 text-gray-900">Title</span>
                <input
                  type="text"
                  required
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Title"
                  value={customMovieData.title}
                  onChange={(e) =>
                    handleCustomMovieDataChange("title", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Year</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Year"
                  value={customMovieData.year}
                  onChange={(e) =>
                    handleCustomMovieDataChange("year", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Rated</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Rated"
                  value={customMovieData.rated}
                  onChange={(e) =>
                    handleCustomMovieDataChange("rated", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Released</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Released"
                  value={customMovieData.released}
                  onChange={(e) =>
                    handleCustomMovieDataChange("released", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Runtime</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Runtime"
                  value={customMovieData.runtime}
                  onChange={(e) =>
                    handleCustomMovieDataChange("runtime", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Genre</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Genre"
                  value={customMovieData.genre}
                  onChange={(e) =>
                    handleCustomMovieDataChange("genre", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Director</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Director"
                  value={customMovieData.director}
                  onChange={(e) =>
                    handleCustomMovieDataChange("director", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Writer</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Writer"
                  value={customMovieData.writer}
                  onChange={(e) =>
                    handleCustomMovieDataChange("writer", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Actors</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Actors"
                  value={customMovieData.actors}
                  onChange={(e) =>
                    handleCustomMovieDataChange("actors", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Plot</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Plot"
                  value={customMovieData.plot}
                  onChange={(e) =>
                    handleCustomMovieDataChange("plot", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Language</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Language"
                  value={customMovieData.language}
                  onChange={(e) =>
                    handleCustomMovieDataChange("language", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">Poster</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Poster"
                  value={customMovieData.poster}
                  onChange={(e) =>
                    handleCustomMovieDataChange("poster", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">ImdbId</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="ImdbId"
                  value={customMovieData.imdbId}
                  onChange={(e) =>
                    handleCustomMovieDataChange("imdbId", e.target.value)
                  }
                />
                <span className="flex mt-3 text-gray-900">TrailerVideoId</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="TrailerVideoId"
                  value={customMovieData.trailerVideoId}
                  onChange={(e) =>
                    handleCustomMovieDataChange(
                      "trailerVideoId",
                      e.target.value
                    )
                  }
                />
                <span className="flex mt-3 text-gray-900">Backdrop</span>
                <input
                  type="text"
                  className="text-gray-900 px-2 py-3 shadow-sm w-full sm:text-sm border-2 border-pink2 rounded-md"
                  placeholder="Backdrop"
                  value={customMovieData.backdrop}
                  onChange={(e) =>
                    handleCustomMovieDataChange("backdrop", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={() => {
                handleAddCustomMovie();
                onClose();
              }}
              type="button"
              className="inline-flex justify-center w-full rounded-md border bg-pink2 shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:text-sm"
            >
              Add
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
