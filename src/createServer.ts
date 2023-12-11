import express from 'express';
import cors from 'cors';
import path from 'path';

import { phonesRouter } from './routes/phone.route';

function createServer() {
  const app = express();

  app.use(express.static(path.resolve('../public')));

  app.use(cors(), express.json());

  app.use('/phones', phonesRouter);

  return app;
}

export default createServer;
