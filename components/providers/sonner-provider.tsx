"use client";

import { Toaster } from "sonner";

export function SonnerProvider() {
  return (
    <Toaster
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "rounded-2xl border border-border shadow-xl backdrop-blur",
        },
      }}
    />
  );
}


