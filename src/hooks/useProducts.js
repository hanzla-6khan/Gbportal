import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsAPI } from '../services/api';

export const useProducts = (params = {}) => {
  const queryClient = useQueryClient();

  // Get all products
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', params],
    queryFn: () => productsAPI.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get product by ID
  const useProduct = (id) => {
    return useQuery({
      queryKey: ['products', id],
      queryFn: () => productsAPI.getById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get products by seller
  const useProductsBySeller = (sellerId) => {
    return useQuery({
      queryKey: ['products', 'seller', sellerId],
      queryFn: () => productsAPI.getBySeller(sellerId),
      enabled: !!sellerId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: productsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }) => productsAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['products', id]);
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: productsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const createProduct = (productData) => createProductMutation.mutate(productData);
  const updateProduct = (id, data) => updateProductMutation.mutate({ id, data });
  const deleteProduct = (id) => deleteProductMutation.mutate(id);

  return {
    products: products?.data || [],
    isLoading,
    error,
    useProduct,
    useProductsBySeller,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating: createProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
    isDeleting: deleteProductMutation.isPending,
    createError: createProductMutation.error,
    updateError: updateProductMutation.error,
    deleteError: deleteProductMutation.error,
  };
}; 