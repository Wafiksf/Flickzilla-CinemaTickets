const BookedTicket = require('../models/BookedTicketsModel');
const Movie = require('../models/MoviesModel'); // Import the Movie model if you haven't
const { User } = require('../models/UsersModel');
const sendEmail = require("../utils/sendEmail");
const { vipEmail } = require("./Templates/vipEmail");


exports.createBookedTicket = async (req, res) => {
  try {
    const { movieId, movieName, userName, userId, seatIndices, roomName, startTime, endTime } = req.body;

    const savedTickets = [];

    for (const seatIndex of seatIndices) {
      const bookedTicket = new BookedTicket({
        startTime,
        endTime,
        movieId,
        roomName,
        movieName,
        userName,
        userId,
        seatIndices: [seatIndex], // Create a booked ticket for each individual seat index
      });

      const savedTicket = await bookedTicket.save();
      savedTickets.push(savedTicket);
    }

    res.status(201).json(savedTickets);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booked tickets', error: error.message });
  }
};



exports.deleteBookedTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;

    const deletedTicket = await BookedTicket.findByIdAndDelete(ticketId);
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Booked ticket not found' });
    }

    res.status(200).json({ message: 'Booked ticket deleted', deletedTicket });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booked ticket', error: error.message });
  }
};

exports.GetBookedTicketsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookedTickets = await BookedTicket.find({ userId });
    res.status(200).json(bookedTickets);
  } catch (error) {
    res.status(500).json({ message: 'Error getting booked tickets by userId', error: error.message });
  }
};

exports.getAllBookedTickets = async (req, res) => {
  try {
    const allBookedTickets = await BookedTicket.find();
    res.status(200).json(allBookedTickets);
  } catch (error) {
    res.status(500).json({ message: 'Error getting all booked tickets', error: error.message });
  }
};
exports.getMostBookedMovie = async (req, res) => {
  try {
    const bookedMovies = await BookedTicket.aggregate([
      {
        $group: {
          _id: '$movieId',
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { totalBookings: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    if (bookedMovies.length === 0) {
      return res.status(404).json({ message: 'No movies have been booked yet.' });
    }

    const mostBookedMovieId = bookedMovies[0]._id;

    const mostBookedMovie = await Movie.findById(mostBookedMovieId);

    if (!mostBookedMovie) {
      return res.status(404).json({ message: 'Most booked movie not found.' });
    }

    const result = {
      movieId: mostBookedMovie.id,
      title: mostBookedMovie.title,
      language: mostBookedMovie.language,
      plot: mostBookedMovie.plot,
      poster: mostBookedMovie.poster,
      totalBookings: bookedMovies[0].totalBookings,
    };

    res.status(200).json([result]);
  } catch (error) {
    res.status(500).json({ message: 'Error getting most booked movie', error: error.message });
  }
};

exports.checkUserTicketCount = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId); // Fetch user details from UserModel
    
    const bookedTicketCount = await BookedTicket.countDocuments({ userId });

    if (bookedTicketCount % 5 === 0 && bookedTicketCount !== 0) {
      const url = `http://localhost:3000/AllMovies`;
      const subject = "Congratulations! You Just Got a VIP Ticket!";
      const htmlContent = vipEmail(url);
      
      await sendEmail(user.email, subject, htmlContent);

      return res.status(200).json({ message: 'User has booked a multiple of 5 tickets: done' });
    } else {
      return res.status(200).json({ message: 'User has not yet booked a multiple of 5 tickets.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking user ticket count', error: error.message });
  }
};

