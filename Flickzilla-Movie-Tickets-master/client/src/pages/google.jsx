import React from "react";
import axios from "axios";

export default function Google() {
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/login/success",
        {
          withCredentials: true,
        }
      );
      const token = response.data.token;

      localStorage.setItem("token", token);
      console.log("Token stored in localStorage:", token);

      window.location = "/";
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  return (
    <div className="bg-wblack111 flex justify-center items-center flex-col h-screen">
      <div className="flex justify-center items-center flex-col p-8 border border-pink2 rounded-md">
        <h1 className="text-2xl flicklogo font-bold w-96 text-center">
          Almost there! You've chosen to log in with your Google account. This
          allows for a quick and secure authentication process. Your Google
          account information will only be used for logging you in.
        </h1>
        <div>
          <button
            className="bg-pink2 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
            onClick={handleButtonClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
