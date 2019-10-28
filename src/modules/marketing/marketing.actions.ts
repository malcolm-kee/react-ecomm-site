import { ThunkAction } from '../../type';
import * as marketingService from './marketing.service';
import { marketingActions } from './marketing.slice';

export const loadBanners = (): ThunkAction<void> => dispatch =>
  marketingService
    .getBanners()
    .then(banners => dispatch(marketingActions.setBanners(banners)));
