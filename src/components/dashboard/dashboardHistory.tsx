import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountHistory, columnsHistory } from "@/lib/tables/historyColumns";

export default function DashBoardHistory({
  accountHistory,
}: {
  accountHistory: AccountHistory[];
}) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columnsHistory} data={accountHistory} />
      </CardContent>
    </Card>
  );
}
