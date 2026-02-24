'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Layers, 
  Video, 
  FileText,
  MessageCircleQuestion,
  LogOut
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

const menuItems = [
  { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
  { name: "My Batches", href: "/teacher/batches", icon: Layers },
  { name: "Recorded Lectures", href: "/teacher/lectures", icon: Video },
  { name: "Study Materials", href: "/teacher/materials", icon: FileText },
  { name: "Student Doubts", href: "/teacher/doubts", icon: MessageCircleQuestion },
];

export default function TeacherSidebarClient() {
  const pathname = usePathname();

  return (
    // always show sidebar and stretch from top (below header) to bottom
    <aside className="flex flex-col w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl sticky top-16 bottom-0">
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/teacher");
          
          return (
            <Link key={item.name} href={item.href} className="relative group">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all z-10 relative ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`}>
                <item.icon className={`h-5 w-5 ${isActive ? "text-amber-500" : ""}`} />
                <span className="font-medium">{item.name}</span>
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="teacher-sidebar-active"
                  className="absolute inset-0 bg-amber-600/10 border border-amber-500/20 rounded-xl z-0"
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