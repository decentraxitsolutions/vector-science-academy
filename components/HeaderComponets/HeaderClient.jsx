'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BookOpen, Menu, LayoutDashboard, ChevronRight, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeaderClient({ dbUser }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminOrTeacher = dbUser?.role === 'ADMIN' || dbUser?.role === 'TEACHER';
  const isActive = (path) => pathname === path;

  // Always render the header even on admin/teacher routes.  We want a consistent
  // top bar across the entire app.  The `console` button and different navItems
  // will already adapt based on the user's role below.

  const navItems = isAdminOrTeacher 
    ? [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        // teachers/admins still see a link back to their dashboard
        { name: "Dashboard", href: dbUser?.role === 'ADMIN' ? "/admin" : "/teacher" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Study Material", href: "/study-material" },
        { name: "Our Results", href: "/results" },
        { name: "About", href: "/about" },
        { name: "My Learning", href: "/portal" },
      ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
        ? "bg-black/40 backdrop-blur-xl border-b border-white/10 py-3" 
        : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/20"
          >
            <BookOpen className="h-6 w-6 text-white" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"></div>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              Vector<span className="text-blue-500">Science</span>
            </span>
            
            {isAdminOrTeacher ? (
              <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {dbUser?.role} ACCESS
              </span>
            ) : (
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Academy Portal
              </span>
            )}
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
          {navItems.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="relative px-5 py-2 text-sm font-medium transition-colors"
            >
              {isActive(link.href) ? (
                <span className="relative z-10 text-white">{link.name}</span>
              ) : (
                <span className="relative z-10 text-zinc-400 hover:text-white">{link.name}</span>
              )}
              
              {isActive(link.href) && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          
          {isAdminOrTeacher && (
            <Link href={dbUser?.role === 'ADMIN' ? "/admin" : "/teacher"} className="hidden lg:block">
              <button className="flex items-center text-sm px-4 py-2 rounded-full bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 transition-all">
                <LayoutDashboard className="h-4 w-4 mr-2" /> Console
              </button>
            </Link>
          )}

          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{ elements: { avatarBox: "h-9 w-9 ring-2 ring-white/10" }}}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="px-5 py-2 rounded-full bg-white text-slate-950 hover:bg-slate-200 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
                  Sign In
                </button>
              </motion.div>
            </SignInButton>
          </SignedOut>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-white/10 transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 bg-zinc-950 border-white/10 text-white p-6">
                <SheetHeader className="mb-8 text-left">
                  <SheetTitle className="flex items-center gap-2 text-white">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                    <span className="font-bold">Vector Science</span>
                  </SheetTitle>
                  {isAdminOrTeacher && <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mt-1">{dbUser?.role} Account</p>}
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  {navItems.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive(link.href) 
                        ? "bg-blue-600 text-white" 
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {isActive(link.href) && <ChevronRight className="h-4 w-4" />}
                    </Link>
                  ))}
                  
                  <SignedOut>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <SignInButton mode="modal">
                        <button className="w-full py-3 rounded-lg bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-colors">
                          Sign In
                        </button>
                      </SignInButton>
                    </div>
                  </SignedOut>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}