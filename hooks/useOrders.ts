import { cancelOrder, fetchOrders } from "@/services/orderApi"
import useStore from "@/store/useStore"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export function useOrder() {
  const user = useStore((state) => state.user)
  const queryClient = useQueryClient()

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: fetchOrders,
    enabled: !!user,
  })

  const { mutate: cancel, isPending: isCancelling } = useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: () => {
      toast.success("Order cancelled successfully")
      queryClient.invalidateQueries({ queryKey: ["orders", user?.id] })
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to cancel order")
    },
  })

  return {
    user,
    orders,
    isLoading,
    isError,
    error,
    cancel,
    isCancelling,
  }
}
