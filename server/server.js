// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import routesInit from './routes/indexRoute';
// import session from 'express-session';

const express = require('express');
// Cross Origin Resource Sharing
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const routesInit = require('./routes/indexRoute');
const path = require('path');

// init app
const app = express();

// Middleware
app.use(
  session({
    secret: 'thisisoursecret',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//http logger
// app.use(morgan('combined'));

// handle router
routesInit(app);

// default error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen on pc port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
