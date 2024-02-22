const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const exerciseSchema = mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: String,
});
const userSchema = mongoose.Schema({
  username: String,
});
const logSchema = mongoose.Schema({
  username: String,
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: String,
    },
  ],
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);
const Log = mongoose.model("Log", logSchema);

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/users", (req, res) => {
  User.find((err, data) => {
    if (err) throw err;

    res.json(data);
  });
});

app.post("/api/users", (req, res) => {
  const { username } = req.body;

  User.findOne({ username }, (err, data) => {
    if (err) throw err;

    if (data) {
      res.json({
        username: data.username,
        _id: data._id,
      });
    } else {
      const user = new User({ username });
      user.save();

      new Log({
        _id: user._id,
        username: user.username,
        count: 0,
        log: [],
      }).save();

      res.json({
        username: user.username,
        _id: user._id,
      });
    }
  });
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const userId = req.params._id;
  const { description, duration } = req.body;
  const date = !isNaN(new Date(req.body.date))
    ? new Date(req.body.date).toDateString()
    : new Date().toDateString();

  User.findById(userId, (err, data) => {
    if (err) throw err;

    if (data) {
      const exerciseJson = {
        username: data.username,
        description,
        duration: Number(duration),
        date,
      };
      new Exercise(exerciseJson).save();

      Log.findByIdAndUpdate(userId, {
        $inc: { count: 1 },
        $push: {
          log: {
            description,
            duration,
            date,
          },
        },
      }).exec();

      res.json({
        ...exerciseJson,
        _id: userId,
      });
    } else {
      res.json({});
    }
  });
});

app.get("/api/users/:_id/logs", (req, res) => {
  const userId = req.params._id;
  const { limit } = req.query;
  const from = req.query.from || 0;
  const to = req.query.to || new Date();

  Log.findById(userId, (err, data) => {
    if (err) throw err;

    if (data) {
      const log = data.log
        .map(({ description, duration, date }) => {
          return {
            description,
            duration,
            date,
          };
        })
        .filter(({ description, duration, date }) => {
          return (
            new Date(date).getTime() >= new Date(from).getTime() &&
            new Date(date).getTime() <= new Date(to).getTime()
          );
        });
      if (limit) log.length = limit;

      const logJson = {
        _id: data._id,
        username: data.username,
        count: data.count,
        log,
      };
      res.json(logJson);
    } else {
      res.json({});
    }
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
