import { Phone } from '../types/Phone';
import { SortBy } from '../types/SortBy';
import { QueryParams } from '../types/QueryParams';

import { getImgPath } from '../helpers/getImgPath';
import { calcDiscount } from '../helpers/calcDiscount';
import { getPhones } from '../helpers/getPhones';
import { getPhoneDetail } from '../helpers/getPhoneDetail';

export const phonesService = {
  getPhone: async(phoneId: string) => {
    const phones = await getPhones();

    return phones.find((phone) => phone.phoneId === phoneId);
  },

  getWithParams: async(query: QueryParams) => {
    const { sortBy, perPage, page } = query;
    let filteredPhones = await getPhones();

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

  getNew: async() => {
    const phones = await getPhones();
    const sortedPhones = phones.sort((a, b) => b.year - a.year);

    return sortedPhones.slice(0, 8).map((phone) => getImgPath(phone));
  },

  getDiscount: async() => {
    const phones = await getPhones();
    const sortedPhones = phones.sort(
      (a, b) =>
        calcDiscount(a.fullPrice, a.price) - calcDiscount(b.fullPrice, b.price),
    );

    return sortedPhones.slice(0, 8).map((phone) => getImgPath(phone));
  },

  getDetail: async(id: string) => {
    const phoneDetail = await getPhoneDetail(id);

    return getImgPath(phoneDetail);
  },

  getRecommended: async(phone: Phone) => {
    const { phoneId, price, capacity, color, ram } = phone;
    const phones = await getPhones();
    const higherPrice = price * 1.35;
    const lowerPrice = price * 0.65;

    const recommendedPhones = phones.filter(
      (p) =>
        p.phoneId !== phoneId
        && (p.capacity === capacity || p.color === color || p.ram === ram)
        && p.price >= lowerPrice
        && p.price <= higherPrice,
    );

    return recommendedPhones.slice(0, 8).map((p) => getImgPath(p));
  },
};
