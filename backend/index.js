require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);


const port = process.env.PORT;
app.listen(port , ()=>{
    console.log("Server running on port: " + port);
})
