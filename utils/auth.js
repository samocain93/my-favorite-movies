// This code defines a middleware function withAuth that is used to check if a user is logged in. If the logged_in key does not exist in the user's session, the user is redirected to the /login page. If the logged_in key does exist, the next middleware function is called. This function is commonly used in Express.js to protect routes that should only be accessible to logged-in users.

// Define a middleware function withAuth to check if a user is logged in
const withAuth = (req, res, next) => {
    // Check if the "logged_in" key does not exist in the user's session
    if (!req.session.logged_in) {
      // If the user is not logged in, redirect them to the "/login" page
      res.redirect('/login');
    } {
      // If the user is logged in, call the next middleware function
      next();
    }
  };
  
  // Export the withAuth middleware function
  module.exports = withAuth;
  