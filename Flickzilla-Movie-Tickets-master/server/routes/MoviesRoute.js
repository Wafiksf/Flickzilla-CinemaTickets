const {Router} = require('express');
const verify = require('../verifyToken');
const {getMovie, saveMovie, customSave, updateMovie, deleteMovie, GetRandomMovie, getOneMovie, getUpcomingMovies, getAllMovies, getMoviesBySpecificGenre} = require("../controllers/MoviesController");

const router = Router();

router.get('/movies', getMovie);
router.post('/movies/save', verify, saveMovie);
router.post('/movies/customsave', verify, customSave);
router.put('/movies/update/:id', verify, updateMovie);
router.delete('/movies/delete/:id', verify, deleteMovie);
router.get('/movies/random/', GetRandomMovie);
router.get('/movies/find/:id', getOneMovie);
router.get('/movies/upcoming', getUpcomingMovies);
router.get('/movies/all', getAllMovies);
router.get('/movies/bygenre', getMoviesBySpecificGenre);

module.exports = router;