const express = require("express");
const cors = require("cors"); // Import the cors middleware
const userRouter = require('./router/user');
const mainRouter = require("./router/user");
const accountRouter = require('./router/account')
const connectDB = require('./database/data');
require("dotenv").config();

const bodyparser = require('body-parser')
connectDB();

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.use("/api/v1/user", userRouter); 
app.use("api/v1/account",accountRouter);

app.use("/api/v1",(req,res)=>{
  console.log("app is running fine !!")
  res.send("App is running fine ....")
});


app.listen(process.env.PORT, () => {
  console.log("Connection is Started !!");
});
