// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const userRoutes = require("./routes/user");
const feedbackRoute = require("./routes/feedback");
const scraperJob = require("./web_scrapper");

//app
const app = express();
app.use(cors());
app.use(express.json());
//db
// mongoose
//   .connect(process.env.MONGO_URI, {})
//   .then(() => console.log("Database is connected"))
//   .catch((err) => console.log("Database connection Error", err));
// //midddleware
// app.use(express.json());
// app.use(morgan("dev"));
// // CORS configuration
// app.use(cors());

// //routes
// app.use("/user", userRoutes);
// app.use("/contact-us", feedbackRoute);
app.use(express.static(path.join(__dirname, "dist")));
//port
const port = process.env.PORT || 8000;

//listener
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get("/*", (req, res) => {
  //frontend\dist\index.html
  const filePath = path.join(__dirname, "dist", "index.html");
  console.log(filePath);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      // Handle error if the file cannot be read
      res.status(500).send(err.message);
    } else {
      // Set the appropriate content type for the file
      res.status(200).set("Content-Type", "text/html").send(data.toString());
    }
  });
});

setInterval(() => {
  scraperJob();
}, 24 * 60 * 60 * 1000);
