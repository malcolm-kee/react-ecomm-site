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

export function useProducts(initialProducts?: Product[]) {
  return useInfiniteQuery<Product[], 'products', string>(
    'products',
    (_, before = '') => getProducts({ before }),
    {
      initialData: initialProducts ? [initialProducts] : undefined,
      getFetchMore: (lastGroup) =>
        lastGroup.length === 0
          ? false
          : lastGroup && lastGroup[lastGroup.length - 1].createdAt,
    }
  );
}

export function useProductDetails(productId: string, initialData?: Product) {
  return useQuery(['product', productId], (_, id) => getProduct(id), {
    initialData,
  });
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
