import { ajax } from '../../lib/ajax';

const BANNER_BASE_URL = 'https://ecomm-db.herokuapp.com/banners';

export function getBanners() {
  return ajax({
    url: BANNER_BASE_URL
  });
}
