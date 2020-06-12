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

export function useProducts() {
  return useInfiniteQuery(
    'products',
    (_, before = '') => getProducts({ before }),
    {
      getFetchMore: (lastGroup) =>
        lastGroup.length === 0
          ? false
          : lastGroup && lastGroup[lastGroup.length - 1].createdAt,
    }
  );
}

export function useProductDetails(productId) {
  return useQuery(['product', productId], (_, id) => getProduct(id));
}

export function useAddProductComment(productId) {
  return useMutation((data) => createProductComment(productId, data), {
    onSuccess: () => {
      queryCache.refetchQueries(['product', productId], {
        force: true,
      });
    },
  });
}
