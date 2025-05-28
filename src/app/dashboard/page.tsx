import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <section className="flex items-center gap-3">
      <SidebarTrigger />
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </section>
  );
}