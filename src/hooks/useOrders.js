import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersAPI } from '../services/api';

export const useOrders = (params = {}) => {
  const queryClient = useQueryClient();

  // Get all orders
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', params],
    queryFn: () => ordersAPI.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get order by ID
  const useOrder = (id) => {
    return useQuery({
      queryKey: ['orders', id],
      queryFn: () => ordersAPI.getById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: ordersAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
  });

  // Update order mutation
  const updateOrderMutation = useMutation({
    mutationFn: ({ id, data }) => ordersAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['orders', id]);
    },
  });

  // Delete order mutation
  const deleteOrderMutation = useMutation({
    mutationFn: ordersAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
  });

  const createOrder = (orderData) => createOrderMutation.mutate(orderData);
  const updateOrder = (id, data) => updateOrderMutation.mutate({ id, data });
  const deleteOrder = (id) => deleteOrderMutation.mutate(id);

  return {
    orders: orders?.data || [],
    isLoading,
    error,
    useOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    isCreating: createOrderMutation.isPending,
    isUpdating: updateOrderMutation.isPending,
    isDeleting: deleteOrderMutation.isPending,
    createError: createOrderMutation.error,
    updateError: updateOrderMutation.error,
    deleteError: deleteOrderMutation.error,
  };
}; 