import Link from "next/link";
import { AuthCard, OAuthButtons } from "@/components";

export default function SignInPage() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 rounded-[32px] border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Secure access</p>
        <h1 className="mt-3 text-3xl font-semibold">Sign in to TPAY</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back. Use OAuth or your email credentials.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <OAuthButtons />
          <p className="text-xs text-muted-foreground">
            By continuing you agree to our privacy policy and terms.
          </p>
        </div>
        <AuthCard view="signin" />
      </div>
      <p className="text-sm text-muted-foreground">
        Need an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Create one
        </Link>
      </p>
      <p className="text-xs text-muted-foreground">
        Forgot your password?{" "}
        <Link href="/forgot-password" className="text-primary hover:underline">
          Reset it
        </Link>
      </p>
    </div>
  );
}


