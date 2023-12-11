import { Request, Response } from 'express';
import { phonesService } from '../services/phone.service';

export const phonesController = {
  getPhones: (req: Request, res: Response) => {
    res.send(phonesService.getWithParams(req.query));
  },
};
