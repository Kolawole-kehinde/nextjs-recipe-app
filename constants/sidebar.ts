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
  { name: "Favorites", href: "/favorite", icon: Heart },
  { name: "Reviews", href: "/reviews", icon: Star },

  {
    name: "Account",
    icon: User,
    children: [
      { name: "Profile", href: "/account/profile", icon: User },
      { name: "Logout", href: "/logout", icon: LogOut },
    ],
  },

  // { name: "Help & Support", href: "/help", icon: HelpCircle },
];
