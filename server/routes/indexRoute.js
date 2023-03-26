// import productRouter from './productRoute';
// import userRouter from './userRoute';

const authRouter = require('./authRoute');
const productRouter = require('./productRoute');
const paymentRouter = require('./paymentRoute');
const orderRouter = require('./orderRoute');

function routesInit(app) {
  app.use('/', productRouter);
  app.use('/', authRouter);
  app.use('/', paymentRouter);
  app.use('/', orderRouter);
}

// export default routesInit;
module.exports = routesInit;
