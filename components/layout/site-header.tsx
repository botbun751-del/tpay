"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/navigation/main-nav";
import { UserNav } from "@/components/navigation/user-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useSession } from "next-auth/react";

export function SiteHeader() {
  const { data } = useSession();

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            TPAY
          </Link>
          <MainNav />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {data?.user ? (
            <UserNav />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}


