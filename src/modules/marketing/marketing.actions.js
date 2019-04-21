import * as actionKeys from './marketing.action-keys';
import * as marketingService from './marketing.service';

export const setBanners = banners => ({
  type: actionKeys.Set_Banners,
  payload: banners
});

export const loadBanners = () => dispatch =>
  marketingService.getBanners().then(banners => dispatch(setBanners(banners)));
