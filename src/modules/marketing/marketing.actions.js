import { marketingActions } from './marketing.slice';
import * as marketingService from './marketing.service';

export const loadBanners = () => dispatch =>
  marketingService
    .getBanners()
    .then(banners => dispatch(marketingActions.setBanners(banners)));
