import fs from 'fs';
import path from 'path';
import { Phone } from '../types/Phone';
import { SortBy } from '../types/SortBy';
import { QueryParams } from '../types/QueryParams';

const phonesPath = path.join(__dirname, '../../api', 'phones.json');
const phonesJson = fs.readFileSync(phonesPath, 'utf-8');
const phones: Phone[] = JSON.parse(phonesJson);

export const phonesService = {
  getWithParams: (query: QueryParams) => {
    const { sortBy, phonesNum, page } = query;
    let filteredPhones = [...phones];

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

    if (phonesNum && page) {
      filteredPhones = filteredPhones.slice(
        (Number(page) - 1) * Number(phonesNum),
        Number(phonesNum) * Number(page),
      );
    }

    return filteredPhones;
  },
};
