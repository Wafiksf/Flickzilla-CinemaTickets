import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Icons from "../../components/icons/icons";
import Footer from "../../components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/users";
      const { data: res } = await axios.post(url, data);
      toast.success(res.message, {
        theme: "colored",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message, {
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
    <ToastContainer/>
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
      <div>
        <div>
          <div className="moviesNowPlaying">
            <div>
              <Icons.Film size={32} className="text-pink2" />
            </div>
            <p className="flicklogo font-bold">Sign Up</p>
            <div>
              <h1 className="font-bold flex justify-center text-center">
                Create Your Account
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col mt-10 mb-10">
            <form onSubmit={handleSubmit}>
              <label className="text-gray-500">
                Enter Your First Name <span className="text-pink2">*</span>
              </label>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className="input-field bg-gray-100 px-4 py-4 mb-4 md:w-96 border border-s-pink2"
                />
              </div>
              <label className="text-gray-500">
                Enter Your Last Name <span className="text-pink2">*</span>
              </label>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className="input-field bg-gray-100 px-4 py-4 mb-4 md:w-96 border border-s-pink2"
                />
              </div>
              <label className="text-gray-500">
                Enter Your Email <span className="text-pink2">*</span>
              </label>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="input-field bg-gray-100 px-4 py-4 mb-4 md:w-96 border border-s-pink2"
                />
              </div>
              <label className="text-gray-500">
                Enter Your Password <span className="text-pink2">*</span>
              </label>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="input-field bg-gray-100 px-4 py-4 md:w-96 border border-s-pink2"
                />
              </div>
              <div className="md:w-96">
                <button
                  type="submit"
                  className="bg-pink2 text-white font-bold py-2 px-4 w-full mt-6"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-2">
              <h1>
                Already Have An Account?{" "}
                <Link to="/login">
                  <span className="underline text-pink2">Login</span>
                </Link>
              </h1>
            </div>
            <p className="w-96 mt-6">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </p>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Signup;
