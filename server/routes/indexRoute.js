import productRouter from './productRoute';
import userRouter from './userRoute';

function routesInit(app) {
  app.use('/', productRouter);
  app.use('/', userRouter);
}

export default routesInit;
