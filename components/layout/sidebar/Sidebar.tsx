import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";
import { Separator } from "@radix-ui/react-separator";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { breadcrumb } = useBreadcrumb();
  console.log({ breadcrumb });
  return (
    <SidebarProvider className="min-h-[500px]">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.map((crumb, index) => {
                  return (
                    <div className="flex items-center" key={crumb.label}>
                      <BreadcrumbItem key={crumb.label} className="block mr-2">
                        {crumb.href ? (
                          <BreadcrumbLink href={crumb.href}>
                            {crumb.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {breadcrumb.length > 1 &&
                        breadcrumb.length - 1 > index && (
                          <BreadcrumbSeparator className="block" />
                        )}
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sidebar;
