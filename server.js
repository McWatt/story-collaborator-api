const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
// const fs = require('fs');
const cors = require('cors');
const jsonwebtoken = require("jsonwebtoken");

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(
    dbConfig.url,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
  });

app.all("/api/*", function (req, res, next) {
    if (req.method.toLowerCase() !== "options") {
        return next();
    }
    return res.send(204);
});

// Authentication middleware
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
            if (err) {
                req.user = undefined;
            }
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

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