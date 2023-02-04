const Sequelize = require('sequelize');

// Import environment variables from the .env file
require('dotenv').config();

// Create a variable to store the database connection
let sequelize;

// Check if the JAWSDB_URL environment variable is set
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is set, use it to connect to the database
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not set, use the local MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database username
    process.env.DB_PASSWORD, // Database password
    {
      host: '127.0.0.1', // Database host
      dialect: 'mysql', // Use the MySQL dialect
      port: 3306 // Database port
    }
  );
}

// Export the database connection
module.exports = sequelize;

  