import express from 'express';
import { accessoriesController } from '../controllers/accessories.controller';

export const accessoriesRouter = express.Router();

accessoriesRouter.get('/', accessoriesController.getAccessories);
accessoriesRouter.get('/:itemId', accessoriesController.getAccessoryDetail);
accessoriesRouter.get('/:itemId/one', accessoriesController.getAccessory);

accessoriesRouter.get(
  '/:itemId/recommended',
  accessoriesController.getRecommendedAccessory,
);
