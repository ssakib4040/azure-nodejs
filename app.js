const express = require("express");
const rateLimit = require("express-rate-limit");
var MongoStore = require("rate-limit-mongo");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Too many requests from this IP in 15 minutes, please try again later",
  store: new MongoStore({
    uri: "mongodb+srv://admin:1234567890@cluster0.vivbi45.mongodb.net/express-rate-limit",
    user: "",
    password: "",
    // should match windowMs
    expireTimeMs: 15 * 60 * 1000,
    errorHandler: console.error.bind(null, "rate-limit-mongo"),
    // see Configuration section for more options and details
  }),
});

app.use(limiter);

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.get("/ip", (req, res) => {
  return res.send(req.ip);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000!");
});
