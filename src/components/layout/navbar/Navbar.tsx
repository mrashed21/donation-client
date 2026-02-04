"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";

/* ------------------ Types ------------------ */
type User = {
  name?: string;
  email?: string;
  image?: string | null;
};

/* ------------------ Nav Items ------------------ */
const navItems = [
  { label: "Home", href: "/" },
  { label: "Request for Blood", href: "/request-blood" },
  { label: "Donors", href: "/donors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------ Component ------------------ */
const Navbar = () => {
  const { data } = authClient.useSession();
  const user: User | null = data?.user ?? null;
  const isAuthenticated = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <Container>
        <nav className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary">
            BloodCare
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Section (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {!isAuthenticated ? (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2"
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name ?? "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <Link href="/user">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => authClient.signOut()}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              {/* User Info */}
              {isAuthenticated && (
                <div className="flex items-center gap-3 mb-6">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? "User"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-4 border-t">
                  {!isAuthenticated ? (
                    <div className="flex flex-col gap-2">
                      <Link href="/auth/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </div>
                  ) : (
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => authClient.signOut()}
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
