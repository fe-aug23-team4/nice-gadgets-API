import { Op } from 'sequelize';

import { Product, Tablet } from '../bd/models';

import { Product as ProductType } from '../types/Product';
import { QueryParams } from '../types/QueryParams';
import { Categories } from '../types/Categories';

export const tabletsService = {
  getDetail: (itemId: string) => Tablet.findByPk(itemId),
  getTablet: (itemId: string) => Product.findOne({ where: { itemId } }),

  getWithParams: ({ page, perPage, sort, order }: QueryParams) => {
    return Product.findAll({
      where: { category: Categories.Tablets },
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [[sort, order]],
    });
  },

  getRecommended: (tablet: ProductType) => {
    const { itemId, price, capacity, color, ram } = tablet;

    return Product.findAll({
      where: {
        category: Categories.Tablets,
        itemId: { [Op.ne]: itemId },
        price: { [Op.between]: [price * 0.65, price * 1.35] },
        [Op.or]: { capacity, color, ram },
      },
      limit: 12,
    });
  },
};
