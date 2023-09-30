const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require("express-session");
require('dotenv').config();
const passportStrategy = require("./passport");
const moviesRoutes = require('./routes/MoviesRoute');
const usersRoutes = require('./routes/UsersRoute');
const authRoutes = require('./routes/AuthRoute');
const userRoutes = require("./routes/users");
const passwordResetRoutes = require("./routes/passwordReset");
const contactRoutes = require("./routes/ContactRoute");
const authRoute = require('./routes/auth');
const feedbackRoutes = require("./routes/FeedbackRoute");
const ReviewRoute = require('./routes/ReviewRoute.js'); 
const cinemaRoomRoutes = require("./routes/CinemaroomRoutes");
// Import ReviewController for deleteReview and getAllReviews routes
const { deleteReview, getAllReviews } = require('./controllers/ReviewController');
const bookedTicketRoutes=require("./routes/BookedTicketsRoute");

const app = express();
const PORT = process.env.PORT || 5000;
const ReviewModel = require('./models/ReviewsModel'); 
app.use(
	session({
	  secret: `${process.env.SECRET_KEY}`,
	  resave: false,
	  saveUninitialized: true,
	})
  );

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: '1mb' }));
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected To MongoDB, Server Works!'))
.catch((err) => console.log(err));

app.use(moviesRoutes, usersRoutes, contactRoutes, feedbackRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.use('/auth', authRoute);
app.use('/api', ReviewRoute);
app.use("/api/cinemarooms", cinemaRoomRoutes);
app.use('/api/bookedtickets',bookedTicketRoutes);

app.delete('/reviews/delete/:reviewId', deleteReview);
app.get('/reviews/all', getAllReviews);

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
