require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// Routes Import
const userRoute = require("./routes/userRoute");
const db = require('./models'); // Adjust the path as necessary

// Middlewares
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies
app.use("/public", express.static("public")); // Serve static files


// Sync the models with the database
db.sequelize.sync()
  .then(() => {
    console.log("All tables created successfully.");
  })
  .catch((err) => {
    console.error("Unable to create tables:", err);
  });

// Routes
app.use("/admin", userRoute);


const port = process.env.PORT;
app.listen(port , ()=>{
    console.log("Server running on port: " + port);
})