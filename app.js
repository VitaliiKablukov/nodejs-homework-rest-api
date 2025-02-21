const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Server error" } = err;
  if (err.message.includes("E11000 duplicate key error collection")) {
    status = 409;
    message = "Email in use";
  }

  res.status(status).json({ message });
});

module.exports = app;
