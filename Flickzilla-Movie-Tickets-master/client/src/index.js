import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NoPage from "./pages/nopage/404";
import MovieInfo from "./pages/movieInfo/MovieInfo";
import Upcoming from "./pages/upcoming/Upcoming";
import AllMovies from "./pages/allMovies/allMovies";
import Menu from "./pages/menu/Menu";
import Dashboard from "./pages/dashboard/dashboard";
import Movies from "./pages/dashboard/movies";
import Feedbacks from "./pages/dashboard/feedback";
import Reviews from './pages/dashboard/reviews';
import Login from "./pages/login/Login";
import Signup from "./pages/Signup";
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgetPassword";
import PasswordReset from "./pages/PasswordReset";
import AdminRoute from "./utils/protectedRoute"; // Import the ProtectedRoute component
import BookedMovies from "./pages/bookedMovies/BookedMovies";
import Google from "./pages/google";
import UsersPage from "./pages/dashboard/UsersPage";
import CinemaRoom from "./pages/dashboard/CinemaRoom";
import TicketBooking from "./pages/ticketBooking/TicketBooking"
import ScrollToTopButton from './components/scroll/scroll';
export default function App() {
  return (
    <BrowserRouter>
              <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/movies/:id" element={<MovieInfo />} />
          <Route path="/getTicket/:id" element={<TicketBooking/>} />
          <Route path="/AllMovies" element={<AllMovies />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/bookedMovies" element={<BookedMovies />} />
          <Route path="/google" element={<Google />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
        </Route>
        <Route
          path="/dash"
          element={<AdminRoute element={<Dashboard />} path="/dash" />}
        />
        <Route
          path="/dash/movies"
          element={<AdminRoute element={<Movies />} path="/dash/movies" />}
        />
        <Route
          path="/dash/feedback"
          element={<AdminRoute element={<Feedbacks />} path="/dash/feedback" />}
        />
        <Route
          path="/dash/users"
          element={<AdminRoute element={<UsersPage />} path="/dash/users" />}
        />
        <Route
          path="/dash/cinemaroom"
          element={
            <AdminRoute element={<CinemaRoom />} path="/dash/cinemaroom" />
          }
        />
        <Route
          path="/dash/reviews"
          element={
            <AdminRoute element={<Reviews />} path="/dash/reviews" />
          }
        />

      </Routes>
      
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
