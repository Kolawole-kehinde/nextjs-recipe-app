import { CreditCard, Heart, HelpCircle, Home, MapPin, Package, Star, User } from "lucide-react";
export const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "My Orders", href: "/orders", icon: Package },
  { name: "Favorites", href: "/favorite", icon: Heart },
  { name: "Addresses", href: "/addresses", icon: MapPin },
  { name: "Payment Methods", href: "/payment-methods", icon: CreditCard },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Account", href: "/account", icon: User },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
]