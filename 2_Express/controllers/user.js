const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  // edit the id of user
  await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" });
  return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

async function handleCreateUser(req, res) {
  //crete new user
  //me : body come from postman
  const body = req.body;

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  // console.log('result', result)
  return res.status(201).json({ msg: "success", id: result._id});
}

module.exports = {
  handleGetAllUsers,
  getUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
};
