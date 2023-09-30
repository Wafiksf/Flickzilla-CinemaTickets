import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CinemaSeats.css";

const CinemaSeats = ({ seats,isUser, onSeatSelect, clearSelectedSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [cinemaSeatsKey, setCinemaSeatsKey] = useState(0);
  const seatsPerRow = 12;
  const cinemaScreenWidth = `${seatsPerRow * 45}px`;

  const seatClickHandler = (rowIndex, seatIndex, isTaken) => {
    if (!isUser) return; 

    if (isTaken) return; 

    const seatNumber = (rowIndex - 1) * seatsPerRow + seatIndex;

    if (selectedSeats.includes(seatNumber)) {
      
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  useEffect(() => {
    setSelectedSeats([]);
    
  }, [clearSelectedSeats, cinemaSeatsKey]); 



  useEffect(() => {
    onSeatSelect(selectedSeats); 
  }, [selectedSeats, onSeatSelect]);

  useEffect(() => {
    
    setSelectedSeats([]);
  }, [clearSelectedSeats]);

  const generateSeats = () => {
    const seatRows = [];
    const highestRowNumber = Math.max(...seats.map((seat) => seat.row));

    for (let row = 1; row <= highestRowNumber; row++) {
      const seatRow = [];

      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatIndex = (row - 1) * seatsPerRow + seat;
        const seatData = seats.find(
          (seat) => seat.row === row && seat.seatNumber === seatIndex
        );

        const isSeatTaken = seatData ? seatData.isTaken : false;
        const isSelected = selectedSeats.includes(seatIndex);

        const seatClass = `cinema-seat ${
          isSelected ? "selected" : ""
        } ${isSeatTaken ? "taken" : ""}`;

        seatRow.push(
          <div
            key={seatIndex}
            className={seatClass}
            onClick={() => seatClickHandler(row, seat, isSeatTaken)}
          >
            {seatIndex}
          </div>
        );
      }

      seatRows.push(
        <div key={row} className="row">
          {seatRow}
        </div>
      );
    }

    return seatRows;
  };

  return (
    <div className="cinema-seats-container">
      <div className="cinema-seats">
        <div className="screen" style={{ width: cinemaScreenWidth }}></div>
        <div className="seats-rows">{generateSeats()}</div>
      </div>
    </div>
  );
};

export default CinemaSeats;