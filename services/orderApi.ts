import api from "@/lib/api"

export const fetchOrders = async (userId: string) => {
   const res = await api.get(`/orders?userId=${userId}`);
   return res.data;
};


export const cancelOrder = async(orderId: string) =>{
    const res = await api.get(`/order/${orderId}cancel`);
    return res.data;
};