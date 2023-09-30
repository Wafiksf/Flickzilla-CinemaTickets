const mongoose = require('mongoose');

const bookedTicketSchema = new mongoose.Schema({
  isVerified:{
    type: Boolean,
    required: true,
    default:false,
  },
  startTime:{
    type: String,
    required: true,
  },
  endTime:{
    type: String,
    required: true,
  },
    movieId:{
      type: String,
      required: true,
    },
    roomName:{
        type: String,
        ref:"CinemaRooms",
        required: true,
    },
  movieName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: 'user',
    required: true,
  },
  seatIndices: {
    type: [Number],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
},
});

const BookedTicket = mongoose.model('BookedTicket', bookedTicketSchema);

module.exports = BookedTicket;