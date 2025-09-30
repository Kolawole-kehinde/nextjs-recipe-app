import { placeOrderRequest } from "@/services/orderApi";
import { PlaceOrderPayload } from "@/types/placeOrder";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePlaceOrder = ({ clearCart }: { clearCart: () => void }) => {
  const { mutate: placeOrder, isPending, isSuccess, data } = useMutation({
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
    placeOrder,
    isPending,
    isSuccess,
    orderId: data?.order?.id ?? null,
  };
};
