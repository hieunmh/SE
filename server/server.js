import express from 'express';
import morgan from 'morgan';
import routesInit from './routes/indexRoute';


const app = express();

//http logger
app.use(morgan('combined'));

routesInit(app);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Listen on pc port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

