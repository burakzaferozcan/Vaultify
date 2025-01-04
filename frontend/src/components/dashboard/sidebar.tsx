"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Key,
  CreditCard,
  FileText,
  Shield,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Passwords",
      href: "/dashboard/passwords",
      icon: Key,
    },
    {
      name: "Payment Cards",
      href: "/dashboard/cards",
      icon: CreditCard,
    },
    {
      name: "Secure Notes",
      href: "/dashboard/notes",
      icon: FileText,
    },
    {
      name: "Security",
      href: "/dashboard/security",
      icon: Shield,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-800 p-4 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo and toggle button */}
          <div className="mb-8 flex items-center justify-between">
            <Logo href="/dashboard" />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onToggle}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    {
                      "bg-gray-700 text-white": isActive,
                      "text-gray-400 hover:bg-gray-700 hover:text-white":
                        !isActive,
                    }
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Version */}
          <div className="pt-4 text-xs text-gray-400">Version 1.0.0</div>
        </div>
      </div>
    </>
  );
}
