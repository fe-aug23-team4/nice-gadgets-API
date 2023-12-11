import fs from 'fs/promises';
import path from 'path';

import { Phone } from '../types/Phone';

export async function getPhones() {
  const phonesPath = path.resolve('../public/api/phones.json');

  // eslint-disable-next-line no-console
  console.log(path.resolve('../public/api/phones.json'));

  const phonesJson = await fs.readFile(phonesPath, 'utf-8');
  const phones: Phone[] = JSON.parse(phonesJson);

  return phones;
}
