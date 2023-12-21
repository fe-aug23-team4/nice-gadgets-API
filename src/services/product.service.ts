import { Product } from '../bd/models';

import { fetchAndShuffleProducts } from '../helpers/fetchAndShuffleProducts';
import { Categories } from '../types/Categories';

export const productsService = {
  getAmount: async(category: Categories) => {
    switch (category) {
      case Categories.All:
        return {
          phones: await Product.count({
            where: { category: Categories.Phones },
          }),
          tablets: await Product.count({
            where: { category: Categories.Tablets },
          }),
          accessories: await Product.count({
            where: { category: Categories.Accessories },
          }),
        };

      default:
        return {
          [category]: await Product.count({ where: { category } }),
        };
    }
  },

  getNew: () => fetchAndShuffleProducts('year'),
  getDiscount: () => fetchAndShuffleProducts('discount'),
};
