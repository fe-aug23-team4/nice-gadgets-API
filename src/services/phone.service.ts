import fs from 'fs';
import path from 'path';
import { Phone } from '../types/Phone';
import { SortBy } from '../types/SortBy';
import { QueryParams } from '../types/QueryParams';
import { getImgPath } from '../helpers/getImgPath';
import { calcDiscount } from '../helpers/calcDiscount';

const phonesPath = path.join(__dirname, '../../public/api', 'phones.json');
const phonesJson = fs.readFileSync(phonesPath, 'utf-8');
const phones: Phone[] = JSON.parse(phonesJson);

export const phonesService = {
  getWithParams: (query: QueryParams) => {
    const { sortBy, perPage, page } = query;
    let filteredPhones = [...phones];

    if (sortBy) {
      switch (sortBy) {
        case SortBy.Highest:
          filteredPhones = filteredPhones.sort((a, b) => b.price - a.price);
          break;

        case SortBy.Lowest:
          filteredPhones = filteredPhones.sort((a, b) => a.price - b.price);
          break;

        case SortBy.Newest:
          filteredPhones = filteredPhones.sort((a, b) => b.year - a.year);
          break;

        case SortBy.Oldest:
          filteredPhones = filteredPhones.sort((a, b) => a.year - b.year);
          break;

        default:
          filteredPhones = [];
          break;
      }
    }

    if (perPage && page) {
      filteredPhones = filteredPhones.slice(
        (Number(page) - 1) * Number(perPage),
        Number(perPage) * Number(page),
      );
    }

    return filteredPhones.map((phone) => getImgPath(phone));
  },

  getNew: () => {
    const sortedPhones = [...phones].sort((a, b) => b.year - a.year);

    return sortedPhones.slice(0, 8).map((phone) => getImgPath(phone));
  },

  getDiscount: () => {
    const sortedPhones = [...phones].sort(
      (a, b) =>
        calcDiscount(a.fullPrice, a.price) - calcDiscount(b.fullPrice, b.price),
    );

    return sortedPhones.slice(0, 8).map((phone) => getImgPath(phone));
  },
};
