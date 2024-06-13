const pool = require("../config/database");

exports.login = async (email) => {
  try {
    const { rows } = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);
    if (rows.length > 0) {
      const user = rows[0];
      return user;
    } else{
      console.log("User not found!");
      return null;
    }
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};
