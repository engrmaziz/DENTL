"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Images,
  Users,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Activity,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/appointments", label: "Appointments", icon: Calendar },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || null);
    });
  }, []);

  // Don't render layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay (mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar (mobile) */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -288 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-72 z-40 lg:hidden"
      >
        <SidebarContent
          navItems={navItems}
          pathname={pathname}
          isActive={isActive}
          userEmail={userEmail}
          onSignOut={handleSignOut}
          onClose={() => setSidebarOpen(false)}
        />
      </motion.aside>

      {/* Desktop Sidebar (always visible) */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:z-50">
        <SidebarContent
          navItems={navItems}
          pathname={pathname}
          isActive={isActive}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-sm font-medium text-slate-500">
                Premium Dental
              </h2>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                {navItems.find((item) => isActive(item))?.label || "Dashboard"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-slate-500 hidden sm:block">
              {userEmail}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

interface SidebarContentProps {
  navItems: typeof navItems;
  pathname: string;
  isActive: (item: { href: string; exact?: boolean }) => boolean;
  userEmail: string | null;
  onSignOut: () => void;
  onClose?: () => void;
}

function SidebarContent({
  navItems,
  pathname,
  isActive,
  userEmail,
  onSignOut,
  onClose,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full bg-slate-900/95 backdrop-blur-xl border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
            <Activity size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Premium Dental</p>
            <p className="text-slate-400 text-xs">Admin Suite</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                active
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {active && (
                <ChevronRight size={16} className="ml-auto text-blue-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Sign Out */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="px-4 py-2 mb-2">
          <p className="text-slate-400 text-xs truncate">{userEmail}</p>
        </div>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
