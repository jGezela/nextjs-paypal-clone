import { DashboardSidebar } from "@/components/dashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
 
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}