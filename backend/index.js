require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// Routes Import
const userRoute = require("./routes/userRoute");

// Middlewares
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies
app.use("/public", express.static("public")); // Serve static files



// Routes
app.use("/user", userRoute);


const port = process.env.PORT;
app.listen(port , ()=>{
    console.log("Server running on port: " + port);
})
