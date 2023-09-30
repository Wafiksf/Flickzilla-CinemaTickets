const MovieModel = require("../models/MoviesModel");
const CastModel = require("../models/CastsModel");
const { User } = require("../models/UsersModel");
const axios = require("axios");
const sendEmail = require("../utils/sendEmail");
const { generateEmailContent } = require("./Templates/emailTemplate");
const { emailComings } = require("./Templates/emailComings");

//Get all
module.exports.getMovie = async (req, res) => {
  try {
    const movies = await MovieModel.find({ isComingSoon: false }).populate(
      "cast"
    );

    for (const movie of movies) {
      await updateIsComingSoon(movie);
    }

    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a movie
module.exports.saveMovie = async (req, res) => {
  if (req.user.isAdmin) {
    const ApiKey = process.env.API_KEY;
    const GoogleApis = process.env.GOOGLE_APIS;
    const TmdbApi = process.env.TMDB_API;
    const { imdbId } = req.body;

    const existingMovie = await MovieModel.findOne({ imdbId });

    if (existingMovie) {
      return res.status(409).json({ message: "Movie already exists!" });
    }

    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${encodeURIComponent(
          imdbId
        )}&apikey=${ApiKey}`
      );

      const {
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        imdbRating,
        imdbID,
      } = response.data;

      const youtubeResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          Title
        )}%20trailer&type=video&key=${GoogleApis}`
      );

      const trailerVideoId = youtubeResponse.data.items[0].id.videoId;

      const tmdbResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${imdbId}/images?api_key=${TmdbApi}`
      );

      const posterPath = tmdbResponse.data.posters
        .map(
          (poster) => `https://image.tmdb.org/t/p/original${poster.file_path}`
        )
        .slice(0, 5);
      const backdropPath = tmdbResponse.data.backdrops
        .map(
          (backdrop) =>
            `https://image.tmdb.org/t/p/original${backdrop.file_path}`
        )
        .slice(0, 5);

      const creditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${imdbId}/credits?api_key=${TmdbApi}`
      );
      const { id, cast } = creditsResponse.data;

      const castMembers = cast
        .map(({ id, name, character, profile_path }) => ({
          id,
          name,
          character,
          profile_path,
        }))
        .slice(0, 10);

      const castId = id;

      const credits = await CastModel.create({
        id: castId,
        cast: castMembers,
      });

      const movieData = {
        title: Title,
        year: Year,
        genre: Genre,
        rated: Rated,
        released: Released,
        runtime: Runtime,
        director: Director,
        writer: Writer,
        actors: Actors,
        plot: Plot,
        language: Language,
        country: Country,
        awards: Awards,
        poster: posterPath,
        imdbRating: imdbRating,
        imdbId: imdbID,
        trailerVideoId: trailerVideoId,
        backdrop: backdropPath,
        cast: credits._id,
        isComingSoon: new Date(Released) > new Date(),
      };

      const movie = await MovieModel.create(movieData);

      const currentDate = new Date();
      const isComingSoon = new Date(Released) > currentDate;
      movie.isComingSoon = isComingSoon;

      const populatedMovie = await MovieModel.findById(movie._id).populate(
        "cast"
      );

      // Send email to all users
      const allUsers = await User.find(); // Replace with the actual way you retrieve users
      const movieLink = `http://localhost:3000/movies/${movie._id}`; // Replace with the actual movie link

      const emailPromises = allUsers.map(async (user) => {
        let subject;
        let htmlContent;

        if (isComingSoon) {
          subject = `New Upcoming Movie Alert: ${populatedMovie.title}`;
          htmlContent = emailComings(user, populatedMovie, movieLink);
        } else {
          subject = `New Movie Alert: ${populatedMovie.title}`;
          htmlContent = generateEmailContent(user, populatedMovie, movieLink);
        }

        await sendEmail(user.email, subject, htmlContent);
      });

      await Promise.all(emailPromises);

      console.log("Added Successfully...");
      console.log(populatedMovie, credits);
      res.status(200).send({ movie: populatedMovie });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to save movie.");
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

//Custom add
module.exports.customSave = async (req, res) => {
  if (req.user.isAdmin) {
    const { cast, ...movieData } = req.body; // Assuming you have cast data as an array in req.body

    try {
      const existingMovie = await MovieModel.findOne({
        imdbId: movieData.imdbId,
      });

      if (existingMovie) {
        return res.status(409).json({ message: "Movie already exists!" });
      }

      // Create cast members
      const castMembers = await CastModel.create({ cast });

      // Create a new movie entry
      const newMovie = await MovieModel.create({
        ...movieData,
        cast: castMembers._id,
      });

      res
        .status(200)
        .json({ message: "Movie added successfully", movie: newMovie });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to save movie.");
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

//Update
module.exports.updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateMovie = await MovieModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

//Delete
module.exports.deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movie = await MovieModel.findById(req.params.id);
      if (!movie) {
        return res.status(404).json("Movie not found");
      }

      // Get the cast ID from the movie data
      const castId = movie.cast;

      // Delete the associated cast
      if (castId) {
        await CastModel.findByIdAndDelete(castId);
      }

      // Delete the movie
      await MovieModel.findByIdAndDelete(req.params.id);

      res.status(200).json("Movie and associated cast have been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

//Get Random
module.exports.GetRandomMovie = async (req, res) => {
  try {
    const movie = await MovieModel.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(movie); // Assuming you want to return a single movie object
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get one
module.exports.getOneMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id).populate("cast");
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get upcoming movies
module.exports.getUpcomingMovies = async (req, res) => {
  try {
    const upcomingMovies = await MovieModel.find({ isComingSoon: true });

    // Update isComingSoon for each movie
    for (const movie of upcomingMovies) {
      await updateIsComingSoon(movie);
    }

    res.status(200).json(upcomingMovies);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all
module.exports.getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find().populate("cast");

    for (const movie of movies) {
      await updateIsComingSoon(movie);
    }

    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
};

// Middleware to update isComingSoon dynamically based on the release date
const updateIsComingSoon = async (movie) => {
  const currentDate = new Date();
  const releasedDate = new Date(movie.released);
  const isComingSoon = releasedDate > currentDate;

  if (movie.isComingSoon !== isComingSoon) {
    movie.isComingSoon = isComingSoon;
    await movie.save();
  }
};

// Get movies by a specific genre
module.exports.getMoviesBySpecificGenre = async (req, res) => {
  try {
    const { genre } = req.query;

    if (!genre) {
      return res.status(400).json("Genre parameter is missing.");
    }

    const movies = await MovieModel.find({
      genre: { $regex: new RegExp(genre, "i") },
    });

    for (const movie of movies) {
      await updateIsComingSoon(movie);
    }

    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
};
