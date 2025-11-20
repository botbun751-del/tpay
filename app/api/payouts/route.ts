import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { payoutSchema } from "@/lib/validators/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payouts = await prisma.payout.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const payload = payouts.map((payout) => ({
    ...payout,
    amount: Number(payout.amount),
  }));

  return NextResponse.json({ data: payload });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = payoutSchema.safeParse({
    ...body,
    amount: Number(body?.amount),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const payout = await prisma.payout.create({
    data: {
      userId: session.user.id,
      amount: parsed.data.amount,
      destination: parsed.data.destination,
    },
  });

  return NextResponse.json({
    data: {
      ...payout,
      amount: Number(payout.amount),
    },
  });
}

