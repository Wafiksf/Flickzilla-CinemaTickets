import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./dashboard.css";
import { toast, ToastContainer } from "react-toastify";
import SideBar from "../../components/sidebar/sideBar";
import "./movies";
import "react-toastify/dist/ReactToastify.css";
import CinemaSeats from "../../components/cinemaseats/CinemaSeats";
import "react-datetime/css/react-datetime.css";

const CinemaRoomModal = ({ room, onClose }) => {
  const [cinemaRoomData, setCinemaRoomData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [imdbIdsArray, setImdbIdsArray] = useState([]);
  const [RoomName, setRoomName] = useState("");
  const [RoomSeats, setRoomSeats] = useState(0);
  const [RoomMovieimdb, setRoomMovieimdb] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([{ startTime: "", endTime: "" }]);
  const formRef = useRef(null);
const [SelectedSeats,setSelectedSeats]=useState("")
const [clearSelectedSeats,setclearSelectedSeats]=useState("")

  const HandleAddRoom = async (event) => {
    event.preventDefault();




    if (
      RoomName === "" ||
      RoomSeats === "" ||
      RoomMovieimdb === "" ||
      timeSlots.some((slot) => slot.startTime === "" || slot.endTime === "")
    ) {
      toast.error("Please fill out all the inputs");
    } else {
      const numSeats = parseInt(RoomSeats);

      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);

      if (endDateTime <= startDateTime) {
        toast.error("End time should be greater than start time");
        return;
      }

      try {
        for (const [index, slot] of timeSlots.entries()) {
          if (!slot.startTime || !slot.endTime) continue;

          const newRoomData = {
            roomName: `${RoomName}(${index + 1})`, // Unique room name for each slot
            movieImdbId: RoomMovieimdb,
          };
 let isValidTimeSlots = true;
  for (let i = 1; i < timeSlots.length; i++) {
    const prevEndTime = new Date(timeSlots[i - 1].endTime);
    const currentStartTime = new Date(timeSlots[i].startTime);

    if (currentStartTime <= prevEndTime) {
      isValidTimeSlots = false;
      break;
    }
  }

  if (!isValidTimeSlots) {
    toast.error("The Start Time of each slot must be greater than the End Time of the previous one");
    return;
  }
          const response = await axios.post(
            "http://localhost:5000/api/cinemarooms",
            newRoomData
          );

          const roomId = response.data._id;

          const defaultSeating = [];
          for (let row = 1; row <= numSeats; row++) {
            for (let seatNumber = 1; seatNumber <= 12; seatNumber++) {
              const isVIP = seatNumber <= 2; 
              defaultSeating.push({
                row: row,
                seatNumber: seatNumber,
                isVIP: isVIP,
                isTaken: false,
              });
            }
          }
          

          await axios.post(
            `http://localhost:5000/api/cinemarooms/${roomId}/seating`,
            { seating: defaultSeating }
          );
          await axios.post(
            `http://localhost:5000/api/cinemarooms/${roomId}/movie`,
            { movieImdbId: RoomMovieimdb }
          );

          const slotData = {
            startTime: slot.startTime,
            endTime: slot.endTime,
          };

          try {
            await axios.post(
              `http://localhost:5000/api/cinemarooms/${roomId}/availabletimes`,
              slotData
            );
            console.log("POST request successful");
          } catch (error) {
            console.error("POST request failed:", error);
          }

          await fetchCinemaRoomData();

          toast.success(
            `Room ${newRoomData.roomName} added successfully with seating data, movie, and available times`
          );
        }

        setRoomName("");
        setRoomSeats(0);
        setRoomMovieimdb("");
        setstartTime("");
        setendTime("");
        setTimeSlots([{ startTime: "", endTime: "" }]);
        formRef.current.reset();
      } catch (error) {
        toast.error(
          "An error occurred while adding the room, seating data, movie, and available times"
        );
        console.error(error);
      }
    }
  };

  const addTimeSlot = () => {
    const lastIndex = timeSlots.length - 1;
  
    if (
      lastIndex >= 0 &&
      (timeSlots[lastIndex].startTime === "" ||
        timeSlots[lastIndex].endTime === "" ||
        new Date(timeSlots[lastIndex].endTime) <=
          new Date(timeSlots[lastIndex].startTime))
    ) {
      toast.error("End time should be greater than start time");
      return;
    }
  
    setTimeSlots([...timeSlots, { startTime: "", endTime: "" }]);
  };

  const removeTimeSlot = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const fetchCinemaRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cinemarooms");

      setCinemaRoomData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCinemaRoomData();
  }, []);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movies/all");
        if (response.status === 200) {
          setMoviesData(response.data);
          console.log(response.data);
          const idsArray = response.data.map((movie) => movie.imdbId);
          setImdbIdsArray(idsArray);
        }
      } catch (error) {
        console.error("Error fetching movies data:", error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleTimeChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };
  function format12HourTime(time) {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes.toString().padStart(2, "0")}`;
  }

  function extractTime(time) {
    const formattedTime = format12HourTime(time);
    const hours = new Date(time).getHours();
    const period = hours >= 12 ? "PM" : "AM";
    return `${formattedTime} ${period}`;
  }
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }
  return (
    <>
      <div className="dash-body">
        <ToastContainer position="top-right" />
        <div>
          <SideBar />
        </div>

        <div className="content">
          <div className="title-info">
            <p>Add a Room</p>
          </div>

          <div className="roomadding-container">
            <form
              ref={formRef}
              action=""
              method="POST"
              onSubmit={HandleAddRoom}
            >
              <div className="grid grid-cols-3 gap-1">
                <div>
                  <label className="Room-add-span">Room name:</label>
                  <input
                    type="text"
                    className="input-field bg-wblack px-8 py-2 l:w-22 rounded-lg m-2"
                    onChange={(e) => {
                      setRoomName(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className="Room-add-span">Number of Seat Rows:</label>
                  <input
                    type="text"
                    className="input-field bg-wblack px-8 py-2 l:w-22 rounded-lg m-2"
                    onChange={(e) => {
                      setRoomSeats(e.target.value);
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  <label className="Room-add-span">Movie ID:</label>
                  <input
                    type="text"
                    className="input-field bg-wblack px-6 py-2 l:w-18 rounded-lg m-2"
                    onChange={(e) => {
                      setRoomMovieimdb(e.target.value);
                    }}
                  />
                </div>
              </div>
              <hr className="my-5"></hr>

              <div className="times-adding">
                <label className="Room-add-span">Add time slots:</label>
                {timeSlots.map((slot, index) => (
                  <div key={index} className="time-slot">
                    <input
                      type="datetime-local"
                      className="input-field bg-wblack px-8 py-2 l:w-22 rounded-lg m-2"
                      value={slot.startTime}
                      onChange={(e) =>
                        handleTimeChange(index, "startTime", e.target.value)
                      }
                    />
                    <input
                      type="datetime-local"
                      className="input-field bg-wblack px-8 py-2 l:w-22 rounded-lg m-2"
                      value={slot.endTime}
                      onChange={(e) =>
                        handleTimeChange(index, "endTime", e.target.value)
                      }
                    />
                    {index > 0 && (
                      <button
                        className="bg-pink2 text-white font-bold py-2 px-4 rounded-lg ml-3"
                        onClick={() => removeTimeSlot(index)}
                      >
                        Remove
                      </button>
                    )}
                    <button
                      type="button"
                      className="bg-pink2 text-white font-bold py-2 px-4 rounded-lg ml-3 m-2"
                      onClick={addTimeSlot}
                    >
                      Add Time Slot
                    </button>
                  </div>
                ))}
                <button
                  className="bg-pink2 text-white font-bold py-2 px-4 rounded-lg ml-3"
                  type="submit"
                >
                  Add Room
                </button>
              </div>
              <hr className="my-5"></hr>
            </form>
          </div>

          <div className="data-movie">
            <div className="">
              <div className="flex justify-end my-5">
                <input
                  type="text"
                  id="searchQuery"
                  className="input-field bg-wblack px-8 py-4 xl:w-96 rounded-lg"
                  placeholder="Search movies by title or director"
                  onChange={(e) => {}}
                />
              </div>
            </div>
          </div>

          {cinemaRoomData.map((room) => {
            const hasMatchingImdbId = imdbIdsArray.includes(room.movieImdbId);

            return (
              <div
                key={room._id}
                className="room-card bg-wblack px-3 py-2 l:w-25 rounded-lg m-2"
              >
                {hasMatchingImdbId && (
                  <>
                    {moviesData.map((movie) => {
                      if (movie.imdbId === room.movieImdbId) {
                        return (
                          <div key={movie._id}>
                            <div className="title-info">
                              <p>{room.roomName}</p>
                              <i>{/* Static Icon */}</i>
                            </div>
                            <div className="upper-cinemaroom flex justify-center items-center">
                              <img
                                src={movie.poster[0]}
                                alt={movie.title}
                                style={{ width: "25%", height: "25%" }}
                                className="opacity-75 my-5"
                              />
                              <CinemaSeats
                                seats={room.seating}
                                roomId={room._id}
                                onSeatSelect={setSelectedSeats}  clearSelectedSeats={clearSelectedSeats}
                              />
                            </div>
                            <hr></hr>
                            <div className="flex justify-center items-center gap-10 my-5">
                              <p>
                                <span className="font-bold text-pink2">
                                  Movie IMDb ID:
                                </span>{" "}
                                {room.movieImdbId}
                              </p>
                              <p>
                                <span className="font-bold text-pink2">
                                  Number of Seats:
                                </span>{" "}
                                {room.seating.length}
                              </p>
                              <p>
                                <span className="font-bold text-pink2">
                                  Date:
                                </span>{" "}
                                {formatDate(room.availableTimes[0].startTime)}
                              </p>
                              <p>
                                <span className="font-bold text-pink2">
                                  Start Time:
                                </span>{" "}
                                {extractTime(room.availableTimes[0].startTime)}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CinemaRoomModal;