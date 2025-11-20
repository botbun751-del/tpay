"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { referralSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormValues = z.infer<typeof referralSchema>;

export function ReferralForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(referralSchema),
  });
  const [pending, startTransition] = useTransition();

  const submit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/referrals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          throw new Error("Could not create referral");
        }
        toast.success("Referral submitted");
        form.reset();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unexpected error");
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(submit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Candidate email</Label>
        <Input id="email" type="email" placeholder="advocate@org.com" {...form.register("email")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Context</Label>
        <Textarea id="message" rows={4} placeholder="Tell us why this referral is great" {...form.register("message")} />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit referral"}
      </Button>
    </form>
  );
}


