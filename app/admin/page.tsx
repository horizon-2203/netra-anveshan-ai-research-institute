"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Database, FileText, Mail, FolderOpen, TrendingUp, Clock } from "lucide-react";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [counts, setCounts] = useState({
    datasets: 0,
    publications: 0,
    requests: 0,
    projects: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const [{ count: datasetsCount }, { count: publicationsCount }, { count: requestsCount }, { count: projectsCount }] = await Promise.all([
        supabase.from("datasets").select("id", { count: "exact", head: true }),
        supabase.from("publications").select("id", { count: "exact", head: true }),
        supabase.from("access_requests").select("id", { count: "exact", head: true }),
        supabase.from("research_projects").select("id", { count: "exact", head: true }),
      ]);

      setCounts({
        datasets: datasetsCount ?? 0,
        publications: publicationsCount ?? 0,
        requests: requestsCount ?? 0,
        projects: projectsCount ?? 0,
      });

    };

    loadDashboard();
  }, []);

  const stats = [
    { label: "AI Datasets", value: counts.datasets, icon: Database, color: "bg-slate-700" },
    { label: "Publications", value: counts.publications, icon: FileText, color: "bg-slate-700" },
    { label: "Access Requests", value: counts.requests, icon: Mail, color: "bg-slate-700" },
    { label: "Research Projects", value: counts.projects, icon: FolderOpen, color: "bg-slate-700" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            Welcome, {user?.email?.split("@")[0] || "User"}
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Here is what is happening in your research portal today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
          <Clock className="w-4 h-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-800
                        hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-md ${stat.color}
                                flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-slate-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Logging Status
          </h2>
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-slate-800 text-sm text-gray-600 dark:text-slate-300 space-y-1">
              <p>Logs are stored in filesystem only.</p>
              <p>Global: logs/app.log</p>
              <p>Website route logs: logs/website/*.json</p>
              <p>Admin route logs: logs/admin/*.json</p>
              <p>Geo fields (country/city/lat/long/timezone) are embedded in each log entry.</p>
            </div>
          </div>
        </div>
    </div>
  );
}
