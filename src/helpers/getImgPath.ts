import { PhoneDetails } from '../types/PhoneDetails';
import { Phone } from '../types/Phone';
import env from 'dotenv';

env.config();

export function getImgPath(phone: PhoneDetails | Phone) {
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
