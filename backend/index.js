const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require('./router/user');
const accountRouter = require('./router/account');
const connectDB = require('./database/data');
require("dotenv").config();

const bodyparser = require('body-parser');
const app = express();

// Connect to MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(helmet());

// Routes


app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);
app.use("/api/v1", (req, res) => {
  console.log("App is running fine!!");
  res.json({message: "App is running fine...."});
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
