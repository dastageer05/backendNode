const express = require("express");

const { logReqRes } = require("./middlewares");
const { connectMongoDb } = require("./connection.js");
const userRouter = require("./routes/user.js");

const app = express();
const port = 3000;

//Connection
connectMongoDb("mongodb://localhost:27017/backPiyush").then(() =>
  console.log("mongodb connected")
);

//middlewar
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
