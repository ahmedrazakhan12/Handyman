const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as necessary

// Define a adminModel model
const adminModel = sequelize.define(
  "admins",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pfpImage: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    description: {
      type: DataTypes.TEXT, // Increase the length to 500 characters
      allowNull: true,
    },
    role: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    // Add other attributes here
  },
  {
    // Model options
  }
);

// Sync the model with the database, creating the table if it doesn't exist
sequelize
  .sync()
  .then(() => {
    console.log("Admins table created successfully.");
  })
  .catch((err) => {
    console.error("Unable to create Admins table:", err);
  });



// Method to find adminModel by email
const editProfile = async (id, name, email, description, pfpImage) => {
  return await adminModel.update(
    { name, email, description, pfpImage },
    { where: { id: id } }
  );
};

// Method to find adminModel by email
const findByEmail = async (email) => {
  return await adminModel.findOne({ where: { email } });
};


// Method to find adminModel by email
const adminInfo = async (id) => {
  return await  adminModel.findOne({ where: { id: id } });
    
  
};





// Exports
module.exports = {
  findByEmail,
  editProfile,
  adminModel,
  adminInfo,
};
