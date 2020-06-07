import {
  queryCache,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from 'react-query';
import {
  createProductComment,
  getProduct,
  getProductComments,
  getProducts,
} from './product.service';
import { Product } from './product.type';

export function useProducts(initialProducts?: Product[]) {
  return useInfiniteQuery<Product[], 'products', number>(
    'products',
    (_, page = 1) => getProducts(page, 12),
    {
      initialData: initialProducts ? [initialProducts] : undefined,
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
      queryCache.refetchQueries(['productComments', productId], {
        force: true,
      });
    },
  });
}
