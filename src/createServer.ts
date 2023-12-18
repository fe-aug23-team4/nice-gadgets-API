import express from 'express';
import cors from 'cors';
import path from 'path';
import { connect } from './bd/init';

import { productsRouter } from './routes/product.route';
import { phonesRouter } from './routes/phone.route';
import { tabletsRouter } from './routes/tablet.route';
import { accessoriesRouter } from './routes/accessories.route';

connect();

function createServer() {
  const app = express();

  app.use(express.static(path.resolve('../public')));

  app.use(cors(), express.json());

  app.use('/products', productsRouter);
  app.use('/phones', phonesRouter);
  app.use('/tablets', tabletsRouter);
  app.use('/accessories', accessoriesRouter);

  return app;
}

export default createServer;
