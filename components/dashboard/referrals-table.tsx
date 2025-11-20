import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type ReferralRow = {
  id: string;
  name: string;
  email: string;
  status: "approved" | "pending" | "rejected";
  points: number;
  date: string;
};

const statusColor: Record<ReferralRow["status"], "success" | "outline" | "default"> = {
  approved: "success",
  pending: "outline",
  rejected: "default",
};

export function ReferralsTable({ rows }: { rows: ReferralRow[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Referral pipeline</p>
          <p className="text-sm text-muted-foreground">Track every advocate and reward opportunity.</p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Points</TableHead>
            <TableHead className="text-right">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No referrals yet. Share your referral link to get started.
              </TableCell>
            </TableRow>
          )}
          {rows.map((referral) => (
            <TableRow key={referral.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{referral.name}</p>
                  <p className="text-xs text-muted-foreground">{referral.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={statusColor[referral.status]} className="capitalize">
                  {referral.status}
                </Badge>
              </TableCell>
              <TableCell>{referral.points}</TableCell>
              <TableCell className="text-right text-muted-foreground">{referral.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

