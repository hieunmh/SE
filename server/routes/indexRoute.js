// import productRouter from './productRoute';
// import userRouter from './userRoute';

const productRouter = require('./productRoute');
const userRouter = require('./userRoute');

function routesInit(app) {
  app.use('/products', productRouter);
  app.use('/', userRouter);
}

// export default routesInit;
module.exports = routesInit;
