"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavMain } from "./NavMain";
import { TeamSwitcher } from "./TeamSwitcher";
import { sidebarConfig } from "@/core/utils/sidebarConfig";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="h-auto bg-white relative !border-r-0"
    >
      <SidebarHeader className="bg-[hsl(var(--background))]">
        <TeamSwitcher teams={sidebarConfig.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-[hsl(var(--background))]">
        <NavMain items={sidebarConfig.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
