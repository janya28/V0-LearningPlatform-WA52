"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Home, LayoutDashboard, LogIn, Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const isLoggedIn = true // This would be determined by your auth state

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Book className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">LearnHub</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`transition-colors hover:text-foreground/80 ${
                pathname?.startsWith("/courses") ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Courses
            </Link>
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname?.startsWith("/dashboard") ? "text-foreground" : "text-foreground/60"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2">
              <Book className="h-6 w-6" />
              <span className="font-bold">LearnHub</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
                <Link href="/courses" className="flex items-center text-sm font-medium text-muted-foreground">
                  <Book className="mr-2 h-4 w-4" />
                  Courses
                </Link>
                {isLoggedIn && (
                  <Link href="/dashboard" className="flex items-center text-sm font-medium text-muted-foreground">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <Book className="h-6 w-6" />
          <span className="font-bold">LearnHub</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="hidden md:flex">
              <Input type="search" placeholder="Search courses..." className="h-9 md:w-[200px] lg:w-[300px]" />
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex md:items-center md:gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
          {!isLoggedIn && (
            <Link href="/auth/login" className="md:hidden">
              <Button variant="ghost" size="icon">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
