import React, { useState } from "react";
import Popup from 'reactjs-popup';
import './Popup.css';
import { ToastContainer, toast } from 'react-toastify';
function PaymentPopup({ isModalOpen, onClose, onConfirmPayment, totalPayment }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardHolderError, setCardHolderError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cvvError, setCVVError] = useState("");

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
    setCardNumberError("");
  };

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
    setCardHolderError("");
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
    setExpiryDateError("");
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
    setCVVError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!cardNumber) {
      setCardNumberError("Card number is required");
      return;
    }
    if (!cardHolder) {
      setCardHolderError("Card holder's name is required");
      return;
    }
    if (!expiryDate) {
      setExpiryDateError("Expiry date is required");
      return;
    }
    if (!cvv) {
      setCVVError("CVC is required");
      return;
    }

    console.log("Form submitted:", cardNumber, cardHolder, expiryDate, cvv);
    onConfirmPayment();
    onClose();
  };

  return (
    <Popup
      trigger={null}
      modal
      open={isModalOpen}
      onClose={onClose}
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="content">
            <div className="credit-card-form-container">
              <form onSubmit={handleSubmit}>
                <div className="credit-card-form">
                  <img
                    className="Image1"
                    src="https://i.ibb.co/hgJ7z3J/6375aad33dbabc9c424b5713-card-mockup-01.png"
                    alt="Card Mockup"
                    border="0"
                  />
                  <div className="form-group">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                      type="text"
                      id="card-number"
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      required
                    />
                    {cardNumberError && <p className="error-message">{cardNumberError}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="card-holder">Card Holder</label>
                    <input
                      type="text"
                      id="card-holder"
                      placeholder="Card holder's name"
                      value={cardHolder}
                      onChange={handleCardHolderChange}
                      required
                    />
                    {cardHolderError && <p className="error-message">{cardHolderError}</p>}
                  </div>
                  <div className="form-row">
                    <div className="form-group form-column">
                      <label htmlFor="expiry-date">Expiry Date</label>
                      <input
                        className="dateinput"
                        type="date"
                        id="expiry-date"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        required
                      />
                      {expiryDateError && <p className="error-message">{expiryDateError}</p>}
                    </div>
                    <div className="form-group form-column">
                      <label htmlFor="cvv">CVC</label>
                      <input
                        className="cvcinput"
                        type="number"
                        id="cvv"
                        placeholder="CVC"
                        value={cvv}
                        onChange={handleCVVChange}
                        required
                      />
                      {cvvError && <p className="error-message">{cvvError}</p>}
                    </div>
                  </div>
                  <button
            type="submit"
            className="click-button"
         
            onClick={() => {
              if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
                toast.error("Please fill out all the inputs!");
              } else {
                onConfirmPayment();
                close();
              }
            }}
          >
            Book your Tickets for TOTAL: {totalPayment}$
          </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
  
}

export default PaymentPopup;
