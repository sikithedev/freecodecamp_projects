require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number,
});

const Url = mongoose.model("Url", urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;

  try {
    // Check if URL is valid
    const checkUrl = new URL(url);
    if (!/^https?:$/.test(checkUrl.protocol)) throw new Error();

    Url.findOne({ original_url: url }, (err, data) => {
      if (err) throw err;

      if (data) {
        const { original_url, short_url } = data;
        res.json({ original_url, short_url });
      } else {
        Url.countDocuments((err, count) => {
          if (err) throw err;

          const json = {
            original_url: url,
            short_url: count + 1,
          };
          new Url(json).save();

          res.json(json);
        });
      }
    });
  } catch (err) {
    res.json({ error: "Invalid URL" });
  }
});

app.get("/api/shorturl/:short_url", function (req, res) {
  const { short_url } = req.params;
  Url.findOne({ short_url }, (err, data) => {
    if (err) throw err;

    if (data) {
      try {
        const urlToRedirect = new URL(data.original_url);
        if (!/^https?:$/.test(urlToRedirect.protocol)) {
          return res.json({ error: "Invalid URL protocol" });
        }
        res.redirect(data.original_url);
      } catch (err) {
        res.json({ error: "Invalid URL" });
      }
    } else {
      res.json({
        error: "No short URL found for the given input",
      });
    }
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
