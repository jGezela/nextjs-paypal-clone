import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";
import Link from "next/link";

export default function DashBoardBalance({
  accountBalance,
}: {
  accountBalance: string;
}) {
  return (
    <Card className="min-w-[450px] gap-3">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-12 justify-between items-center">
        <p className="text-3xl font-bold">
          <span className="mr-1 text-gray-400 font-normal">$</span>
          {accountBalance}
        </p>
        <div className="flex gap-2">
          <Link href="/dashboard/send-money">
            <Button className="btn">
              <BanknoteArrowDown />
              Send
            </Button>
          </Link>
          <Button className="btn btn--outline">
            <BanknoteArrowUp />
            Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
