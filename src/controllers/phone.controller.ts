import { Request, Response } from 'express';
import { phonesService } from '../services/phone.service';

export const phonesController = {
  getPhones: (req: Request, res: Response) => {
    res.send(phonesService.getWithParams(req.query));
  },

  getNewPhones: (req: Request, res: Response) => {
    res.send(phonesService.getNew());
  },

  getDiscount: (req: Request, res: Response) => {
    res.send(phonesService.getDiscount());
  },
};
