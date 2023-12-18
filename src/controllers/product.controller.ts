import { Request, Response } from 'express';
import { productsService } from '../services/product.service';
import { Categories } from '../types/Categories';

export const productsController = {
  getAmount: async(req: Request, res: Response) => {
    const { category } = req.params;

    if (!Object.values(Categories).includes(category as Categories)) {
      res.status(422).send('Invalid category');

      return;
    }

    res.send(await productsService.getAmount(category as Categories));
  },

  getNewProducts: async(req: Request, res: Response) => {
    res.send(await productsService.getNew());
  },

  getDiscountProducts: async(req: Request, res: Response) => {
    res.send(await productsService.getDiscount());
  },
};
