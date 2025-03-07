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
  SalesOrder = "sales-order",
  PurchaseOrder = "purchase-order",
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
      title: "User",
      url: "#",
      icon: SquareUser,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "#",
        },
        {
          title: "Wishlist",
          url: "#",
        },
      ],
    },
    {
      title: "Sales",
      url: "#",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Sales Order",
          url: "#",
        },
      ],
    },
    {
      title: "Purchase",
      url: "#",
      icon: ShoppingBag,
      items: [
        {
          title: "Purchase Order",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
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
