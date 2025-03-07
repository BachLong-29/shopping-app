import {
  AudioWaveform,
  BadgeDollarSign,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  ShoppingBag,
  SquareUser,
} from "lucide-react";

export enum Module {
  Profile = "profile",
  Product = "product",
  Category = "category",
  Wishlist = "wishlist",
  SalesOrder = "sales_order",
  PurchaseOrder = "purchase_order",
  Settings = "settings",
}

export const sidebarConfig = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "module.user",
      url: "#",
      icon: SquareUser,
      isActive: true,
      items: [
        {
          title: "module.profile",
          url: "/profile",
          key: Module.Profile,
        },
        {
          title: "module.wishlist",
          url: "/wishlist",
          key: Module.Wishlist,
        },
        {
          title: "module.settings",
          url: "/settings",
          key: Module.Settings,
        },
      ],
    },
    {
      title: "module.sales",
      url: "#",
      icon: BadgeDollarSign,
      isActive: true,
      items: [
        {
          title: "module.product",
          url: "/product",
          key: Module.Product,
        },
        {
          title: "module.category",
          url: "/category",
          key: Module.Category,
        },
        {
          title: "module.sales_order",
          url: "/sales-order",
          key: "sales-order",
        },
      ],
    },
    {
      title: "module.purchase",
      url: "#",
      icon: ShoppingBag,
      isActive: true,
      items: [
        {
          title: "module.purchase_order",
          url: "/purchase-order",
          key: "purchase-order",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
