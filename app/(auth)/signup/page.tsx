import Link from "next/link";
import { AuthCard, OAuthButtons } from "@/components";

export default function SignUpPage() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 rounded-[32px] border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Create account</p>
        <h1 className="mt-3 text-3xl font-semibold">Join the TPAY network</h1>
        <p className="mt-2 text-sm text-muted-foreground">Launch referral programs with built-in compliance.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <AuthCard view="signup" />
        <div className="space-y-5">
          <OAuthButtons />
          <p className="text-xs text-muted-foreground">
            Continue with OAuth or use your work email to stay synced with admin policies.
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Already using TPAY?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}


