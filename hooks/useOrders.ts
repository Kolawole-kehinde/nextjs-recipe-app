import { cancelOrder, fetchOrders } from "@/services/orderApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  order_status: "pending" | "processing" | "completed" | "cancelled";
  created_at: string;
  order_items: OrderItem[];
}


export const useOrder = (userId: string | null) => {
    const queryClient = useQueryClient();

    //fetch orders
    const {data: orders = [], isLoading, error} = useQuery<Order[], Error>({
       queryKey: ["orders", userId],
    queryFn: () => fetchOrders(userId!),
    enabled: !!userId
    });


     // Cancel order
  const mutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: (_, orderId) => {
      queryClient.setQueryData<Order[]>(["orders", userId], (oldOrders = []) =>
        oldOrders.map((order) =>
          order.id === orderId ? { ...order, order_status: "cancelled" } : order
        )
      );
      toast.success("Order cancelled");
    },
    onError: () => {
      toast.error("Failed to cancel order");
    },
  });

  return {
    orders,
    loading: isLoading,
    error,
    cancelOrder: mutation.mutateAsync,
  };
  
}