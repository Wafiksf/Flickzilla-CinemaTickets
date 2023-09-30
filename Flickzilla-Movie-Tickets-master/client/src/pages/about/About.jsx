import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Footer from "../../components/footer/Footer";
import Icons from "../../components/icons/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchUserInfoFromToken } from "../../components/fetchUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./About.css";
import axios from "axios";

const About = () => {
  const [testimonialItems, setTestimonialItems] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await axios.get("http://localhost:5000/feedbacks");
        const feedbacksWithUserInfo = await Promise.all(
          response.data.map(async (feedback) => {
            if (feedback.isAddedToSlider) {
              const userResponse = await axios.get(
                `http://localhost:5000/users/find/${feedback.userId}`
              );
              const user = userResponse.data;
              return { user, feedbackText: feedback.text };
            }
            return null;
          })
        );
        setTestimonialItems(feedbacksWithUserInfo.filter(Boolean)); // Filter out null values
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    }

    fetchFeedbacks();
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [animateLeft524, setAnimateLeft524] = useState(false);
  const [animateRight524, setAnimateRight524] = useState(false);
  const [animateLeft1422, setAnimateLeft1422] = useState(false);
  const [animateRight1422, setAnimateRight1422] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Animation for the first set of elements (scroll position >= 524)
      if (scrollPosition >= 250) {
        setAnimateLeft524(true);
        setAnimateRight524(true);
      } else {
        setAnimateLeft524(false);
        setAnimateRight524(false);
      }

      // Animation for the second set of elements (scroll position >= 1422)
      if (scrollPosition >= 1250) {
        setAnimateLeft1422(true);
        setAnimateRight1422(true);
      } else {
        setAnimateLeft1422(false);
        setAnimateRight1422(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [feedback, setFeedback] = useState("");
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/feedbacks/save",
        {
          userId: user._id,
          text: feedback,
        }
      );

      if (response.status === 200) {
        console.log("Feedback submitted:", feedback);
        setFeedback(""); // Clear feedback state
        toast.success("Feedback successfully submitted. Thank you!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.warn("Please Login First", {
        theme: "colored",
      });
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="about-container">
        <div className="movie-info-container">
          <div className="robot-about">
            <img
              src="https://image.tmdb.org/t/p/original/5Aym0qCOh1D7ctZxf5vuYbTQTAa.jpg"
              alt="interstellar"
            />
            <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">
              About Us
            </h1>
          </div>
          <div className="rubon mt-3">
            <img
              src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
              alt="rubon"
            />
          </div>
        </div>
        <div className="about-us-container">
          <div className="moviesNowPlaying">
            <div>
              <Icons.Film size={32} className="text-pink2" />
            </div>
            <p className="flicklogo font-bold">Get To Know</p>
            <div>
              <h1 className="font-bold flex justify-center text-center">
                About Us
              </h1>
            </div>
          </div>
          <div className="about-us-content">
            <div
              className={`about-us-content-p ${
                animateLeft524 ? "animated-slide-in" : ""
              }`}
            >
              <h2>
                <b>Welcome to our Flickzilla website!</b>
              </h2>
              <br></br>
              <p>
                At Flickzilla, we are passionate about movies and providing a
                seamless movie ticket booking experience to our customers. We
                strive to be your go-to platform for discovering and booking
                movie tickets with ease.
              </p>
              <br></br>
              <p>
                Our mission is to bring the magic of cinema to your fingertips,
                allowing you to explore the latest movie releases, find
                showtimes, and book tickets conveniently from the comfort of
                your home.
              </p>
            </div>
            <div
              className={`about-us-content-img ${
                animateRight524 ? "animated-slide-in-right" : ""
              }`}
            >
              <br></br>
              <img
                src="https://t4.ftcdn.net/jpg/05/07/59/47/360_F_507594773_mW9NRetAbDYJK3JWJleozw7tVXmiB8NJ.jpg"
                alt="Flickzilla"
                width={600}
              />
            </div>
          </div>
        </div>

        <section className="testimonial-section">
          <div className="testimonial-container">
            <div className="moviesNowPlaying-about">
              <div>
                <Icons.Film size={32} className="text-pink2" />
              </div>
              <p className="flicklogo font-bold">Our Feedbacks</p>
              <div>
                <h1 className="font-bold">What They're Talking About us?</h1>
              </div>
            </div>
            <div>
              <Slider {...settings} className="slider-feedback">
                {testimonialItems.map((item, index) => (
                  <div key={index} className="feedback-item">
                    {item.user && (
                      <div className="author">
                        <div className="image">
                          <img
                            decoding="async"
                            src={
                              item.user.profilePic
                                ? `${item.user.profilePic}`
                                : "https://img.freepik.com/free-icon/man_318-677829.jpg"
                            }
                            alt={`${item.user.firstName}`}
                          />
                        </div>
                        <div className="info">
                          <h3 className="name">{`${item.user.firstName} ${item.user.lastName}`}</h3>
                          <p className="job">{item.user.email}</p>
                        </div>
                      </div>
                    )}
                    <p className="content">{item.feedbackText}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>

        <div className="about-us-container">
          <h2>
            <b>Why Choose Us?</b>
          </h2>
          <div className="about-us-content">
            <div
              className={`about-us-content-p ${
                animateLeft1422 ? "animated-slide-in" : ""
              }`}
            >
              <ul>
                <li>
                  Extensive Movie Selection: We offer a wide selection of movies
                  across various genres, ensuring there's something for every
                  movie enthusiast.
                </li>
                <li>
                  Convenient Booking: Our user-friendly interface makes it easy
                  to find movie showtimes and secure your tickets in just a few
                  clicks.
                </li>
                <li>
                  Secure Payment: Your security is our priority. We use advanced
                  encryption to safeguard your payment details.
                </li>
                <li>
                  Seamless Experience: Enjoy a smooth and hassle-free movie
                  ticket booking experience from start to finish.
                </li>
              </ul>
            </div>
            <div
              className={`about-us-content-img ${
                animateRight1422 ? "animated-slide-in-right" : ""
              }`}
            >
              <img
                src="https://ca-times.brightspotcdn.com/dims4/default/4165cb5/2147483647/strip/true/crop/2608x1467+0+300/resize/1200x675!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc9%2F15%2Fbf73b38a4088ae62f41fa4433c32%2Fla-photos-1staff-la-me-coronavirus-movie-industry001-jlc.JPG"
                alt="Flickzilla"
                width={600}
              />
            </div>
          </div>
        </div>
        <section className="feedback-container">
          <div className="feedback-form">
            <h2>
              <b>Give Us Your Feedback</b>
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Your feedback..."
                value={feedback}
                onChange={handleFeedbackChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>

        <section className="custom-section">
          <div className="custom-container">
            <div className="custom-column custom-col-100 custom-top-column">
              <div className="custom-widget-wrap">
                <div className="custom-text-editor">
                  <div className="custom-text-container">
                    <h2 className="custom-title">
                      Buy 5 Tickets And Get A Vip Ticket For Free Now!!!{" "}
                    </h2>
                    <a className="custom-button" href="/">
                      <span className="custom-button-text">
                        Book Your Tickets Now
                      </span>
                    </a>
                  </div>
                </div>
              </div>
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

export default About;
