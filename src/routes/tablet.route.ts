import express from 'express';
import { tabletsController } from '../controllers/tablet.controller';

export const tabletsRouter = express.Router();

tabletsRouter.get('/', tabletsController.getTablets);
tabletsRouter.get('/:itemId', tabletsController.getTabletDetail);
tabletsRouter.get('/:itemId/one', tabletsController.getTablet);

tabletsRouter.get(
  '/:itemId/recommended',
  tabletsController.getRecommendedTablets,
);
