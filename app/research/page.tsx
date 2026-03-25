"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Cpu, MessageSquare, Eye, Shield, ArrowRight, ExternalLink } from "lucide-react";

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const divisions = [
    {
      id: 0,
      name: "Machine Learning",
      icon: Cpu,
      color: "bg-slate-700",
      description: "Deep learning, neural networks, and advanced ML algorithms pushing the boundaries of AI.",
      projects: [
        { name: "Aurora ML Framework", status: "Active", progress: 75 },
        { name: "Neural Architecture Search", status: "Active", progress: 60 },
        { name: "Efficient Training Methods", status: "Planning", progress: 20 },
      ],
      stats: { papers: 7, citations: 320, researchers: 12 }
    },
    {
      id: 1,
      name: "Natural Language Processing",
      icon: MessageSquare,
      color: "bg-slate-700",
      description: "Language models, text analysis, and conversational AI systems that understand human communication.",
      projects: [
        { name: "Next-Gen NLP Models", status: "Active", progress: 85 },
        { name: "Multilingual Understanding", status: "Active", progress: 50 },
        { name: "Context-Aware Dialogue", status: "Review", progress: 90 },
      ],
      stats: { papers: 6, citations: 280, researchers: 10 }
    },
    {
      id: 2,
      name: "Computer Vision",
      icon: Eye,
      color: "bg-slate-700",
      description: "Image recognition, object detection, and visual understanding systems for real-world applications.",
      projects: [
        { name: "Computer Vision Pipeline", status: "Review", progress: 95 },
        { name: "3D Scene Understanding", status: "Active", progress: 40 },
        { name: "Medical Imaging AI", status: "Active", progress: 70 },
      ],
      stats: { papers: 8, citations: 410, researchers: 14 }
    },
    {
      id: 3,
      name: "AI Ethics & Safety",
      icon: Shield,
      color: "bg-slate-700",
      description: "Responsible AI development, ethical guidelines, and safety frameworks for trustworthy systems.",
      projects: [
        { name: "AI Safety Framework", status: "Active", progress: 80 },
        { name: "Bias Detection Tools", status: "Active", progress: 65 },
        { name: "Explainable AI", status: "Planning", progress: 30 },
      ],
      stats: { papers: 5, citations: 190, researchers: 9 }
    },
  ];

  if (!mounted) return null;

  const activeDivision = divisions[activeTab];
  const ActiveIcon = activeDivision.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full 
                           bg-white/10 border border-white/20
                           text-white/90 text-sm font-medium mb-6">
              Research and Innovation
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Building the Future:
              <span className="block mt-2 pb-1 leading-[1.15] text-slate-200">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              एआई के कई क्षेत्रों में हमारे अत्याधुनिक अनुसंधान का अन्वेषण करें,
              मूलभूत एल्गोरिद्म से लेकर वास्तविक दुनिया के अनुप्रयोगों तक।
            </p>
          </div>

            <div className="relative h-72 md:h-96 rounded-md overflow-hidden border border-slate-700">
              <Image
                src="/researchimg.jpeg"
                alt="Research"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Tabs Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="container mx-auto px-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {divisions.map((division, idx) => {
              const Icon = division.icon;
              return (
                <button
                  key={division.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md border font-medium
                             transition-all duration-300 ease-out
                             ${activeTab === idx 
                               ? 'bg-slate-800 text-white border-slate-800 shadow-sm' 
                               : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                             }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{division.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Division Info */}
            <div className="lg:col-span-1">
              <div className="card-premium p-8 sticky top-24">
                <div className={`w-16 h-16 rounded-md ${activeDivision.color}
                                flex items-center justify-center mb-6 shadow-lg`}>
                  <ActiveIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {activeDivision.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {activeDivision.description}
                </p>
                
                  <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {activeDivision.stats.papers}
                    </div>
                    <div className="text-xs text-gray-500">Papers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {activeDivision.stats.citations}
                    </div>
                    <div className="text-xs text-gray-500">Citations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {activeDivision.stats.researchers}
                    </div>
                    <div className="text-xs text-gray-500">Researchers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Current Projects
              </h3>
              <div className="space-y-4">
                {activeDivision.projects.map((project, idx) => (
                  <div 
                    key={idx}
                    className="card-premium p-6 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white
                                   group-hover:text-orange-600 dark:group-hover:text-orange-400
                                   transition-colors duration-300">
                        {project.name}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                                      ${project.status === 'Active' 
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                                        : project.status === 'Review'
                                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${activeDivision.color}
                                     transition-all duration-500 ease-out`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-orange-600 dark:text-orange-400 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-md overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-800">
            <div className="grid lg:grid-cols-2 items-stretch">
              <div className="relative min-h-[260px] lg:min-h-[360px]">
                <Image
                  src="/colab.jpeg"
                  alt="Collaboration"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-10 md:p-14 flex flex-col justify-center text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Collaborate With Us
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  हम विश्वविद्यालयों, उद्योग अग्रणियों और विश्वभर की अनुसंधान संस्थाओं
                  के साथ साझेदारी का स्वागत करते हैं।
                </p>
                <div>
                  <a href="/contact" className="btn-primary">
                    Become a Partner
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
