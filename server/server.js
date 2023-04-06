const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const routesInit = require('./routes/indexRoute');
const path = require('path');

//temporary: save session into folder session
const fileStore = require("session-file-store")(session);

//database
const db = require('./models');
(async () => {
  await db.sequelize.sync();
  // await db.sequelize.sync({ alter: true });
})();


// init app
const app = express();

// Middleware
const staticFolder = path.join(__dirname, 'public');
app.use('/', express.static(staticFolder));

app.use(
  session({
    name: process.env.SES_NAME,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
      // secure: process.env.NODE_ENV, 
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SES_SECRET,
    store: new fileStore()
  }),
);


app.use(cors({
  origin: "http://localhost:8080", // thay doi theo url cua Network client
  credentials: true
}));

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