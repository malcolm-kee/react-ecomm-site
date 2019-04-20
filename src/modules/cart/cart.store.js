import { action, computed, decorate, observable } from 'mobx';
import { formatMoney } from 'accounting';

/**
 * Cart MobX Store
 */
export class CartStore {
  constructor(productStore) {
    this.productStore = productStore;
    this.items = [];
  }

  get totalItemCount() {
    return this.items.length;
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  get totalPrice() {
    return formatMoney(
      this.items.reduce((total, item) => total + item.totalPriceValue, 0),
      ''
    );
  }

  getItemByProductId = productId =>
    this.items.find(item => item.productId === productId);

  addItem = productId => {
    const item = this.getItemByProductId(productId);

    if (item) {
      item.incrementQty();
    } else {
      this.items.push(new CartItem(this.productStore, productId));
    }
  };

  removeItem = item => {
    this.items.remove(item);
  };

  clearCart = () => {
    this.items.clear();
  };
}

decorate(CartStore, {
  items: observable,
  totalItemCount: computed,
  isEmpty: computed,
  addItem: action,
  removeItem: action,
  incrementItemQty: action,
  decrementItemQty: action,
  clearCart: action
});

class CartItem {
  productStore = null;
  productId = null;
  qty = 0;

  constructor(productStore, productId, qty = 1) {
    this.productStore = productStore;
    this.qty = qty;
    this.productId = productId;
  }

  get canDecrement() {
    return this.qty > 1;
  }

  get product() {
    return this.productStore.getProduct(this.productId);
  }

  get totalPriceValue() {
    if (this.product && this.product.price) {
      return Number(this.product.price) * this.qty;
    }
    return 0;
  }

  get totalPrice() {
    if (this.product && this.product.price) {
      return formatMoney(this.totalPriceValue, '');
    }
    return '';
  }

  incrementQty = () => {
    this.qty++;
  };

  decrementQty = () => {
    if (this.canDecrement) {
      this.qty--;
    }
  };
}

decorate(CartItem, {
  productId: observable,
  product: computed,
  qty: observable,
  canDecrement: computed,
  totalPriceValue: computed,
  totalPrice: computed,
  incrementQty: action,
  decrementQty: action
});
