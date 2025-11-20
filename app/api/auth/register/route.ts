import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators/auth";
import { hashPassword } from "@/utils/password";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const referralCode = `TPAY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash,
      referralCode,
    },
  });

  return NextResponse.json({ data: { id: user.id } }, { status: 201 });
}


