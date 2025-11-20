import { TrendingUp, WalletMinimal, Users, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OverviewCardsProps {
  wallet: string;
  referrals: string;
  payouts: string;
  automation: string;
}

export function OverviewCards({ wallet, referrals, payouts, automation }: OverviewCardsProps) {
  const cards = [
    {
      title: "Wallet balance",
      value: wallet,
      change: "+12.4% this week",
      icon: WalletMinimal,
    },
    {
      title: "Referral leads",
      value: referrals,
      change: "+58 qualified",
      icon: Users,
    },
    {
      title: "Pending payouts",
      value: payouts,
      change: "8 requests in queue",
      icon: TrendingUp,
    },
    {
      title: "Automation score",
      value: automation,
      change: "AI suggestions ready",
      icon: Sparkles,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="rounded-3xl border-white/5 bg-gradient-to-br from-white/10 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{card.value}</p>
            <Badge variant="success" className="mt-3">
              {card.change}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

