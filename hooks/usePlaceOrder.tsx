
import { placeOrderRequest } from "@/services/orderApi";
import { PlaceOrderPayload } from "@/types/placeOrder";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePlaceOrder = ({ clearCart }: { clearCart: () => void }) => {
  const mutation = useMutation({
    mutationFn: (payload: PlaceOrderPayload) => placeOrderRequest(payload),
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      clearCart();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to place order");
    },
  });

  return {
    placeOrder: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    orderId: mutation.data?.orderId,
  };
};
