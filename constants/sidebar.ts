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
  { name: "My Orders", href: "/dashboard/orders", icon: Package },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Reviews", href: "/dashboard/reviews", icon: Star },
  { name: "Help & Support", href: "/faq", icon: HelpCircle },

  {
    name: "Account",
    icon: User,
    children: [
      { name: "Profile", href: "/dashboard/profile", icon: User },
      { name: "Settings", href: "/dashboard/account-settings", icon: User },
      { name: "Logout", href: "/logout", icon: LogOut },
    ],
  },

  
];
