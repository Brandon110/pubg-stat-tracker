var express = require('express'),
    app = express(),
    router = express.Router(),
    helmet = require('helmet'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    port = process.env.PORT || 3002;

//Set port
app.set('port', port);

// Require our .env config
require('dotenv').config({ path: 'config.env' });

// Require our middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join('dist', 'build', 'public')));
app.use(express.static(path.join(__dirname, 'static')));

// Tell our express app to use express router
app.use(router);

// Require our routes
require('./routes')(router);

// Catch all routes
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'views', 'index.html'));
});

// Handle thrown errors
router.use((error, req, res, next) => {
    res.status(500).send('Internal Server Error.');
});

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});