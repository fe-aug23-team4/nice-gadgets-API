import { Op } from 'sequelize';

import { Accessory, Product } from '../bd/models';

import { Product as ProductType } from '../types/Product';
import { QueryParams } from '../types/QueryParams';
import { Categories } from '../types/Categories';

export const accessoriesService = {
  getDetail: (itemId: string) => Accessory.findByPk(itemId),
  getAccessory: (itemId: string) => Product.findOne({ where: { itemId } }),

  getWithParams: ({ page, perPage, sort, order }: QueryParams) => {
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
