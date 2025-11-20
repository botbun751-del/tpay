import { AuthCard } from "@/components";

interface ResetPageProps {
  params: { token: string };
}

export default function ResetPasswordPage({ params }: ResetPageProps) {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6 rounded-[32px] border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur">
      <div>
        <h1 className="text-3xl font-semibold">Choose a new password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tokens expire in 30 minutes. Use a strong passphrase unique to TPAY.
        </p>
      </div>
      <AuthCard view="reset" token={params.token} />
    </div>
  );
}


