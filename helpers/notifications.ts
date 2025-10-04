
import toast from "react-hot-toast"

export const notify = {
  wishlist: {
    added: (name: string) => toast.success(`${name} added to wishlist`),
    removed: (name: string) => toast.success(`${name} removed from wishlist`),
  },
  cart: {
    added: (name: string) => toast.success(`${name} added to cart`),
    removed: (name: string) => toast.success(`${name} removed from cart`),
    allAdded: () => toast.success("All wishlist items added to cart"),
  },
  buyNow: (name: string) => toast.success(`${name} ready to buy`),
}
