import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Landmark, BanknoteArrowDown, ScrollText } from "lucide-react";
import SidebarUser from "./sidebarUser";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Landmark,
  },
  {
    title: "Send money",
    url: "/dashboard/send-money",
    icon: BanknoteArrowDown,
  },
  {
    title: "Account history",
    url: "/dashboard/account-history",
    icon: ScrollText,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="px-3 pb-3">
      <SidebarHeader>
        <Image
          src="/images/paypal-logo.svg"
          width={140}
          height={40}
          alt="PayPal logo"
          className="mt-3 ml-2"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="mt-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
