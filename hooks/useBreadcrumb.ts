import { Module } from "@/core/utils/sidebarConfig";

export const useBreadcrumb = (module: Module, userId: string, id?: string) => {
  return [
    {
      title: module,
      href: `/my-task/${userId}/${module}`,
    },
    ...(id
      ? [
          {
            title: id,
            href: undefined,
          },
        ]
      : []),
  ];
};
