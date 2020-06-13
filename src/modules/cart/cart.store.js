import { action, computed, decorate, observable } from 'mobx';
import { formatMoney } from 'accounting';
import { isNumber } from '../../lib/is';

/**
 * Cart MobX Store
 */
export class CartStore {
  constructor() {
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

  getItemByProduct = (product) =>
    this.items.find((item) => item.product._id === product._id);

  addItem = (product, qty) => {
    const item = this.getItemByProduct(product);

    if (item) {
      item.incrementQty(qty);
    } else {
      this.items.push(new CartItem(product, qty));
    }
  };

  removeItem = (item) => {
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
  clearCart: action,
});

class CartItem {
  product = null;
  qty = 0;

  constructor(product, qty = 1) {
    this.qty = qty;
    this.product = product;
  }

  get canDecrement() {
    return this.qty > 1;
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

  incrementQty = (amount) => {
    if (isNumber(amount)) {
      this.qty += amount;
    } else {
      this.qty += 1;
    }
  };

  decrementQty = () => {
    if (this.canDecrement) {
      this.qty--;
    }
  };
}

decorate(CartItem, {
  product: observable,
  qty: observable,
  canDecrement: computed,
  totalPriceValue: computed,
  totalPrice: computed,
  incrementQty: action,
  decrementQty: action,
});
