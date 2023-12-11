import { PhoneDetail } from '../types/PhoneDetail';
import { Phone } from '../types/Phone';
import env from 'dotenv';

env.config();

export function getImgPath(phone: PhoneDetail | Phone) {
  if ('image' in phone) {
    return {
      ...phone,
      image: `${process.env.SERVER_PATH}/${phone.image}`,
    };
  }

  if ('images' in phone) {
    return {
      ...phone,
      images: phone.images.map(
        (image) => `${process.env.SERVER_PATH}/${image}`,
      ),
    };
  }
}
