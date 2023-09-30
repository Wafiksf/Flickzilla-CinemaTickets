import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div className="flex justify-center items-center flex-col bg-wblack111 h-screen">
      {validUrl ? (
        <div>
          <h1 className="text-5xl flicklogo font-bold">Email verified successfully!</h1>
          <Link to="/login">
            <button className="bg-pink2 text-white font-bold py-2 px-4 mt-5">Login</button>
          </Link>
        </div>
      ) : (
        navigate("/nopage")
      )}
    </div>
  );
};

export default EmailVerify;
