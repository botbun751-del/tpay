import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReferralForm } from "@/components";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReferralsTable } from "@/components";

export default async function ReferralsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const referrals = await prisma.referral.findMany({
    where: { referrerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const rows = referrals.map((ref) => ({
    id: ref.id,
    name: ref.referredEmail.split("@")[0],
    email: ref.referredEmail,
    status: ref.status.toLowerCase() as "approved" | "pending" | "rejected",
    points: ref.rewardPoints,
    date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(ref.createdAt),
  }));

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="rounded-3xl border-white/5 xl:col-span-2">
        <CardHeader>
          <CardTitle>My referrals</CardTitle>
          <CardDescription>Track performance and next actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReferralsTable rows={rows} />
        </CardContent>
      </Card>
      <Card className="rounded-3xl border-white/5">
        <CardHeader className="space-y-3">
          <CardTitle>Share your link</CardTitle>
          <p className="text-sm text-muted-foreground">
            Every approved referral earns instant wallet points.
          </p>
          <Badge variant="outline" className="w-full justify-center">
            {session.user.referralCode ?? "PENDING-CODE"}
          </Badge>
        </CardHeader>
        <CardContent>
          <ReferralForm />
        </CardContent>
      </Card>
    </div>
  );
}

