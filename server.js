const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const helpers = require('./utils/helpers')

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an Express.js application
const app = express();

// Set the port number
const PORT = process.env.PORT || 3000;

// Create session configuration
const sess = {
    secret: 'Super secret secret', // Secret used to sign the session ID cookie
    cookie: {}, // Options for the session ID cookie
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    store: new SequelizeStore({
        db: sequelize // Use the Sequelize database connection for the session store
    })
};

// Tells the app to use the session
app.use(session(sess));

const hbs = exphbs.create({});

// Set the view engine to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the custom routes module
app.use(routes);

// Sync the database and start the Express.js app
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server now listening on port ${PORT}`));
})




