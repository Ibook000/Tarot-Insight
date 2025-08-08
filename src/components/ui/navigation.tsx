"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, Home, Star, Sparkles, BookOpen, ArrowLeft } from "lucide-react"

interface NavigationItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: string
}

const navigationItems: NavigationItem[] = [
  {
    href: "/",
    label: "首页",
    icon: <Home className="w-4 h-4" />
  },
  {
    href: "/spreads",
    label: "牌阵选择",
    icon: <Star className="w-4 h-4" />
  },
  {
    href: "/cards",
    label: "牌库浏览",
    icon: <BookOpen className="w-4 h-4" />
  }
]

interface NavigationProps {
  className?: string
}

export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:flex items-center space-x-6 ${className}`}>
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="relative">
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${
                  isActive(item.href)
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
              {isActive(item.href) && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600"></div>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <div className="flex flex-col space-y-4 mt-8">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={handleNavClick}>
                <div>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`w-full justify-start space-x-3 ${
                      isActive(item.href)
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-gray-400">/</span>
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ 
  title, 
  description, 
  breadcrumb, 
  actions, 
  className = "" 
}: PageHeaderProps) {
  return (
    <div className={`bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-purple-200 dark:border-purple-800 ${className}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            {breadcrumb && <Breadcrumb items={breadcrumb} className="mb-4" />}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="ml-4 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface BackButtonProps {
  href?: string
  onClick?: () => void
  className?: string
}

export function BackButton({ href, onClick, className = "" }: BackButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    } else {
      window.history.back()
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      返回
    </Button>
  )
}