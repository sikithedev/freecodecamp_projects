const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const sanitizedOriginalName = path.basename(file.originalname);
    cb(null, uniqueSuffix + "-" + sanitizedOriginalName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
  fileFilter: function (req, file, cb) {
    const sanitizedName = path.basename(file.originalname);
    if (sanitizedName !== file.originalname) {
      return cb(new Error("Invalid file path"));
    }
    cb(null, true);
  },
});

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const { originalname: name, mimetype: type, size } = req.file;
  res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
