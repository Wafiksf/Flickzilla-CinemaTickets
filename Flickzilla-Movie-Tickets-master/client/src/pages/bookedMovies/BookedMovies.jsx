import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import "./BookedMovies.css";
import Icons from "../../components/icons/icons";
import Logo from "../../images/flicklogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { fetchUserInfoFromToken } from "../../components/fetchUser";
import { Waveform } from '@uiball/loaders'

export default function BookedMovies() {
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchBookedTickets();
  }, []);

  const fetchBookedTickets = async () => {
    try {
      const userInfo = await fetchUserInfoFromToken();
      const userId = userInfo._id;
      console.log(userInfo);
      if (!userInfo) {
        console.warn("User info not available");
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/bookedtickets/${userId}`);
      const bookedTicketsData = response.data;

      const ticketDetails = await Promise.all(bookedTicketsData.map(async (ticket) => {
        try {
          const movieResponse = await axios.get(`http://localhost:5000/movies/find/${ticket.movieId}`);
          const movieData = movieResponse.data;

          const randomNumber = Math.floor(Math.random() * 100000000);
          return { ...ticket, movie: movieData, randomNumber };
        } catch (error) {
          console.error("Error fetching movie details:", error);
          return null;
        }
      }));

      setBookedTickets(ticketDetails.filter(Boolean));
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching booked tickets:", error);
    }
  };

  const format12HourTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes.toString().padStart(2, "0")}`;
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  return (
    <>
    <div className="about-container">
      <div className="movie-info-container">
        <div className="robot-about">
          <img
            src="https://s.yimg.com/ny/api/res/1.2/mtn8hWkcL.DST2icwQBVNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEwMDA7aD02NjQ-/https://media.zenfs.com/en-US/homerun/reader_s_digest_624/08c97d4d5f049339abd56988c5e3747b"
            alt="Booked movies"
          />
          <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">
            Booked Movies
          </h1>
        </div>
        <div className="rubon mt-3">
          <img
            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
            alt="rubon"
          />
        </div>
      </div>
      <div className="moviesNowPlaying">
        <div>
          <Icons.Ticket size={32} className="text-pink2" />
        </div>
        <p className="flicklogo font-bold">Tickets</p>
        <div>
          <h1 className="font-bold flex justify-center text-center">
            Your Tickets
          </h1>
        </div>
      </div>
      <div className="container-ticket-booked">
        {loading ? ( // Display loading indicator if loading is true
          <div className="loading-indicator">
            <Waveform size={30}/>
          </div>
        ) : bookedTickets.length === 0 ? ( // Display message if no tickets
          <p className="no-tickets-message font-bold text-2xl my-10">No tickets booked.</p>
        ) : (
          bookedTickets.map((ticket) => (
            <div key={ticket._id} className="ticket-booked-content">
              <div className="ticked-booked-left">
                <div className={`vip-label ${ticket.seatIndices >= 1 && ticket.seatIndices <= 24 ? 'show-vip' : ''}`}>VIP</div>
                <div className="ticked-booked-image">
                  <img src={ticket.movie.backdrop[0]} alt={ticket.movie.title} />
                </div>
                <div className="ticked-booked-info">
                  <p className="date-booked">
                    <span>{new Date(ticket.startTime).getDate()}</span>
                    <span>{monthNames[new Date(ticket.startTime).getMonth()]}</span>
                    <span>{new Date(ticket.startTime).getFullYear()}</span>
                  </p>
                  <div className="show-name">
                    <h1>{ticket.movieName}</h1>
                    <h2>BY {ticket.movie.director}</h2>
                  </div>
                  <div className="time-booked">
                    <p>{format12HourTime(ticket.startTime)} <span>TO</span> {format12HourTime(ticket.endTime)}</p>
                    {console.log(ticket.startTime)}
                    <p>{ticket.roomName}</p>
                    <p>DOOR OPEN @ {format12HourTime(ticket.startTime)} PM</p>
                  </div>
                  <p className="location"><span>ESA Coding Lab</span>
                    <span className="separator"> <FontAwesomeIcon icon={faSmile} /></span><span>Nabatieh City</span>
                  </p>
                </div>
              </div>
              <div className="ticked-booked-right">
                <div className="right-info-container">
                  <div className="show-name">
                    <h1>{ticket.movieName}</h1>
                    <h2>Your Seat number:{ticket.seatIndices}</h2>
                  </div>
                  <div className="time-booked">
                  <p>{format12HourTime(ticket.startTime)} <span>TO</span> {format12HourTime(ticket.endTime)}</p>
                    {console.log(ticket.startTime)}
                    <p>{ticket.roomName}</p>
                    <p>DOOR OPEN @ {format12HourTime(ticket.startTime)} PM</p>
                  </div>
                  <img src={Logo} alt="flick" width="150px" />
                  <p className="ticket-number">
                    #{ticket.randomNumber}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    <footer>
      <Footer />
    </footer>
  </>
  );
}
