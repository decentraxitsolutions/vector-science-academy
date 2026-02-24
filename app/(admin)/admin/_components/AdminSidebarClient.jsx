'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Users,
  IndianRupee,
  Settings,
  LogOut
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Batches", href: "/admin/batches", icon: Layers },
  { name: "Subjects", href: "/admin/subjects", icon: Layers },
  { name: "Students & Staff", href: "/admin/users", icon: Users },
  { name: "Revenue", href: "/admin/revenue", icon: IndianRupee },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebarClient() {
  const pathname = usePathname();

  return (
    // always display the sidebar (no "hidden md:flex"), and use sticky positioning
    // with top/bottom offsets so it spans the full viewport height minus header.
    <aside className="flex flex-col w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl sticky top-16 bottom-0">
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");

          return (
            <Link key={item.name} href={item.href} className="relative group">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all z-10 relative ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`}>
                <item.icon className={`h-5 w-5 ${isActive ? "text-blue-500" : ""}`} />
                <span className="font-medium">{item.name}</span>
              </div>

              {isActive && (
                <motion.div
                  layoutId="admin-sidebar-active"
                  className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <SignOutButton>
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}