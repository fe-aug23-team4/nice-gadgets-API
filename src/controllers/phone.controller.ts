import { Request, Response } from 'express';
import { phonesService } from '../services/phone.service';
import { ProductEnum } from '../types/Product';

export const phonesController = {
  getPhones: async(req: Request, res: Response) => {
    const {
      page = '1',
      perPage = '16',
      sort = 'discount',
      order = 'asc',
    } = req.query;

    if (
      isNaN(+page)
      || isNaN(+perPage)
      || !(typeof sort === 'string' && sort in ProductEnum)
      || (order !== 'asc' && order !== 'desc')
    ) {
      res.status(422).send('Invalid query parameters');

      return;
    }

    const preparedOrder = order === 'asc' ? 'desc' : 'asc';

    res.send(
      await phonesService.getWithParams({
        page: +page > 0 ? +page : 1,
        perPage: +perPage > 0 ? +perPage : 16,
        sort,
        order: preparedOrder,
      }),
    );
  },

  getPhoneDetail: async(req: Request, res: Response) => {
    const { itemId } = req.params;

    try {
      const phoneDetail = await phonesService.getDetail(itemId);

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
    const { itemId } = req.params;
    const phone = await phonesService.getPhone(itemId);

    if (!phone) {
      res.status(404).send('Phones not found');

      return;
    }

    res.send(await phonesService.getRecommended(phone));
  },
};
