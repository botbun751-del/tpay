"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileSchema } from "@/lib/validators/user";

type FormValues = z.infer<typeof updateProfileSchema>;

export function SettingsForm({ defaultValues }: { defaultValues: FormValues }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });
  const [pending, startTransition] = useTransition();

  const submit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const payload = Object.fromEntries(
          Object.entries(values).map(([key, value]) => {
            if (!value) {
              return [key, undefined];
            }
            const trimmed = value.trim();
            return [key, trimmed.length ? trimmed : undefined];
          }),
        );

        const res = await fetch("/api/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Unable to update profile");
        }
        toast.success("Profile updated");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Update failed";
        toast.error(message);
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(submit)}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register("name")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Avatar URL</Label>
        <Input id="image" placeholder="https://" {...form.register("image")} />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}

