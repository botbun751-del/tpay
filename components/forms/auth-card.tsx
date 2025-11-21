"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/validators/auth";

const schemaMap = {
  signup: registerSchema,
  signin: loginSchema,
  forgot: forgotPasswordSchema,
  reset: resetPasswordSchema,
} as const;

type AuthView = keyof typeof schemaMap;
type FormValues<T extends AuthView> = z.infer<(typeof schemaMap)[T]>;

interface AuthCardProps<T extends AuthView> {
  view: T;
  token?: string;
}

const titles: Record<AuthView, { title: string; description: string; action: string }> = {
  signup: {
    title: "Create an account",
    description: "Start earning in under 2 minutes.",
    action: "Sign up",
  },
  signin: {
    title: "Welcome back",
    description: "Sign in to access your dashboard.",
    action: "Sign in",
  },
  forgot: {
    title: "Forgot password",
    description: "We'll send a secure reset link to your email.",
    action: "Send link",
  },
  reset: {
    title: "Set a new password",
    description: "Choose a strong password to secure your profile.",
    action: "Reset password",
  },
};

function RenderField({
  field,
  label,
  placeholder,
  type = "text",
  errors,
  form,
}: {
  field: string;
  label: string;
  placeholder?: string;
  type?: string;
  errors: Record<string, any>;
  form: any;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <Input id={field} type={type} placeholder={placeholder} {...form.register(field)} />
      {errors[field] && <p className="text-sm text-destructive">{errors[field]?.message as string}</p>}
    </div>
  );
}

export function AuthCard<T extends AuthView>({ view, token }: AuthCardProps<T>) {
  if (view === "reset" && !token) {
    return (
      <Card className="w-full max-w-md rounded-3xl border-white/5 bg-white/10 text-left backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Invalid link</CardTitle>
          <CardDescription>The reset link is missing or has expired.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const schema = schemaMap[view];
  // Get the correct fields for this schema using Object.keys(schema.shape)
  const fieldKeys = Object.keys((schema as any).shape ?? {});

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  let defaultValues: DefaultValues<any>;
  if (view === "signup") {
    defaultValues = { name: "", email: "", password: "" };
  } else if (view === "signin") {
    defaultValues = { email: "", password: "" };
  } else if (view === "forgot") {
    defaultValues = { email: "" };
  } else if (view === "reset") {
    defaultValues = { token: token ?? "", password: "" };
  } else {
    defaultValues = {} as DefaultValues<FormValues<T>>;
  }

  const form = useForm<FormValues<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<FormValues<T>>,
  });

  const onSubmit = async (values: FormValues<T>) => {
    setLoading(true);
    try {
      switch (view) {
        case "signup": {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          if (!res.ok) throw new Error("Unable to create account");
          toast.success("Account created. Please sign in.");
          router.push("/signin");
          break;
        }
        case "signin": {
          const result = await signIn("credentials", {
            redirect: false,
            email: (values as FormValues<"signin">).email,
            password: (values as FormValues<"signin">).password,
          });
          if (result?.error) throw new Error(result.error);
          toast.success("Welcome back!");
          router.push("/dashboard");
          router.refresh();
          break;
        }
        case "forgot": {
          const res = await fetch("/api/auth/reset/request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          if (!res.ok) throw new Error("Unable to start reset flow");
          toast.success("Reset instructions sent. Check your inbox.");
          break;
        }
        case "reset": {
          const res = await fetch("/api/auth/reset/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...values, token }),
          });
          if (!res.ok) throw new Error("Unable to reset password");
          toast.success("Password updated. You can sign in now.");
          router.push("/signin");
          break;
        }
        default:
          break;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const { title, description, action } = titles[view];
  const errors = form.formState.errors;

  return (
    <Card className="w-full max-w-md rounded-3xl border-white/5 bg-white/10 text-left backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {fieldKeys.includes("name") && (
            <RenderField field="name" label="Full name" placeholder="Ava Streams" errors={errors} form={form} />
          )}
          {fieldKeys.includes("email") && (
            <RenderField field="email" label="Email" type="email" placeholder="you@team.com" errors={errors} form={form} />
          )}
          {fieldKeys.includes("password") && (
            <RenderField field="password" label="Password" type="password" placeholder="••••••••" errors={errors} form={form} />
          )}
          {fieldKeys.includes("token") && (
            <RenderField field="token" label="Reset Token" placeholder="Paste reset token" errors={errors} form={form} />
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {action}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}