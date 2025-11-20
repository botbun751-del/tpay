"use client";

import { signOut, useSession } from "next-auth/react";
import { UserRound, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const { data } = useSession();
  const initials = data?.user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full border border-border p-1 transition hover:border-primary/60 hover:shadow-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src={data?.user?.image ?? undefined} alt={data?.user?.name ?? "Profile"} />
            <AvatarFallback>{initials || <UserRound className="h-4 w-4" />}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{data?.user?.name ?? "Guest"}</p>
          <p className="text-xs text-muted-foreground">{data?.user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/dashboard/settings">Settings</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/dashboard">My dashboard</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


