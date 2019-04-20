import { action, decorate, observable, runInAction } from 'mobx';
import * as productService from './product.service';

export class ProductStore {
  products = [];
  productComments = new Map();
  currentPage = 0;
  hasMore = true;
  loadingProducts = false;

  getProduct = productId =>
    this.products.find(product => product.id === productId);

  getProductComments = productId => this.productComments.get(productId) || [];

  loadProducts = async () => {
    this.loadingProducts = true;
    const nextPage = this.currentPage + 1;
    const products = await productService.getProducts(nextPage);
    runInAction('addProducts', () => {
      this.currentPage = nextPage;
      this.hasMore = products.length !== 0;
      products.forEach(product => {
        this.products.push(product);
      });
      this.loadingProducts = false;
    });
  };

  loadProductDetail = async productId => {
    const productIsLoaded =
      this.products.findIndex(product => product.id === productId) !== -1;
    if (productIsLoaded) {
      return;
    }

    const product = await productService.getProduct(productId);

    runInAction('setProductDetails', () => {
      const productIndex = this.products.findIndex(
        item => item.id === product.id
      );
      if (productIndex === -1) {
        this.products.push(product);
      } else {
        this.products[productIndex] = product;
      }
    });
  };

  loadProductComments = async productId => {
    if (this.productComments.get(productId) !== undefined) {
      return;
    }

    const comments = await productService.getProductComments(productId);

    runInAction('setProductComments', () => {
      this.productComments.set(productId, comments);
    });
  };

  createProductComment = async comment => {
    const returnedComment = await productService.createProductComment(comment);
    runInAction('addProductComment', () => {
      const productId = returnedComment.productId;
      const currentComments = this.getProductComments(productId);
      this.productComments.set(
        productId,
        currentComments.concat(returnedComment)
      );
    });
  };
}

decorate(ProductStore, {
  products: observable.shallow,
  productComments: observable,
  currentPage: observable,
  hasMore: observable,
  loadingProducts: observable,
  loadProducts: action,
  loadProductDetail: action,
  loadProductComments: action
});
