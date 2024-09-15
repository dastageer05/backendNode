/*
// controllers/userController.js
const User = require("../models/user");

exports.renderSignin = (req, res) => {
  return res.render("signin");
};

exports.renderSignup = (req, res) => {
  return res.render("signup");
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
};

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
};

exports.logout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

*/