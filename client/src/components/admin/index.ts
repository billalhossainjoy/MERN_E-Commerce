import { ShoppingBasket, Tag } from "lucide-react";

export const adminSidebarMenuItems = [
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: Tag,
  },
];
