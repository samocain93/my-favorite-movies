// Importing required modules
const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Defining a Movie class that inherits from the Model class
class Movie extends Model {
  // Method to compare a given password with the stored password hash
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
};

// id, name, rating, release year, director, length, description

// Define the properties of the Movie model
Movie.init({
  // The unique identifier for each movie
  id: {
    type: DataTypes.INTEGER, // data type is integer
    allowNull: false, // must have a value
    primaryKey: true, // unique and cannot be null
    autoIncrement: true, // auto-incremented for new records
  },
  // The title of the movie
  title: {
    type: DataTypes.STRING, // data type is string
    allowNull: false, // must have a value
  },
  // The average rating of the movie
  avg_rating: {
    type: DataTypes.DECIMAL(10,1), // data type is decimal
    allowNull: false,
    defaultValue: 0.0, // must have a value
  },
  // The year the movie was released
  release_year: {
    type: DataTypes.INTEGER, // data type is integer
    allowNull: false, // must have a value
  },
  // The name of the movie's director
  director: {
    type: DataTypes.STRING, // data type is string
    allowNull: false, // must have a value
  },
  // The length of the movie in minutes
  length: {
    type: DataTypes.INTEGER, // data type is integer
    allowNull: false, // must have a value
  },
  // A description of the movie
  description: {
    type: DataTypes.TEXT, // data type is text
    allowNull: false, // must have a value
  },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    }
},
  {
  // Connect the Movie model to the database using the sequelize object
  sequelize,
  // Disable timestamps for the model
  timestamps: false,
  // Freeze the table name (don't pluralize it)
  freezeTableName: true,
  // Use underscores for table/column names
  underscored: true,
  // Set the name of the model to 'movies'
  modelName: 'movie',
});

// Export the Movie model for use in other parts of the application
module.exports = Movie;
