import {
  useQueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  createProductComment,
  getProduct,
  getProducts,
} from './product.service';

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam: before }: { pageParam?: string }) =>
      getProducts({ before }),
    getNextPageParam: (lastPage) =>
      lastPage.length === 0
        ? undefined
        : lastPage[lastPage.length - 1].createdAt,
  });
}

export function useProductDetails(productId: string) {
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
  });
}

export function useAddProductComment(productId: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Parameters<typeof createProductComment>[1]) =>
      createProductComment(productId, data),
    {
      onSuccess: () => queryClient.invalidateQueries(['product', productId]),
    }
  );
}
