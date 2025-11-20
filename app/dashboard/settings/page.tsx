import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      image: true,
      email: true,
      referralCode: true,
      createdAt: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="rounded-3xl border-white/5">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update contact info used across your teams.</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm defaultValues={{ name: user.name ?? "", image: user.image ?? "" }} />
        </CardContent>
      </Card>
      <Card className="rounded-3xl border-white/5">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>MFA, OAuth, and device settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>Email: {user.email}</p>
          <p>Role: <Badge variant="outline">{user.role}</Badge></p>
          <p>Member since: {user.createdAt.toDateString()}</p>
          <p>
            Referral code: <span className="font-semibold text-foreground">{user.referralCode}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


