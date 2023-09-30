const { User, validatePassword } = require('../models/UsersModel');
const bcrypt = require("bcrypt");

// Update
module.exports.updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({ message: "User Updated Successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You can update only your account!" });
  }
};

//update password
module.exports.updatePassword = async (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (!req.body.password) {
        return res.status(400).json({ message: "New password is required!" });
      }
      const { error } = validatePassword(req.body);
      if (error)
          return res.status(400).send({ message: error.details[0].message });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { password: hashedPassword },
        },
        { new: true }
      );

      res.status(200).json({ message: "Password Updated Successfully!" });
    } else {
      res.status(403).json({ message: "You can update only your account!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


//Delete
module.exports.deleteUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted" });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json({ message: 'You can delete only your account!' });
    }
  };

//Get
module.exports.getUser = async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
};

//Get all
module.exports.getAllUser = async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json({ message: 'You are not allowed to see all users' });
    }
  };

//Get user stats
module.exports.statUser = async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
if (req.user.isAdmin){
try{
    const data = await User.aggregate([
        {
            $project:{
                month: {$month: "$createdAt"}
            }
        },{
            $group: {
                _id: "$month",
                total: {$sum:1}
            }
        }
    ]);
    res.status(200).json(data)
}catch(err){
    res.status(500).json(err);
}
}
else{
  res.status(403).json('You are not allowed to see stats users');
};
}