/* eslint-disable @typescript-eslint/no-var-requires */
const env = require('dotenv');
const { calcDiscount } = require('./calcDiscount');

env.config();

module.exports = {
  createImgPath(product) {
    if ('image' in product) {
      return {
        ...product,
        image: `${process.env.SERVER_PATH}/${product.image}`,
        discount: calcDiscount(product.fullPrice, product.price),
      };
    }

    if ('images' in product) {
      return {
        ...product,
        images: product.images.map(
          (image) => `${process.env.SERVER_PATH}/${image}`,
        ),
        description: JSON.stringify(product.description),
      };
    }
  },
};
