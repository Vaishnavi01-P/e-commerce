import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import productsRoutes from './routes/productsRoutes';
import health from './routes/health';
import { errorHandler, notFound } from './middleware/errorHandler';

export function createApp() {
  const app = express();
  app.use(cors({ origin: env.CLIENT_ORIGIN }));
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/api/health', health);
  app.use('/api/products', productsRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
