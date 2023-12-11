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

  getPhoneDetail: async(req: Request, res: Response) => {
    const { phoneId } = req.params;

    try {
      const phoneDetail = await phonesService.getDetail(phoneId);

      res.send(phoneDetail);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        res.status(404).send('Phone detail not found');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  },
};
