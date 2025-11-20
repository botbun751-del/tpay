"use client";

import { signIn } from "next-auth/react";
import { Github, Facebook, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";

const providers = [
  { id: "google", label: "Continue with Google", icon: Chrome },
  { id: "github", label: "Continue with GitHub", icon: Github },
  { id: "facebook", label: "Continue with Facebook", icon: Facebook },
];

export function OAuthButtons() {
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => signIn(provider.id)}
        >
          <provider.icon className="mr-2 h-4 w-4" />
          {provider.label}
        </Button>
      ))}
    </div>
  );
}

