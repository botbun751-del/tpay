import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { referralSchema } from "@/lib/validators/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const referrals = await prisma.referral.findMany({
    where: { referrerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: referrals });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = referralSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const referral = await prisma.referral.create({
    data: {
      referrerId: session.user.id,
      referredEmail: parsed.data.email,
      notes: parsed.data.message,
      rewardPoints: 50,
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      points: { increment: 50 },
    },
  });

  return NextResponse.json({ data: referral });
}


