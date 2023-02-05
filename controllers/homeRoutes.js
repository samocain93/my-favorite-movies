const router = require('express').Router();
const { Movie, User } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
// Prevents access to the homepage if the user is not logged in
router.get('/', async (req, res) => {
  // try {
    const movieData = await Movie.findAll({
      // include: [{ model: User}],
      // attributes: { exclude: ['password'] },
      order: [['title', 'ASC']],
    });

    const movies = movieData.map((movie) => movie.get({ plain: true }));

    res.render('homepage', {
      movies,
      // TODO: Add a comment describing the functionality of this property
      // Passes the logged_in property to the homepage template
      logged_in: req.session.logged_in,
    });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  // Redirects to the homepage if the user is already logged in
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
