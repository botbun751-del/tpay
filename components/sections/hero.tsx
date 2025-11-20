'use client';
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const insights = [
  { title: "Avg. payout speed", value: "12m", trend: "+18% faster" },
  { title: "Referral earnings", value: "$4.8M", trend: "Top performers" },
  { title: "Active countries", value: "62", trend: "Global coverage" },
];

export function Hero() {
  return (
    <section className="mx-auto mt-20 flex max-w-6xl flex-col items-center gap-10 px-6 text-center lg:flex-row lg:text-left">
      <div className="flex-1 space-y-8">
        <Badge variant="success" className="border-0">
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          Earning automation platform
        </Badge>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Supercharge referral earnings with enterprise-grade compliance.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Launch multi-channel referral programs, track payouts, and manage trusted verifications in one place.
            TPAY keeps your community engaged while you stay audit-ready.
          </p>
        </motion.div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/signup" className="flex items-center gap-2">
              Create free account <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#features">See the platform</Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-6 text-left text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            SOC2 & ISO27001 ready
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-sky-400" />
            PSD2 compliant payouts
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-amber-400" />
            EU/US data residency options
          </div>
        </div>
      </div>
      <motion.div
        className="flex w-full flex-1 flex-col gap-6 lg:w-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {insights.map((metric, index) => (
          <motion.div
            key={metric.title}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-1 shadow-2xl shadow-primary/20"
            whileHover={{ y: -4, rotate: index % 2 === 0 ? -0.4 : 0.4 }}
          >
            <Card className="rounded-3xl bg-black/40 p-6 text-left">
              <CardContent className="space-y-4">
                <p className="text-sm uppercase tracking-wide text-muted-foreground">{metric.title}</p>
                <p className="text-4xl font-semibold">{metric.value}</p>
                <p className="text-xs text-emerald-400">{metric.trend}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

