"use client";

import { cn } from "@/lib/utils";
import { History, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "Profile",
    href: "/user",
    icon: User,
  },
  {
    title: "History",
    href: "/user/history",
    icon: History,
  },
  {
    title: "Settings",
    href: "/user/settings",
    icon: Settings,
  },
];

const UserSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-background hidden md:block">
      <div className="p-6 font-semibold text-lg">User Panel</div>

      <nav className="space-y-1 px-3">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default UserSidebar;
