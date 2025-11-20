import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ThemeToggle, UserNav } from "@/components";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/referrals", label: "Referrals" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/admin", label: "Admin" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 flex-col border-r border-border/60 bg-card/40 px-6 py-10 lg:flex">
        <div>
          <p className="text-lg font-semibold">TPAY</p>
          <p className="text-xs text-muted-foreground">Growth operations OS</p>
        </div>
        <nav className="mt-10 space-y-2 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2 transition hover:bg-primary/10 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 text-xs text-primary">
          <p className="font-semibold text-sm text-foreground">Need help?</p>
          <p className="text-muted-foreground">Email success@tpay.app</p>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-semibold">{session.user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 space-y-8 bg-gradient-to-b from-primary/5 to-transparent px-6 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

