const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = router;

/*
// routes/userRoutes.js
const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();

router.get("/signin", userController.renderSignin);
router.get("/signup", userController.renderSignup);

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);

router.get("/logout", userController.logout);

module.exports = router;

*/
