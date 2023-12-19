import { Op } from 'sequelize';

import { Phone, Product } from '../bd/models';

import { Product as ProductType } from '../types/Product';
import { QueryParams } from '../types/QueryParams';
import { Categories } from '../types/Categories';

export const phonesService = {
  getPhone: (itemId: string) => Product.findOne({ where: { itemId } }),
  getDetail: (itemId: string) => Phone.findByPk(itemId),

  getAdditional: (namespaceId: string) =>
    Phone.findAll({
      where: { namespaceId },
    }),

  getWithParams: ({ page, perPage, sort, order }: QueryParams) => {
    return Product.findAll({
      where: { category: Categories.Phones },
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [[sort, order]],
    });
  },

  getRecommended: (phone: ProductType) => {
    const { itemId, price, capacity, color, ram } = phone;

    return Product.findAll({
      where: {
        category: Categories.Phones,
        itemId: { [Op.ne]: itemId },
        price: { [Op.between]: [price * 0.65, price * 1.35] },
        [Op.or]: { capacity, color, ram },
      },
      limit: 12,
    });
  },
};
