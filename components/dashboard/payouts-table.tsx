import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type PayoutRow = {
  id: string;
  amount: string;
  destination: string;
  status: "sent" | "scheduled" | "failed";
  eta: string;
};

const statusColor: Record<PayoutRow["status"], "success" | "default" | "outline"> = {
  sent: "success",
  scheduled: "outline",
  failed: "default",
};

export function PayoutsTable({ rows }: { rows: PayoutRow[] }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold">Payout queue</p>
        <p className="text-sm text-muted-foreground">Monitor automation health and manual overrides.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">ETA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No payouts queued.
              </TableCell>
            </TableRow>
          )}
          {rows.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell>{payout.id}</TableCell>
              <TableCell>{payout.amount}</TableCell>
              <TableCell>{payout.destination}</TableCell>
              <TableCell>
                <Badge variant={statusColor[payout.status]} className="capitalize">
                  {payout.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">{payout.eta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

