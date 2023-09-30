import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import Icons from "../../components/icons/icons";
import "./Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/contacts/save";
      const { data: res } = await axios.post(url, data);
      toast.success(res.msg, {
        theme: "colored",
      });
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      }
    }
  };
  return (
    <>
    <ToastContainer/>
      <div className="about-container">
        <div className="movie-info-container">
          <div className="robot-about">
            <img
              src="https://i0.wp.com/gdcindia.co.in/wp-content/uploads/2019/03/contact-us-background.jpg?ssl=1"
              alt="interstellar"
            />
            <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">
              Contact
            </h1>
          </div>
          <div className="rubon mt-3">
            <img
              src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
              alt="rubon"
            />
          </div>
        </div>
        <section>
          <div className="moviesNowPlaying">
            <div>
              <Icons.Film size={32} className="text-pink2" />
            </div>
            <p className="flicklogo font-bold">Contact With Us</p>
            <div className="w w-1/2">
              <h1 className="font-bold flex justify-center text-center">
                Feel Free to Write us Anytime
              </h1>
            </div>
          </div>
          <div className="inputs-contact mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-4">
                  <div className="w-full md:col-span-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="input-field bg-gray-100 px-8 py-4 md:w-96 border border-s-pink2"
                      placeholder="Your Name"
                      onChange={handleChange}
                      value={data.name}
                      required
                    />
                  </div>
                  <div className="w-full md:col-span-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="input-field bg-gray-100 px-8 py-4 md:w-96 border border-s-pink2"
                      placeholder="Your Email"
                      onChange={handleChange}
                      value={data.email}
                      required
                    />
                  </div>
                  <div className="w-full md:col-span-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="input-field bg-gray-100 px-8 py-4 md:w-96 border border-s-pink2"
                      placeholder="Your Phone Number"
                      onChange={handleChange}
                      value={data.phone}
                      required
                    />
                  </div>
                  <div className="w-full md:col-span-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="input-field bg-gray-100 px-8 py-4 md:w-96 border border-s-pink2"
                      placeholder="Subject"
                      onChange={handleChange}
                      value={data.subject}
                      required
                    />
                  </div>
                  <div className="w-full md:col-span-2">
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      className="input-field w-full bg-gray-100 px-8 py-5 border border-s-pink2"
                      placeholder="Write your message here..."
                      onChange={handleChange}
                      value={data.message}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5 mb-8">
                <button className="bg-pink2 text-white font-bold py-2 px-4 rounded">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className="flex justify-around parent-contact flex-wrap">
          <div className="flex justify-center border border-gray-300 w-80 child-contact mb-10">
            <div className="">
              <h1 className="text-xl font-bold">About</h1>
              <p className="mt-5">
                We are passionate about movies and providing a seamless movie ticket booking experience to our customers.
              </p>
            </div>
            <div>
              <Icons.Profile size={45} className="text-pink2" />
            </div>
          </div>

          <div className="flex justify-center border border-gray-300 w-80 child-contact mb-10">
            <div className="">
              <h1 className="text-xl font-bold">Address</h1>
              <p className="mt-5">
              68 Road Broklyn Street, New York, UnitedStates of America
              </p>
            </div>
            <div>
              <Icons.MapLocation size={45} className="text-pink2" />
            </div>
          </div>

          <div className="flex justify-center border border-gray-300 w-80 child-contact mb-10">
            <div className="">
              <h1 className="text-xl font-bold">Contact</h1>
              <p className="mt-5">
                +92 ( 8800 ) - 6780 flickzilla.cine@gmail.com
              </p>
            </div>
            <div>
              <Icons.Contacts size={45} className="text-pink2" />
            </div>
          </div>
        </section>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Contact;
