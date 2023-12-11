import express from 'express';
import { phonesController } from '../controllers/phone.controller';

export const phonesRouter = express.Router();

phonesRouter.get('/', phonesController.getPhones);
phonesRouter.get('/new', phonesController.getNewPhones);
phonesRouter.get('/discount', phonesController.getDiscount);
phonesRouter.get('/:phoneId', phonesController.getPhoneDetail);

phonesRouter.get(
  '/:phoneId/recommended',
  phonesController.getRecommendedPhones,
);
