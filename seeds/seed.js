// // Importing the Sequelize library and the Movie model
// const sequelize = require('../config/connection');
// const { Movie } = require('../models');

// // Importing movie data from a JSON file
// const movieData = require('./movieData.json');
// const userData = require('./userData.json');

// // Defining the seedDatabase function to seed the database with movie data
// const seedDatabase = async () => {
//     // Synchronizing the database and dropping any existing tables, if any
//     await sequelize.sync({ force: true});

//     // Bulk creating movie data in the database
//     await Movie.bulkCreate(movieData {
//         // Using individual hooks for each movie data entry
//         individualHooks: true,
//         // Returning the created movie data
//         returning: true,
//     })

//     // Exiting the process after seeding the database
//     process.exit(0);
// };

// // Calling the seedDatabase function to start the seeding process
// seedDatabase();





const sequelize = require('../config/connection');
const { User, Movie } = require('../models');

const userData = require('./userData.json');
const movieData = require('./movieData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const movie of movieData) {
    await Movie.create({
      ...movie,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
