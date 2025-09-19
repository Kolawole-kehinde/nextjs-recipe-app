import { CreditCard, Heart, HelpCircle, Home, MapPin, ShoppingBag, Star, User } from "lucide-react";

export const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: ShoppingBag, label: "My Orders", href: "/orders" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: MapPin, label: "Addresses", href: "/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/payment-methods" },
  { icon: Star, label: "Reviews", href: "/reviews" },
  { icon: User, label: "Account", href: "/account" },
  { icon: HelpCircle, label: "Help & Support", href: "/support" },
]
