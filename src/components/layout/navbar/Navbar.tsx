"use client";

import { Menu, Search, User } from "lucide-react";
import Link from "next/link";

import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const isAuthenticated = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <Container>
        <nav className=" flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            BrandLogo
          </Link>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search (Optional) */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 w-48" />
            </div>

            {/* Auth */}
            {!isAuthenticated ? (
              <>
                <Link href={"/auth/login"}>
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href={"/auth/register"}>
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
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
              <div className="flex flex-col gap-6">
                <Link href="/" className="text-lg font-bold">
                  BrandLogo
                </Link>

                {/* Mobile Nav */}
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Search */}
                <Input placeholder="Search..." />

                {/* Mobile Auth */}
                {!isAuthenticated ? (
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                    <Button className="w-full">Register</Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost">Profile</Button>
                    <Button variant="ghost">Dashboard</Button>
                    <Button variant="destructive">Logout</Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
