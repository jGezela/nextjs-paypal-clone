"use client"

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <section>
      <Button onClick={() => signOut()}>Sign out</Button>   
    </section>
  );
}