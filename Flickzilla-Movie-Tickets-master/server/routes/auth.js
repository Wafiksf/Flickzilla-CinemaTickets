const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models/UsersModel"); // Import your user model

router.get("/login/success", async (req, res) => {
  if (req.user) {
    try {
      const existingUser = await User.findOne({ googleId: req.user.id });

      if (existingUser) {
        // User exists, generate a token using the existing method
        const token = existingUser.generateAuthToken(); // Use the existing method to generate the token

        res.status(200).json({
          error: false,
          message: "Successfully Logged In",
          user: existingUser,
          token: token, // Include the token in the response
        });
      } else {
        // User doesn't exist, create a new user record
        const newUser = new User({
          googleId: req.user.id,
          firstName: req.user.name.givenName,
          lastName: req.user.name.familyName,
          email: req.user.emails[0].value,
          profilePic: req.user.photos[0].value,
        });

        const savedUser = await newUser.save();

        // Generate a token for the new user using the existing method
        const token = savedUser.generateAuthToken(); // Use the existing method to generate the token

        res.status(200).json({
          error: false,
          message: "Successfully Logged In",
          user: savedUser,
          token: token, // Include the token in the response
        });
      }
    } catch (error) {
      console.error("Error saving/fetching user:", error);
      res.status(500).json({ error: true, message: "Internal server error" });
    }
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login/failed' }), 
  (req, res) => {
    console.log('Successful login');
    res.redirect(`http://localhost:3000/google`);
  }
);

router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      // Handle any errors that occurred during logout
      console.error("Error during logout:", err);
      return res.redirect(process.env.BASE_URL); // Redirect the user
    }
    
    // User successfully logged out
    console.log('logged out');
    res.redirect(process.env.BASE_URL);
  });
});



module.exports = router;
