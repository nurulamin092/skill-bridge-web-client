"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "SkillBridge",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Tutors", url: "/tutors" },
    { title: "About", url: "/about" },
  ],
  className,
}: NavbarProps) => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (url: string) => {
    if (url === "/") return pathname === url;
    return pathname.startsWith(url);
  };

  return (
    <section className={cn("py-4 border-b", className)}>
      <div className="container mx-auto px-4">
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                width={32}
                height={32}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.url}
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground",
                            isActive(item.url) &&
                              "bg-muted text-accent-foreground",
                          )}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex gap-2">
            <ModeToggle />

            {isAuthenticated ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={getDashboardUrl(user?.role)}>Dashboard</Link>
                </Button>
                <Button size="sm" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                width={32}
                height={32}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image
                        src={logo.src}
                        width={32}
                        height={32}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                      <span className="text-lg font-semibold">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <div className="flex flex-col gap-2">
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={cn(
                          "text-md py-2 font-semibold hover:text-primary",
                          isActive(item.url) && "text-primary",
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t">
                    <ModeToggle />

                    {isAuthenticated ? (
                      <>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={getDashboardUrl(user?.role)}>
                            Dashboard
                          </Link>
                        </Button>
                        <Button className="w-full" onClick={() => logout()}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="w-full">
                          <Link href="/register">Sign up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

function getDashboardUrl(role?: string): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "TUTOR":
      return "/tutor";
    case "STUDENT":
      return "/student";
    default:
      return "/dashboard";
  }
}

export { Navbar };
