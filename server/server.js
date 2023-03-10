import express from 'express';
import morgan from 'morgan';
import routesInit from './routes/indexRoute';

// init app
const app = express();

// Middleware
app.use(express.json()); // parse json bodies in the request object

//http logger
// app.use(morgan('combined'));

// handle router
routesInit(app);

// default error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Listen on pc port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

