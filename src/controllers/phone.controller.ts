import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { phonesService } from '../services/phone.service';

export const phonesController = {
  getPhones: (req: ExpressRequest, res: ExpressResponse) => {
    res.send(phonesService.getWithParams(req.query));
  },
};
