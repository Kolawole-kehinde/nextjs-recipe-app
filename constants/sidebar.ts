import {
  CreditCard,
  Heart,
  HelpCircle,
  Home,
  MapPin,
  Package,
  Star,
  User,
  LogOut,
} from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Orders", href: "/orders", icon: Package },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Help & Support", href: "/faq", icon: HelpCircle },

  {
    name: "Account",
    icon: User,
    children: [
      { name: "Profile", href: "/profile", icon: User },
      { name: "Settings", href: "/account-settings", icon: User },
      { name: "Logout", href: "/logout", icon: LogOut },
    ],
  },

  
];
