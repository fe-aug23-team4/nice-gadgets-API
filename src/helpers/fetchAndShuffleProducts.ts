import { Product } from '../bd/models';
import { Categories } from '../types/Categories';

export const fetchAndShuffleProducts = async(orderField: string) => {
  const categories = Object.values(Categories).filter(
    (category) => category !== Categories.All,
  );
  let products: Product[] = [];

  for (const category of categories) {
    const fetchedProducts = await Product.findAll({
      where: { category },
      order: [[orderField, 'desc']],
      limit: 4,
    });

    products = [...products, ...fetchedProducts];
  }

  // Fisher-Yates (aka Knuth) Shuffle
  let currentIndex = products.length;
  let temporaryValue: Product;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = products[currentIndex];
    products[currentIndex] = products[randomIndex];
    products[randomIndex] = temporaryValue;
  }

  return products;
};
