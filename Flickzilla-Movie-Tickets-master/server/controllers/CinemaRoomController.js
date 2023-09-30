const CinemaRoom = require("../models/CinemaRoomsModel");

exports.addRoom = async (req, res) => {
  try {
    const room = new CinemaRoom({
      roomName: req.body.roomName,
    });

    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await CinemaRoom.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRoomById = async (req, res) => {
  try {
    const room = await CinemaRoom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRoomById = async (req, res) => {
  try {
    const room = await CinemaRoom.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }
    res.status(200).json({ message: "Cinema room deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addSeating = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    const newSeating = req.body.seating;

    room.seating = newSeating;

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSeating = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    const updatedSeating = req.body.seating;

    room.seating = updatedSeating;

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};








exports.addAvailableTime = async (req, res) => {
  try {
    console.log("Received request:", req.params);
    console.log("Request body:", req.body);
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    const newTime = {
      startTime: req.body.startTime,
      endTime: req.body.endTime
    };

    room.availableTimes.push(newTime);

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAvailableTime = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    const availableTimeIndex = room.availableTimes.findIndex(
      (time) => time._id.toString() === req.params.timeId
    );

    if (availableTimeIndex === -1) {
      return res.status(404).json({ message: "Available time not found" });
    }

    room.availableTimes.splice(availableTimeIndex, 1);

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.getAvailableTimes = async (req, res) => {
    try {
      const room = await CinemaRoom.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: "Cinema room not found" });
      }
  
      const availableTimes = room.availableTimes;
      res.status(200).json(availableTimes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.updateAvailableTime = async (req, res) => {
    try {
      const room = await CinemaRoom.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: "Cinema room not found" });
      }
  
      const availableTimeIndex = room.availableTimes.findIndex(
        (time) => time._id.toString() === req.params.timeId
      );
  
      if (availableTimeIndex === -1) {
        return res.status(404).json({ message: "Available time not found" });
      }
  
      const updatedTime = {
        startTime: req.body.startTime,
        endTime: req.body.endTime
      };
  
      room.availableTimes[availableTimeIndex] = updatedTime;
  
      const updatedRoom = await room.save();
      res.status(200).json(updatedRoom);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  



  exports.addMovieId = async (req, res) => {
    try {
      const room = await CinemaRoom.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: "Cinema room not found" });
      }
  
      room.movieImdbId = req.body.movieImdbId; 
  
      const updatedRoom = await room.save();
      res.status(200).json(updatedRoom);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  

exports.updateMovieId = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    room.movieImdbId = req.body.movieImdbId; 

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getMovieId = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    const movieImdbId = room.movieImdbId;
    res.status(200).json({ movieImdbId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteMovieId = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    room.movieImdbId = undefined; 

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};








exports.getNumberOfSeatsByRoomId = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    const seatsInfo = room.seating.map((seat, index) => ({
      seatNumber: index + 1,
      seatId: seat._id,
    }));

    res.status(200).json({ numberOfSeats: room.seating.length, seatsInfo });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




exports.addSeating = async (req, res) => {
  try {
    const room = await CinemaRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Cinema room not found" });
    }

    const newSeating = req.body.seating.map((seat, index) => ({
      ...seat,
      seatNumber: index + 1,
    }));

    room.seating = newSeating;

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getSeatByIndex = async (req, res) => {
  try {
    const roomId = req.params.roomId; // Assuming you're also passing the roomId
    const seatIndex = req.params.seatIndex;

    const cinemaRoom = await CinemaRoom.findById(roomId);
    if (!cinemaRoom) {
      return res.status(404).json({ message: 'Cinema room not found' });
    }

    const seat = cinemaRoom.seating[seatIndex];
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    res.status(200).json(seat);
  } catch (error) {
    console.error('Error fetching seat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const markSeatsAsTaken = async (roomId, seatIndices) => {
  try {
    const room = await CinemaRoom.findById(roomId);
    
    if (!room) {
      throw new Error('Room not found');
    }

    for (const seatIndex of seatIndices) {
      const seat = room.seating.find(s => s.seatNumber === seatIndex);
      if (seat) {
        seat.isTaken = true;
      }
    }

    await room.save();
    
    return { success: true, message: 'Seats marked as taken successfully' };
  } catch (error) {
    return { success: false, message: 'Error marking seats as taken', error: error.message };
  }
};

exports.markSeatsAsTakenByIndices = async (req, res) => {
  try {
    const roomId = req.params.id;
    const seatIndices = req.body.seatIndices;

    const result = await markSeatsAsTaken(roomId, seatIndices);
    if (result.success) {
      res.status(200).json({ message: 'Seats marked as taken successfully' });
    } else {
      res.status(400).json({ message: 'Error marking seats as taken', error: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};