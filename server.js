const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const fs = require('fs');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
})

// define a simple route
app.get('/', (req, res) => {
    res.json({'message': 'Welcome to Story Collaborator'})
});

// Require api routes
// fs.readdirSync(__dirname + '/app/routes').forEach(filename => {
//     if (~filename.indexOf('.js')) {
//         require(__dirname + '/app/routes/' + filename);
//     }
// });
require('./app/routes/story.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(3009, () => {
    console.log('Server is listening on port 3009');
});