import Link from "next/link";
import { AuthCard } from "@/components";

export default function ForgotPasswordPage() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6 rounded-[32px] border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur">
      <div>
        <h1 className="text-3xl font-semibold">Reset access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll email a one-time link to securely set a new password.
        </p>
      </div>
      <AuthCard view="forgot" />
      <p className="text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}


