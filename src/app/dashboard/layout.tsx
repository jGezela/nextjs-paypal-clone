import { DashboardSidebar } from "@/components/dashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
 
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="p-5">
      <DashboardSidebar />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}