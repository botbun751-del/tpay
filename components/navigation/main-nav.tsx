"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
  { href: "#testimonials", label: "Stories" },
];

export function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn("hidden gap-6 text-sm font-medium md:flex", className)}>
      {links.map((link) => (
        <motion.div key={link.href} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={link.href}
            className="text-muted-foreground transition hover:text-foreground"
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
      <motion.div whileHover={{ y: -2 }}>
        <Link href="/dashboard" className="text-muted-foreground transition hover:text-foreground">
          Dashboard
        </Link>
      </motion.div>
    </nav>
  );
}


