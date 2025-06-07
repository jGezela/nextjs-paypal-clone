"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { addBalanceAction } from "@/lib/actions/addBalanceAction";

import { HandCoins, BanknoteArrowDown } from "lucide-react";

export default function DashBoardBalance({
  accountBalance,
}: {
  accountBalance: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function onAddBalanceClick() {
    setIsPending(true);
    const res = await addBalanceAction();
    if (res.success) {
      toast("Money was added to your balance!");
      setIsPending(false);
      router.refresh();
    } else {
      setIsPending(false);
      toast.error(res.error, {
        classNames: {
          toast: "!bg-destructive !text-white !border-0",
        },
      });
    }
  }

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-12 justify-between items-center flex-wrap">
        <p className="text-3xl font-bold">
          <span className="mr-1 text-gray-400 font-normal">$</span>
          {accountBalance}
        </p>
        <div className="flex gap-2">
          <Button
            className="btn"
            onClick={() => onAddBalanceClick()}
            disabled={isPending}
          >
            <HandCoins />
            Add balance
          </Button>
          <Link href="/dashboard/send-money">
            <Button className="btn btn--outline">
              <BanknoteArrowDown />
              Send
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
