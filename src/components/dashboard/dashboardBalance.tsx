import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

import { BanknoteArrowUp, BanknoteArrowDown } from 'lucide-react';

export default function DashBoardBalance({ accountBalance } : { accountBalance: string }) {
  return (
    <Card className="min-w-[450px] gap-3">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-12 justify-between items-center">
        <p className="text-3xl font-bold"><span className="mr-1 text-gray-400 font-normal">$</span>{accountBalance}</p>
        <div className="flex gap-2">
          <Button className="btn"><BanknoteArrowDown /> Send</Button>
          <Button className="btn btn--outline"><BanknoteArrowUp /> Request</Button>
        </div>
      </CardContent>
    </Card>
  );
}