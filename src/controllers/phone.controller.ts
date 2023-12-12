import { Request, Response } from 'express';
import { phonesService } from '../services/phone.service';

export const phonesController = {
  getPhones: async(req: Request, res: Response) => {
    res.send(await phonesService.getWithParams(req.query));
  },

  getNewPhones: async(req: Request, res: Response) => {
    res.send(await phonesService.getNew());
  },

  getDiscount: async(req: Request, res: Response) => {
    res.send(await phonesService.getDiscount());
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

  getRecommendedPhones: async(req: Request, res: Response) => {
    const { phoneId } = req.params;
    const phone = await phonesService.getPhone(phoneId);

    if (!phone) {
      res.status(404).send('Phone not found');

      return;
    }

    res.send(await phonesService.getRecommended(phone));
  },
};
