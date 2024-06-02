const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
//@desc create new contact
//@route post /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are manadatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashedPassword);
  //create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({_id: user.id, email: user.email});
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  };

  res.json({ message: "Register the user" });
});
//@desc create new contact
//@route post /api/users/register
//@access public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login the user" });
});
//@desc create new contact
//@route post /api/users/register
//@access

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "show current the user" });
});

module.exports = { registerUser, loginUser, currentUser };
