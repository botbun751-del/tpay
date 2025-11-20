'use client';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    quote: "TPAY let us ship a fully auditable rewards program in two sprints. The DX is elite.",
    author: "Selena Ortiz",
    role: "Head of Product, VoltPay",
  },
  {
    quote: "The built-in referral intelligence blocked 93% of duplicate fraud in week one.",
    author: "Ibrahim Said",
    role: "COO, SolarEdge",
  },
  {
    quote: "OAuth, passwordless, and payouts sharing the same source of truth? Chef’s kiss.",
    author: "Maya Kline",
    role: "CTO, Northwind Capital",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Loved by builders</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight">
          Teams large and small rely on TPAY for compliant growth.
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className="h-full rounded-3xl border-white/10 bg-gradient-to-b from-white/5 via-transparent to-transparent">
              <CardHeader>
                <p className="text-base font-medium leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p>{testimonial.role}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

