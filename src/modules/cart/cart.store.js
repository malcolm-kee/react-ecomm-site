import { action, computed, decorate, observable } from 'mobx';
import { formatMoney } from 'accounting';

/**
 * Cart MobX Store
 */
export class CartStore {
  items = [];

  get totalItemCount() {
    return this.items.length;
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  getItemByProduct = product =>
    this.items.find(item => item.product.id === product.id);

  addItem = product => {
    const item = this.getItemByProduct(product);
    if (item) {
      item.incrementQty();
    } else {
      this.items.push(new CartItem(product));
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
  product = null;
  qty = 0;

  constructor(product, qty = 1) {
    this.product = product;
    this.qty = qty;
  }

  get canDecrement() {
    return this.qty > 1;
  }

  get totalPrice() {
    if (this.product && this.product.price) {
      return formatMoney(Number(this.product.price) * this.qty, '');
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
  product: observable.shallow,
  qty: observable,
  canDecrement: computed,
  totalPrice: computed,
  incrementQty: action,
  decrementQty: action
});
