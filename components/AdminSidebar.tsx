"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layoutडैशबोर्ड, Database, FileText, Mail, FolderOpen, LogOut, ChevronRight } from "lucide-react";
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
    { href: "/admin", label: "डैशबोर्ड", icon: Layoutडैशबोर्ड },
    { href: "/admin/datasets", label: "AI डेटासेट", icon: Database },
    { href: "/admin/publications", label: "प्रकाशन", icon: FileText },
    { href: "/admin/requests", label: "एक्सेस अनुरोध", icon: Mail },
    { href: "/admin/projects", label: "अनुसंधान परियोजनाएं", icon: FolderOpen },
  ];

  return (
    <div className="w-72 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/smj.jpeg"
            alt="Institute Logo"
            width={40}
            height={40}
            className="rounded-md object-cover border border-slate-600"
          />
          <div>
            <span className="text-lg font-bold">Netra Anveshan</span>
            <span className="text-xs text-gray-400 block">व्यवस्थापक पोर्टल</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs uppercase text-gray-500 font-medium px-4 py-2">
          मुख्य मेनू
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
                           ? 'bg-slate-700 text-white shadow-md' 
                           : 'text-gray-400 hover:text-white hover:bg-gray-800'
                         }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-orange-400'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
                    text-gray-400 hover:text-white hover:bg-red-500/10
                    transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-400" />
          <span className="font-medium">साइन आउट</span>
        </button>
      </div>
    </div>
  );
}
