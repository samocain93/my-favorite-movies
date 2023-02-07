const express = require('express');
const sequelize = require('../config/connection')

const router = express.Router();
const  Movie = require('../models/Movie');

// Creating get route to find and display all movies from the database

router.get('/', (req, res) => {
    Movie.findAll()
    .then(movies => {
        console.log(movies)
        res.sendStatus(200)

    })
    .catch(err => console.log(err));
})



module.exports = router;


