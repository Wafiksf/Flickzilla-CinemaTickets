import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/loading";
import { useNavigate } from "react-router-dom";
import "./ticketBooking.css";
import CinemaSeats from "../../components/cinemaseats/CinemaSeats";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { fetchUserInfoFromToken } from "../../components/fetchUser";
import PaymentPopup from '../../components/Popup/Popup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TicketBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [cinemaRoomData, setCinemaRoomData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBookingEnabled, setIsBookingEnabled] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [clearSelectedSeats, setClearSelectedSeats] = useState(false);
  const [cinemaSeatsKey, setCinemaSeatsKey] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const vipSeatsCount = selectedSeats.filter(seat => seat >= 1 && seat <= 24).length;
  const normalSeatsCount = selectedSeats.length - vipSeatsCount;
  const VIP_PRICE = 15;
  const NORMAL_PRICE = 10;

  const calculateTotalPrice = () => {
    let totalPrice = 0;
  console.log(selectedSeats)
    selectedSeats.forEach((seat) => {
      const seatIndex = seat;
      const seatPrice = seatIndex >= 1 && seatIndex <= 24 ? VIP_PRICE : NORMAL_PRICE;
      totalPrice += seatPrice;
    });
  
    return totalPrice;
  };
  
  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleBookAndOpenModal = () => {
  if (selectedSeats.length > 0) {
   
    setIsPaymentModalOpen(true);
  } else {
    toast.error("No seats are Selected")
  }
};
  const handleBooking = async () => {
    setIsPaymentModalOpen(true);



    const userInfo = await fetchUserInfoFromToken();
    console.log(userInfo);
    if (!userInfo) {
      console.warn("User info not available");
      return;
    }

    try {
      if (selectedRoom && selectedSeats.length > 0) {
        const seatIndices = selectedSeats;
        const userId = userInfo._id;
        console.log("Selected Room:", selectedRoom);
        const response = await axios.post(
          `http://localhost:5000/api/cinemarooms/${selectedRoom._id}/markseat`,
          { seatIndices }
        );

        console.log("Response from marking seats as taken:", response.data);

        const bookedTicketData = {
          isVerified:false,
         startTime:selectedRoom.availableTimes[0].startTime,
         endTime:selectedRoom.availableTimes[0].endTime,
          movieId: movieData._id,
          roomName: selectedRoom.roomName,
          movieName: movieData.title,
          userName: userInfo.firstName,
          userId: userId,
          seatIndices,
        };
        console.log("Data to send to Booked Tickets:", bookedTicketData);

        const bookedTicketResponse = await axios.post(
          "http://localhost:5000/api/bookedtickets",
          bookedTicketData
        );
        
        if (bookedTicketResponse.status === 201) {
          setSelectedSeats([]);
          setClearSelectedSeats(true);
          setTimeout(() => {
            setClearSelectedSeats(false);
          }, 100);
          setCinemaSeatsKey((prevKey) => prevKey + 1);
          toast.success("seats booked successfully!")
          setTimeout(() => {
            navigate("/BookedMovies");
          }, 1000);
        } else {
          console.log(
            "Error creating booked ticket:",
            bookedTicketResponse.data.message
          );
        }
      } else {
        console.log("No selected room or seats");
      }
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  };

  const handleTimeButton = (room, availableTime) => {
    console.log("Selected Room ID:", room._id);
    console.log("Room Data:", room);
    console.log("Selected Time:", availableTime);
    setSelectedRoom(room);
    setIsBookingEnabled(true);
    setSelectedSeats([]);
    setClearSelectedSeats(true);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/cinemarooms`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Cinema Room Data:", data);
        setCinemaRoomData(data);
      })
      .catch((error) =>
        console.error("Error fetching cinema room data:", error)
      );
  }, []);

  useEffect(() => {
    if (movieData && movieData.imdbId) {
      const matchingRooms = cinemaRoomData.filter(
        (room) => room.movieImdbId === movieData.imdbId
      );

      const startTimeButtons = matchingRooms.map((room) => {
        return room.availableTimes.map((availableTime, index) => (
          <button
            key={index}
            className="start-time-button rounded hover:bg-pink"
          >
            {availableTime.startTime}
          </button>
        ));
      });
      console.log("Number of matching cinema rooms:", matchingRooms.length);
      console.log("Start time buttons:", startTimeButtons);
    }
  }, [movieData, cinemaRoomData]);

  useEffect(() => {
    if (movieData && movieData._id && movieData._id.$oid) {
      fetch(
        `http://localhost:5000/api/cinemarooms/${movieData._id.$oid}/availabletimes`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (Array.isArray(data)) {
            setAvailableTimes(data);
          } else {
            console.error("Available times data is not an array:", data);
          }
        })
        .catch((error) =>
          console.error("Error fetching available times:", error)
        );
    }
  }, [movieData]);

  useEffect(() => {
    fetch(`http://localhost:5000/movies/find/${id}`)
      .then((response) => response.json())
      .then((data) => setMovieData(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  useEffect(() => {
    if (movieData && movieData.genre) {
      const selectedGenre = movieData.genre.split(",")[0].trim();

      fetch(
        `http://localhost:5000/movies/bygenre?genre=${encodeURIComponent(
          selectedGenre
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          const relatedMoviesSlice = data.slice(0, 4);
          setRelatedMovies(relatedMoviesSlice);
        })
        .catch((error) =>
          console.error("Error fetching related movies:", error)
        );
    }
  }, [movieData]);

  if (!movieData) {
    return <Loading />;
  }

  const { title, poster, backdrop, runtime, genre, imdbId } = movieData;
  console.log("IMDb ID:", imdbId);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const matchingRooms =
    movieData && movieData.imdbId
      ? cinemaRoomData.filter((room) => room.movieImdbId === movieData.imdbId)
      : [];

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
    const options = { weekday: "short", day: "numeric", month: "short" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  function handleDateSelection(date) {
    setSelectedDate(date);
    setSelectedRoom(null); 
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timezoneOffset = today.getTimezoneOffset();
  today.setMinutes(today.getMinutes() - timezoneOffset);

  const availableDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date.toISOString().split("T")[0];
  });
  return (
    <>
      <div className="movie-info-container">
        <ToastContainer/>
        <div className="robot-about">
          <img src={backdrop[0]} alt={title} />
          <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold text-center">
            {title}
          </h1>
        </div>
        <div className="rubon mt-3">
          <img
            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
            alt="rubon"
          ></img>
        </div>
        <div className="movie-details">
          <div className="top-content">
            <div className="movie-heading">
              <h1 className="movie-title">{title}</h1>
              <p>
                {genre} / {runtime}
              </p>
            </div>
          </div>
          <div className="movie-content">
           
            <div className="movie-image">
              <img src={poster[0]} alt={title} />
            </div>
            <div className="right-side-seats">
              <div className="flex flex-col">
                <div className="date-picker">
                  <h2>Select a Date:</h2>
                  <div className="flex">
                    {availableDates.map((date, index) => (
                      <button
                        key={index}
                        className={`start-time-button m-2 text-black ${
                          selectedDate === date ? "selected" : ""
                        }`}
                        onClick={() => handleDateSelection(date)}
                      >
                        {formatDate(date)}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedDate ? (
                  matchingRooms.some((room) =>
                    room.availableTimes.some((availableTime) =>
                      availableTime.startTime.startsWith(selectedDate)
                    )
                  ) ? (
                    <div className="selected-times">
                      <h2>Available Times for {formatDate(selectedDate)}:</h2>
                      <div className="flex">
                        {matchingRooms.map((room, roomIndex) => (
                          <div key={roomIndex} className="room-times">
                            {room.availableTimes
                              .filter((availableTime) =>
                                availableTime.startTime.startsWith(selectedDate)
                              )
                              .map((availableTime, index) => (
                                <button
                                  key={index}
                                  className="bg-pink2 px-2 py-2 rounded hover:bg-pink m-2 text-white"
                                  onClick={() =>
                                    handleTimeButton(room, availableTime)
                                  }
                                >
                                  {extractTime(availableTime.startTime)}
                                </button>
                              ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="m-auto my-10 font-bold text-xl">
                      No available showtimes for {formatDate(selectedDate)}
                    </p>
                  )
                ) : null}
              </div>
              {selectedRoom && (
                <div className="selected-room-details room-card bg-gray-400 p-5 l:w-25 rounded-lg m-0">
                  <CinemaSeats
                    cinemaSeatsKey={cinemaSeatsKey}
                    seats={selectedRoom.seating}
                    roomId={selectedRoom._id}
                    isUser={isAdmin}
                    onSeatSelect={setSelectedSeats}
                    clearSelectedSeats={clearSelectedSeats}
                  />
                
                  
                </div>
              )}
           <p>
            You have selected{" "}
            <span className="font-bold text-pink">{vipSeatsCount}</span>{" "}
            VIP seats and{" "}
            <span className="font-bold text-pink">{normalSeatsCount}</span>{" "}
            normal seats, and your Total Payment is : $
            <span className="font-bold text-pink">{calculateTotalPrice()}</span>
          </p>
              
              {isBookingEnabled && (
                <button className="book-button rounded  m-2 bg-pink p-2" onClick={handleBookAndOpenModal}>
                  Book
                </button>
                
                )}
                <PaymentPopup isModalOpen={isPaymentModalOpen} onClose={handleCloseModal} onConfirmPayment={handleBooking}  totalPayment={calculateTotalPrice()}/>
            </div>
          </div>
          <hr />

          <div className="main-content">
            <h1 className="movie-title-h1 story-title">
              More Movies Like This
            </h1>
          </div>
          <div className="movies">
            {relatedMovies.map((relatedMovie) => (
              <div className="movie" key={relatedMovie._id}>
                <img src={relatedMovie.poster[0]} alt={relatedMovie.title} />
                <div className="movieInfo">
                  <h1 className="font-bold">{relatedMovie.title}</h1>
                  <h5 className="font-light hide">{relatedMovie.language}</h5>
                  <p className="hide">{relatedMovie.plot}</p>
                  <div>
                    <button
                      onClick={() => {
                        navigate(`/movies/${relatedMovie._id}`);
                        scrollToTop();
                      }}
                      className="moreInfoBtn rounded hover:bg-pink2"
                    >
                      More Info
                    </button>
                    <button className="bookBtn rounded hover:bg-pink hide">
                      Book
                    </button>
                  </div>
                </div>
                
              </div>
              
            ))}
          </div>
          
        </div>
      
      </div>
     
      <footer>
        <Footer />
      </footer>
   </>
  );
}