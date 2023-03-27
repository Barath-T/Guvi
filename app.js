const express = require("express");
const app = express();

const cors = require("cors");

const userRouter = require("./routers/users");
const loginRouter = require("./routers/login");

const config = require("./utils/config");

const mongoose = require("mongoose").set("strictQuery", false);

mongoose
   .connect(config.MONGO_URI)
   .then(() => console.log("DB connected"))
   .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/login",loginRouter);

module.exports = app;
