const express = require("express");

const router = express.Router();
const {
  handleGetAllUsers,
  getUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
} = require("../controllers/user");

//Routes
router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(getUserById)
  .put((req, res) => {
    return res.json({ status: "it is to use for image so we don't use" });
  })
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
