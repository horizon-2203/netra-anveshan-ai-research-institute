"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, Network, Cpu, HardDrive, Zap, Cloud } from "lucide-react";

export default function FacilitiesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const infrastructure = [
    { icon: Cpu, name: "GPU Cluster", value: "1,024", unit: "NVIDIA A100 GPUs", color: "bg-slate-700" },
    { icon: HardDrive, name: "Storage", value: "50", unit: "Petabytes", color: "bg-slate-700" },
    { icon: Network, name: "Network", value: "100", unit: "Gbps Backbone", color: "bg-slate-700" },
    { icon: Cloud, name: "Uptime", value: "99.99", unit: "% SLA", color: "bg-slate-700" },
  ];

  const specs = [
    { title: "Compute Resources", items: ["1,024 NVIDIA A100 GPUs", "256 Compute Nodes", "64 TB Total RAM", "InfiniBand Interconnect"] },
    { title: "Storage Systems", items: ["50 PB Enterprise Storage", "NVMe Flash Tier", "Automated Tiering", "Multi-site Replication"] },
    { title: "Network Architecture", items: ["100 Gbps Backbone", "Low-latency Fabric", "Multi-path Routing", "DDoS Protection"] },
    { title: "Security & Compliance", items: ["SOC 2 Type II", "ISO 27001 Certified", "End-to-end Encryption", "24/7 Monitoring"] },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-900">
        <div className="container mx-auto px-6 relative z-10">
          <span className="inline-block px-4 py-2 rounded-md bg-white/10 
                         border border-white/20 text-white/90 text-sm font-medium mb-6">
            World-Class Infrastructure
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our
            <span className="block mt-2 pb-1 leading-[1.15] text-slate-200">
              Facilities
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            अत्याधुनिक कंप्यूटिंग अवसंरचना, जो अभूतपूर्व एआई अनुसंधान को शक्ति प्रदान करती है।
          </p>
        </div>
      </section>

      {/* Infrastructure Stats */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructure.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="stat-card text-center">
                  <div className={`w-16 h-16 mx-auto rounded-md ${item.color}
                                  flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{item.unit}</p>
                  <p className="text-sm text-gray-500 mt-2">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 
                           text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              Technical Specifications
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Data Center Capabilities
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {specs.map((spec, idx) => (
              <div key={idx} className="card-premium p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 rounded-sm bg-slate-500" />
                  {spec.title}
                </h3>
                <ul className="space-y-4">
                  {spec.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labs Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 
                           text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              Research Labs
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Specialized Lab Spaces
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
              हमारी सुविधा में रोबोटिक्स, कंप्यूटर विज़न और मानव-एआई अंतःक्रिया अनुसंधान के लिए
              समर्पित प्रयोगशालाएँ शामिल हैं, जिनमें प्रत्येक अत्याधुनिक तकनीक से सुसज्जित है।
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {["Robotics Lab", "Vision Lab", "Interaction Lab"].map((lab, idx) => (
                <div key={idx} className="card-premium p-6 group cursor-pointer">
                  <div className="w-12 h-12 mx-auto rounded-md bg-slate-700
                                flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{lab}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
