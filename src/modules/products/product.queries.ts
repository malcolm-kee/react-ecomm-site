import {
  queryCache,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from 'react-query';
import {
  createProductComment,
  getProduct,
  getProducts,
} from './product.service';
import { Product } from './product.type';

export function useProducts() {
  return useInfiniteQuery<Product[], 'products', string>(
    'products',
    (_, before = '') => getProducts({ before }),
    {
      onSuccess: (productGroup) => {
        const lastGroup = productGroup[productGroup.length - 1];
        lastGroup.forEach((product) => {
          queryCache.setQueryData(['product', product._id], product);
        });
      },
      getFetchMore: (lastGroup) =>
        lastGroup.length === 0
          ? false
          : lastGroup && lastGroup[lastGroup.length - 1].createdAt,
    }
  );
}

export function useProductDetails(productId: string) {
  return useQuery(['product', productId], (_, id) => getProduct(id));
}

export function useAddProductComment(productId: string) {
  return useMutation(
    (data: Parameters<typeof createProductComment>[1]) =>
      createProductComment(productId, data),
    {
      onSuccess: () => {
        queryCache.refetchQueries(['product', productId], {
          force: true,
        });
      },
    }
  );
}
