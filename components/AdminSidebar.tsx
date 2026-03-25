"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Database, FileText, Mail, FolderOpen, User, LogOut, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/portal");
  };

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/datasets", label: "AI Datasets", icon: Database },
    { href: "/admin/publications", label: "Publications", icon: FileText },
    { href: "/admin/requests", label: "Access Requests", icon: Mail },
    { href: "/admin/projects", label: "Research Projects", icon: FolderOpen },
    { href: "/admin/profile", label: "Edit Profile", icon: User },
  ];

  return (
    <div className="w-72 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 min-h-screen flex flex-col border-r border-gray-200 dark:border-slate-800 transition-colors duration-300">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-slate-800">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Institute Logo"
            width={40}
            height={40}
            className="rounded-md object-cover border border-slate-300 dark:border-slate-700"
          />
          <div>
            <span className="text-lg font-bold">Netra Anveshan</span>
            <span className="text-xs text-gray-500 dark:text-slate-400 block">Admin Portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs uppercase text-gray-500 dark:text-slate-400 font-medium px-4 py-2 tracking-wide">
          Main Menu
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
                          (item.href !== "/admin" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl
                         transition-all duration-300 ease-out group
                         ${isActive 
                           ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700' 
                           : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
                         }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-gray-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
                    text-gray-600 dark:text-slate-300 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10
                    transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 text-gray-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-300" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
