const mongoose = require("mongoose");

const availableTimeSchema = mongoose.Schema({
  startTime: { type: String,unique:true },
  endTime: { type: String,unique:true }
});

const seatingSchema = mongoose.Schema({
  row: { type: Number, required: true },
  seatNumber: { type: Number, required: true },
  isVIP: { type: Boolean, required: true },
  isTaken: { type: Boolean, default: false } 
});

const cinemaRoomSchema = mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  availableTimes: [availableTimeSchema],
  seating: [seatingSchema],
  movieImdbId: { type: String},
  
});

module.exports = mongoose.model('CinemaRoom', cinemaRoomSchema);
