import Link from "next/link";

const links = [
  { label: "Docs", href: "https://nextjs.org/docs" },
  { label: "Security", href: "#security" },
  { label: "Support", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-gradient-to-t from-black/40 via-transparent">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TPAY. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}


