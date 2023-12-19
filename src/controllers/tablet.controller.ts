import { Request, Response } from 'express';
import { tabletsService } from '../services/tablet.service';
import { ProductEnum } from '../types/Product';

export const tabletsController = {
  getTablets: async(req: Request, res: Response) => {
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
      await tabletsService.getWithParams({
        page: +page > 0 ? +page : 1,
        perPage: +perPage > 0 ? +perPage : 16,
        sort,
        order: preparedOrder,
      }),
    );
  },

  getTabletDetail: async(req: Request, res: Response) => {
    const { itemId } = req.params;

    try {
      const tabletDetail = await tabletsService.getDetail(itemId);

      if (!tabletDetail) {
        res.status(404).send('Phone detail not found');

        return;
      }

      const additional = await tabletsService.getAdditional(
        tabletDetail.namespaceId,
      );

      res.send({
        current: tabletDetail,
        additional,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        res.status(404).send('Tablet detail not found');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  },

  getRecommendedTablets: async(req: Request, res: Response) => {
    const { itemId } = req.params;
    const tablet = await tabletsService.getTablet(itemId);

    if (!tablet) {
      res.status(404).send('Tablet not found');

      return;
    }

    res.send(await tabletsService.getRecommended(tablet));
  },
};
