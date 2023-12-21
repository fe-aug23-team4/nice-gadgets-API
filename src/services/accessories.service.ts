import { Op } from 'sequelize';

import { Accessory, Product } from '../bd/models';

import { Product as ProductType } from '../types/Product';
import { QueryParams } from '../types/QueryParams';
import { Categories } from '../types/Categories';

export const accessoriesService = {
  getAccessory: (itemId: string) => Product.findOne({ where: { itemId } }),
  getDetail: (itemId: string) => Accessory.findByPk(itemId),

  getAdditional: (namespaceId: string) =>
    Accessory.findAll({
      where: { namespaceId },
    }),

  getWithParams: ({ page, perPage, sort, order }: QueryParams) => {
    if (sort === 'discount') {
      return Product.findAll({
        where: { category: Categories.Accessories },
        offset: (page - 1) * perPage,
        limit: perPage,
        order: [['year', 'DESC'], ['discount', 'DESC']],
      });
    }

    return Product.findAll({
      where: { category: Categories.Accessories },
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [[sort, order]],
    });
  },

  getRecommended: (accessory: ProductType) => {
    const { itemId, price, capacity, color, ram } = accessory;

    return Product.findAll({
      where: {
        category: Categories.Accessories,
        itemId: { [Op.ne]: itemId },
        price: { [Op.between]: [price * 0.65, price * 1.35] },
        [Op.or]: { capacity, color, ram },
      },
      limit: 12,
    });
  },
};
