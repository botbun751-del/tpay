import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validators/auth";
import { hashPassword } from "@/utils/password";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = resetPasswordSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const tokenRecord = await prisma.passwordResetToken.findUnique({
    where: { token: parsed.data.token },
  });

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.delete({ where: { token: parsed.data.token } }),
  ]);

  return NextResponse.json({ message: "Password updated" });
}


