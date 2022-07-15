const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//@Desc register a new user
//@Route POST /user/register
//@Access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.json({ msg: "User created" });
};

//@Desc authenticate a user
//@Route GET /api/users/login
//@Access Public
const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })

    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          res.json({
            success: true,
            token: "Bearer " + generateToken(user),
          });
        } else {
          return res.status(400).json({ message: "Password incorrect." });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Error: " + err });
    });
};

const getMe = async (req,res) => {
    const user = await User.findById(req.user.id);
    const {name, email,_id} = user;
    res.json({name, email,_id});
}

// generate token for user
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.name,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { registerUser, loginUser,getMe };
