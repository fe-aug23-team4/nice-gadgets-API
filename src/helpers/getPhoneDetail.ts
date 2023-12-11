import fs from 'fs/promises';
import path from 'path';

import { PhoneDetail } from '../types/PhoneDetail';

export async function getPhoneDetail(id: string) {
  const phonesDetailPath = path.resolve('../public/api/phones', `${id}.json`);
  const phonesDetailJson = await fs.readFile(phonesDetailPath, 'utf-8');
  const phonesDetail: PhoneDetail = JSON.parse(phonesDetailJson);

  return phonesDetail;
}
