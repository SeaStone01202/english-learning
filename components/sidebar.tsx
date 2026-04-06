"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpen,
  History,
  Settings,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/practice",
      label: "Practice",
      icon: BookOpen,
    },
    {
      href: "/history",
      label: "History",
      icon: History,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">Learn</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="border-t border-border bg-card px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-border bg-card p-6 gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">Learn English</div>
            <div className="text-xs text-muted-foreground">Master your skills</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-transform",
                      active ? "scale-110" : "group-hover:scale-110"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {active && <ChevronRight className="h-4 w-4" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Theme
            </span>
            <ThemeToggle />
          </div>
          <div className="text-xs text-muted-foreground">
            <p>v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}
