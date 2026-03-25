"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Database, FileText, Mail, FolderOpen, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const stats = [
    { label: "AI डेटासेट", value: "24", change: "+3 इस सप्ताह", icon: Database, color: "bg-slate-700" },
    { label: "प्रकाशन", value: "47", change: "+5 इस महीने", icon: FileText, color: "bg-slate-700" },
    { label: "लंबित अनुरोध", value: "12", change: "3 अत्यावश्यक", icon: Mail, color: "bg-slate-700" },
    { label: "सक्रिय परियोजनाएं", value: "8", change: "2 जल्द लॉन्च", icon: FolderOpen, color: "bg-slate-700" },
  ];

  const activities = [
    { type: "success", title: "नया डेटासेट अपलोड किया गया: GPT-4 Training Data", time: "2 घंटे पहले", icon: CheckCircle },
    { type: "warning", title: "प्रकाशन समीक्षा के लिए जमा किया गया", time: "5 घंटे पहले", icon: Clock },
    { type: "success", title: "एक्सेस अनुरोध स्वीकृत", time: "1 दिन पहले", icon: CheckCircle },
    { type: "info", title: "नई परियोजना मील का पत्थर पहुंचा", time: "2 दिन पहले", icon: TrendingUp },
  ];

  const systemStatus = [
    { name: "GPU Cluster", status: "ऑनलाइन", uptime: "99.99%" },
    { name: "Storage System", status: "ऑनलाइन", uptime: "99.95%" },
    { name: "Database", status: "ऑनलाइन", uptime: "100%" },
    { name: "API Gateway", status: "ऑनलाइन", uptime: "99.98%" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            स्वागत है, {user?.email?.split("@")[0] || "User"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            आज आपके अनुसंधान पोर्टल में क्या हो रहा है.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          अंतिम अपडेट: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-md ${stat.color}
                                flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 
                               text-green-600 dark:text-green-400 font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* हालिया गतिविधि */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            हालिया गतिविधि
          </h2>
          <div className="space-y-4">
            {activities.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                  ${activity.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                                    activity.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                                    'bg-blue-100 dark:bg-blue-900/30'}`}>
                    <Icon className={`w-5 h-5 
                                    ${activity.type === 'success' ? 'text-green-600 dark:text-green-400' :
                                      activity.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                      'text-blue-600 dark:text-blue-400'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* सिस्टम स्थिति */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            सिस्टम स्थिति
          </h2>
          <div className="space-y-4">
            {systemStatus.map((system, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-medium text-gray-900 dark:text-white">{system.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">{system.status}</span>
                  <p className="text-xs text-gray-500">{system.uptime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
