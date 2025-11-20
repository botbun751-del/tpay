import { Shield, Fingerprint, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const controls = [
  {
    icon: Shield,
    title: "Data residency",
    description: "Regionalized Postgres clusters with automated PITR snapshots, row-level encryption, and secret rotation.",
  },
  {
    icon: Fingerprint,
    title: "Adaptive auth",
    description: "Risk-based MFA, session isolation per device, and passkey-ready enrollment powered by NextAuth v5.",
  },
  {
    icon: BadgeCheck,
    title: "Policy automation",
    description: "Granular RBAC & ABAC policies enforced in middleware with auditable change history.",
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Security</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight">
            Enterprise-grade controls, without the enterprise tax.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Every API uses schema validation via Zod, rate limiting hooks, and signed webhooks. Stay compliant with GDPR,
            HIPAA, and SOC2 with minimal setup.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {controls.map((control) => (
            <Card key={control.title} className="h-full rounded-3xl border-white/10 bg-white/5 text-foreground">
              <CardHeader className="space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <control.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{control.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{control.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


