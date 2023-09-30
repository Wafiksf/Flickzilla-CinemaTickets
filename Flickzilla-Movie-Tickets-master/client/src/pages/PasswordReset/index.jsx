import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/footer/Footer";

const PasswordReset = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const { id, token } = useParams();
    const url = `http://localhost:5000/api/password-reset/${id}/${token}`;

    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            }
        };
        verifyUrl();
    }, [id, token, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(url, { password });
            setMsg(data.message);
            setError("");
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    };

    return (
        <>
        <div className="movie-info-container">
        <div className="robot-about">
          <img
            src="https://www.pointgadget.com/wp-content/uploads/2019/12/best-netflix-alternatives.jpg"
            alt="interstellar"
          />
          <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">
            My Account
          </h1>
        </div>
        <div className="rubon mt-3">
          <img
            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
            alt="rubon"
          />
        </div>
      </div>
        <div className="my-20 mx-10 flex justify-center items-center">
            {validUrl ? (
                <form onSubmit={handleSubmit} className="">
                    <h1 className="mb-5">Add New Password</h1>
                    <div>
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="input-field bg-gray-100 px-8 py-4 md:w-96"
                    />
                    {error && <div >{error}</div>}
                    {msg && <div >{msg}</div>}
                    </div>

                    <button type="submit" className="bg-pink text-white font-bold py-2 px-4 mt-5">
                        Submit
                    </button>
                </form>
            ) : (
                <h1 className="font-bold xl:text-2xl text-red-600">Invalid Link</h1>
            )}
        </div>
        <footer>
        <Footer />
      </footer>
        </>
    );
};

export default PasswordReset;
