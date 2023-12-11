import fs from 'fs';
import path from 'path';

import { Phone } from '../types/Phone';

export function getPhones() {
  const phonesPath = path.join(__dirname, '../../public/api', 'phones.json');
  const phonesJson = fs.readFileSync(phonesPath, 'utf-8');
  const phones: Phone[] = JSON.parse(phonesJson);

  return phones;
}
