import {
  useQuery,
  useMutation,
  queryCache,
  useInfiniteQuery,
} from 'react-query';
import {
  getProducts,
  getProduct,
  getProductComments,
  createProductComment,
} from './product.service';
import { Product } from './product.type';

export function useProducts() {
  return useInfiniteQuery<Product[], 'products', number>(
    'products',
    (_, page = 1) => getProducts(page, 12),
    {
      getFetchMore: (lastGroup, allGroups) =>
        lastGroup.length === 0 ? false : allGroups.length + 1,
    }
  );
}

export function useProductDetails(productId: number) {
  return useQuery(['product', productId], (_, id) => getProduct(id));
}

export function useProductComments(productId: number) {
  return useQuery(['productComments', productId], (_, id) =>
    getProductComments(id)
  );
}

export function useAddProductComment(productId: number) {
  return useMutation(createProductComment, {
    onSuccess: () => {
      queryCache.refetchQueries(['productComments', productId]);
    },
  });
}
