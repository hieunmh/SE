import productRouter from './productRoute';

function routesInit(app) {
  app.use('/', productRouter);
}

export default routesInit;
