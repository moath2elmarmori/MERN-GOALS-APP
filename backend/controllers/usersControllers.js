const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// @desc Registering A User
// @route POST /api/users/register
// @access public
module.exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists With This Email");
  }
  // generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create the user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // if the user has been created successfully
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
    // if the creation failed
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Loging A User In
// @route POST /api/users/login
// @access public
module.exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // if user exists and the password is right
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Getting User Data
// @route GET /api/users/me
// @access private
module.exports.getMe = asyncHandler(async (req, res) => {
  // because we have inserted the user data in the request object in the (protect) function middleware - that runs before this get me function- so now we can access user data from withing req.user
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
