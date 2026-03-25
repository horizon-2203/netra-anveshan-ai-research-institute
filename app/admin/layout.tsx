"use client";

import { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "@/components/AdminSidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-500">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex justify-end mb-4">
              <ThemeToggle />
            </div>
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
