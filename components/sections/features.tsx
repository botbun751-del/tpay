'use client';
import { motion } from "framer-motion";
import { Brain, Globe, LineChart, LockKeyhole } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: LineChart,
    title: "Realtime analytics",
    description: "Clean KPI boards, live partner leaderboards, and anomaly detection with streaming metrics.",
  },
  {
    icon: Brain,
    title: "AI compliance copilot",
    description: "Automatic AML, sanction, KYC, and referral fraud checks trained on 50+ risk scenarios.",
  },
  {
    icon: Globe,
    title: "Global payouts",
    description: "Multi-currency wallets with SEPA, ACH, UPI, and crypto rails plus smart tax receipts.",
  },
  {
    icon: LockKeyhole,
    title: "Zero trust security",
    description: "Hardware-backed encryption, field-level masking, and programmable audit trails.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Platform</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight">
          Everything modern earning teams expect.
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Each surface ships with shadcn components, dark mode polish, and fully typed models you can extend without friction.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full rounded-3xl border-white/5 bg-gradient-to-b from-white/5 via-transparent to-transparent">
              <CardHeader className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

