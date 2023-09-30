const express = require("express");
const router = express.Router();
const cinemaRoomController = require("../controllers/CinemaRoomController");

router.post("/", cinemaRoomController.addRoom);

router.get("/", cinemaRoomController.getAllRooms);

router.get("/:id", cinemaRoomController.getRoomById);

router.patch("/:id", cinemaRoomController.updateRoomById);

router.delete("/:id", cinemaRoomController.deleteRoomById);

router.post("/:id/seating", cinemaRoomController.addSeating);

router.put("/:id/seating", cinemaRoomController.updateSeating);

router.post("/:id/availabletimes", cinemaRoomController.addAvailableTime);

router.get("/:id/availabletimes", cinemaRoomController.getAvailableTimes);

router.put("/:id/availabletimes/:timeId", cinemaRoomController.updateAvailableTime);

router.post("/:id/movie", cinemaRoomController.addMovieId);

router.patch("/:id/movie", cinemaRoomController.updateMovieId);

router.get("/:id/movie", cinemaRoomController.getMovieId);

router.delete("/:id/movie", cinemaRoomController.deleteMovieId);

router.get("/:id/seats", cinemaRoomController.getNumberOfSeatsByRoomId );

router.post("/:id/markseat", cinemaRoomController.markSeatsAsTakenByIndices);


module.exports = router;
