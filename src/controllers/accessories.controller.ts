import { Request, Response } from 'express';
import { accessoriesService } from '../services/accessories.service';
import { ProductEnum } from '../types/Product';

export const accessoriesController = {
  getAccessories: async(req: Request, res: Response) => {
    const {
      page = '1',
      perPage = '16',
      sort = 'id',
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

    res.send(
      await accessoriesService.getWithParams({
        page: +page > 0 ? +page : 1,
        perPage: +perPage > 0 ? +perPage : 16,
        sort,
        order,
      }),
    );
  },

  getAccessoryDetail: async(req: Request, res: Response) => {
    const { itemId } = req.params;

    try {
      const accessoryDetail = await accessoriesService.getDetail(itemId);

      if (!accessoryDetail) {
        res.status(404).send('Phone detail not found');

        return;
      }

      const additional = await accessoriesService.getAdditional(
        accessoryDetail.namespaceId,
      );

      res.send({
        current: accessoryDetail,
        additional,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        res.status(404).send('Accessory detail not found');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  },

  getRecommendedAccessory: async(req: Request, res: Response) => {
    const { itemId } = req.params;
    const accessory = await accessoriesService.getAccessory(itemId);

    if (!accessory) {
      res.status(404).send('Accessory not found');

      return;
    }

    res.send(await accessoriesService.getRecommended(accessory));
  },
};
