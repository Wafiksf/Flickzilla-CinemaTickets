import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Icons from "../../components/icons/icons";
import "./Login.css";
import { fetchUserInfoFromToken } from "../../components/fetchUser";
import UpdateUser from "./../../components/updateUser";
import ProfileUser from "./../../components/profileUser";
import ResetPassUser from "./../../components/resetPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
  }, []);

  const googleAuth = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      window.location = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      setIsLoggedIn(true);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.warn(error.response.data.message, {
          theme: "colored",
        });
      }
    }
  };
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isPassOpen, setIsPassOpen] = useState(false);

  const handleEditToggle = () => {
    if (!isEditOpen) {
      setIsEditOpen(true);
      setIsProfileOpen(false);
      setIsPassOpen(false);
    }
  };

  const handleProfileToggle = () => {
    if (!isProfileOpen) {
      setIsProfileOpen(true);
      setIsEditOpen(false);
      setIsPassOpen(false);
    }
  };

  const handlePassToggle = () => {
    if (!isPassOpen) {
      setIsPassOpen(true);
      setIsProfileOpen(false);
      setIsEditOpen(false);
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
        {isLoggedIn && user ? (
          <>
            <div className="moviesNowPlaying mt-10">
              <div>
                <Icons.UserCircle size={32} className="text-pink2" />
              </div>
              <p className="flicklogo font-bold">Welcome</p>
              <div>
                <h1 className="font-bold">Profile Information</h1>
              </div>
            </div>
            <section className="section-profile-info flex my-10">
              <div className="profile-info-btn w-1/4 flex ml-10 flex-col gap-2">
                <div>
                  <button
                    onClick={handleProfileToggle}
                    className={`${
                      isProfileOpen ? "bg-pink2 text-white" : "bg-gray-200"
                    } text-black font-bold py-3 px-4 w-64 hover:bg-pink2 profile-btns`}
                  >
                    Profile
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleEditToggle}
                    className={`${
                      isEditOpen ? "bg-pink2 text-white" : "bg-gray-200"
                    } text-black font-bold py-3 px-4 w-64 hover:bg-pink2 profile-btns`}
                  >
                    Edit
                  </button>
                </div>
                {!user.googleId && (
                <div>
                  <button
                    onClick={handlePassToggle}
                    className={`${
                      isPassOpen ? "bg-pink2 text-white" : "bg-gray-200"
                    } text-black font-bold py-3 px-4 w-64 hover:bg-pink2 profile-btns`}
                  >
                    Password
                  </button>
                </div>
                )}
                <div>
                  <button
                    className="bg-gray-200 text-black hover:bg-red-600 hover:text-white font-bold py-3 px-4 w-64 profile-btns"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="profile-dynamic flex-1 flex flex-col border border-gray-300 rounded-md mr-8">
                {/*  */}
                {isEditOpen && <UpdateUser user={user} />}
                {/*  */}
                {isProfileOpen && <ProfileUser user={user} />}
                {/*  */}
                {isPassOpen && <ResetPassUser user={user} />}
                {/*  */}
              </div>
            </section>
          </>
        ) : (
          <div>
            <div className="moviesNowPlaying">
              <div>
                <Icons.Film size={32} className="text-pink2" />
              </div>
              <p className="flicklogo font-bold">Login</p>
              <div>
                <h1 className="font-bold flex justify-center text-center">
                  Login To Your Account
                </h1>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-10 mb-10">
              <form onSubmit={handleSubmit}>
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
                    className="input-field bg-gray-100 px-4 py-4 md:w-96 mb-4 border border-s-pink2 "
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

                <Link to="/forgot-password">
                  <p className="underline mt-2">Lost your password?</p>
                </Link>
                <div className="md:w-96">
                  <button
                    type="submit"
                    className="bg-pink2 text-white font-bold py-2 px-4 w-full mt-6"
                  >
                    Sign In
                  </button>
                </div>
                </form>
                <div className="mt-2">
                  <h1>
                    New Here?
                    <Link to="/signup">
                      <span className="underline text-pink2"> Sign Up</span>
                    </Link>
                  </h1>
                </div>
                <hr className="md-w-96 my-5"></hr>
                <div className="md:w-96">
                  <button
                    type="button"
                    className="login-with-google-btn w-full"
                    onClick={googleAuth}
                  >
                    Sign in with Google
                  </button>
                </div>
            </div>
          </div>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Login;
