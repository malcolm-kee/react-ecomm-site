import { action, computed, decorate, observable, runInAction } from 'mobx';
import * as marketingService from './marketing.service';

export class MarketingStore {
  banners = [];

  get noBanner() {
    return this.banners.length === 0;
  }

  loadBanners = async () => {
    if (this.noBanner) {
      const banners = await marketingService.getBanners();
      runInAction('setBanners', () => {
        this.banners = banners;
      });
    }
  };
}

decorate(MarketingStore, {
  banners: observable.shallow,
  noBanner: computed,
  loadBanners: action
});
