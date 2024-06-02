const asyncHandler = require("express-async-handler");
//@desc create new contact
//@route post /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
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
//@access public

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "show current the user" });
});

module.exports = { registerUser, loginUser, currentUser };
