import express from 'express';
import { productsController } from '../controllers/product.controller';

export const productsRouter = express.Router();

productsRouter.get('/amount/:category', productsController.getAmount);
productsRouter.get('/new', productsController.getNewProducts);
productsRouter.get('/discount', productsController.getDiscountProducts);
