import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { OverviewCards, ReferralsTable, PayoutsTable } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const [user, referrals, payouts] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        walletBalance: true,
        points: true,
        referralCode: true,
      },
    }),
    prisma.referral.findMany({
      where: { referrerId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.payout.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  if (!user) {
    redirect("/signin");
  }

  const referralRows = referrals.map((referral) => ({
    id: referral.id,
    name: referral.referredEmail.split("@")[0],
    email: referral.referredEmail,
    status: referral.status.toLowerCase() as "approved" | "pending" | "rejected",
    points: referral.rewardPoints,
    date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(referral.createdAt),
  }));

  const payoutRows = payouts.map((payout) => {
    const amount = Number(payout.amount);
    const normalizedStatus =
      payout.status === "PENDING"
        ? "scheduled"
        : payout.status === "SENT"
          ? "sent"
          : "failed";
    return {
      id: payout.id,
      amount: `$${amount.toFixed(2)}`,
      destination: payout.destination,
      status: normalizedStatus as "sent" | "scheduled" | "failed",
      eta: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(payout.updatedAt),
    };
  });

  const pendingPayoutTotal = payouts
    .filter((payout) => payout.status === "PENDING")
    .reduce((sum, payout) => sum + Number(payout.amount), 0);

  const overviewMetrics = {
    wallet: `$${(user?.walletBalance ? Number(user.walletBalance) : 0).toFixed(2)}`,
    referrals: `${referrals.length}`,
    payouts: `$${pendingPayoutTotal.toFixed(2)}`,
    automation: `${Math.min(100, 70 + (user?.points ?? 0) / 10).toFixed(0)}/100`,
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-muted-foreground">Welcome back</p>
        <h1 className="text-3xl font-semibold">{user?.name ?? "Growth Lead"}</h1>
      </div>
      <OverviewCards {...overviewMetrics} />
      <Tabs defaultValue="pipelines">
        <TabsList>
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="pipelines" className="space-y-8">
          <ReferralsTable rows={referralRows} />
          <PayoutsTable rows={payoutRows} />
        </TabsContent>
        <TabsContent value="wallet">
          <Card className="rounded-3xl border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle>Wallet overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your wallet balance powers same-day payouts. Top up or withdraw anytime.
              </p>
              <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-center">
                <p className="text-sm uppercase tracking-wide text-muted-foreground">Balance</p>
                <p className="text-4xl font-semibold">
                  ${user?.walletBalance ? Number(user.walletBalance).toFixed(2) : "0.00"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights">
          <Card className="rounded-3xl border-white/5">
            <CardHeader>
              <CardTitle>AI insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Approve 3 pending payouts to keep SLA under 15 minutes.</p>
              <p>• Invite 5 more advocates using your code {user?.referralCode} for a 10% booster.</p>
              <p>• Create a goal to convert APAC referrals where win rate is 34%.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

