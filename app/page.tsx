"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme from localStorage
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const visionTabs = [
    {
      value: "350+",
      label: "Researchers",
      image: "/researcher.jpeg",
      detail: "राष्ट्रीय और वैश्विक संस्थानों के साथ उच्च-स्तरीय अनुसंधान सहयोग"
    },
    {
      value: "45",
      label: "Active Projects",
      image: "/project.jpg",
      detail: "स्वास्थ्य, शिक्षा, प्रशासन और सुरक्षा जैसे क्षेत्रों के लिए एआई समाधान"
    },
    {
      value: "120+",
      label: "Publications",
      image: "/publi.jpeg",
      detail: "पीयर-रिव्यूड जर्नल्स और कॉन्फ्रेंस में प्रकाशित शोध कार्य"
    },
  ];

  const teamMembers = [
    // Researchers
    { name: "Dr. Shreyansh Samir", role: "Senior Researcher", info: "Previously worked with national policy labs and AI governance taskforces.", email: "dr.shreyansh.samir@netra-anveshan.org.in" },
    { name: "Dr. Milind Rai", role: "Research Scientist", info: "Prior experience in multimodal model evaluation and public-sector AI deployments.", email: "dr.milind.rai@netra-anveshan.org.in" },
    // Developers
    { name: "Utpal Kant", role: "Lead Developer", info: "Built secure enterprise platforms for data-intensive government programs.", email: "utpal.kant@netra-anveshan.org.in" },
    { name: "Nitish Kumar", role: "Senior Developer", info: "Worked across large-scale analytics systems and AI product engineering.", email: "nitish.kumar@netra-anveshan.org.in" },
    // Professors
    { name: "Dr. Bheem Shukla", role: "Professor", info: "Formerly associated with international AI curriculum and ethics initiatives.", email: "dr.bheem.shukla@netra-anveshan.org.in" },
    { name: "Dr. Samay Raina", role: "Assistant Professor", info: "Contributed to AI research programs spanning academia and applied innovation.", email: "dr.samay.raina@netra-anveshan.org.in" },
  ];

  const news = [
    {
      title: "New AI Safety Framework Released",
      date: "March 2026",
      description: "Our groundbreaking research on responsible AI development sets new industry standards.",
      tag: "Research",
      image: "/iitd.jpeg"
    },
    {
      title: "Next-Gen NLP Models",
      date: "February 2026",
      description: "Breakthrough in natural language understanding achieves state-of-the-art performance.",
      tag: "Innovation",
      image: "/nlp.jpeg"
    },
    {
      title: "Computer Vision Advances",
      date: "January 2026",
      description: "New object detection algorithms outperform existing benchmarks by 40%.",
      tag: "Technology",
      image: "/visioncs.jpeg"
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <Navbar showThemeToggle={true} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/indiaglobe.png"
            alt="Global AI Research"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/22" />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-700/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-700/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-700/5 rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block px-4 py-2 rounded-full 
                           bg-black/20 backdrop-blur-sm border border-white/25
                           text-white/90 text-sm font-medium mb-6">
              Pioneering AI Research Since 2025
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in"
              style={{ animationDelay: "0.4s" }}>
            Netra-Anveshan AI
            <span className="block mt-2 text-slate-100">
              Research Institute
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 fade-in"
             style={{ animationDelay: "0.6s" }}>
            मानवता के हित के लिए कृत्रिम बुद्धिमत्ता को आगे बढ़ाना
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in"
               style={{ animationDelay: "0.8s" }}>
            <a href="/research" className="btn-primary group">
              Explore Research
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              हमारी दृष्टि मानव-केंद्रित, पारदर्शी और जिम्मेदार कृत्रिम बुद्धिमत्ता समाधान विकसित करना है,
              जो समाज, शिक्षा, स्वास्थ्य और शासन में वास्तविक परिवर्तन ला सकें।
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visionTabs.map((tab, idx) => (
              <div key={idx} className="relative h-[420px] rounded-md overflow-hidden border border-gray-300 dark:border-gray-700">
                <Image
                  src={tab.image}
                  alt={tab.label}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <p className="text-4xl font-bold text-white mb-1">{tab.value}</p>
                  <h3 className="text-xl font-semibold text-white mb-3">{tab.label}</h3>
                  <p className="text-sm text-white/90 leading-relaxed">{tab.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 dark:bg-gray-900 transition-colors duration-500" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-slate-300 dark:border-slate-600 shadow-md">
                <Image
                  src="/modiji.png"
                  alt="Hon'ble PM Shri Narendra Modi"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide text-center lg:text-left">
                HON'BLE PM SHRI NARENDRA MODI
              </p>
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 rounded-full 
                             bg-blue-100 dark:bg-blue-900/30 
                             text-blue-600 dark:text-blue-400 
                             text-sm font-medium mb-6">
                Our Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Building the Future:
                <span className="text-slate-700 dark:text-slate-300"> Artificial Intelligence</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Netra-Anveshan AI Research Institute मानवता के हित के लिए कृत्रिम बुद्धिमत्ता अनुसंधान 
                को आगे बढ़ाने के लिए समर्पित है। 2025 में स्थापित, हम एआई नवाचार की अग्रिम पंक्ति में रहे हैं, 
                और मशीन लर्निंग, प्राकृतिक भाषा संसाधन तथा कंप्यूटर विज़न की सीमाओं को आगे बढ़ा रहे हैं।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full 
                           bg-purple-100 dark:bg-purple-900/30 
                           text-purple-600 dark:text-purple-400 
                           text-sm font-medium mb-6">
              Our Team
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Experts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              विश्व-स्तरीय शोधकर्ता, डेवलपर और प्रोफेसर
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card p-6">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium mb-3 text-blue-700 dark:text-blue-300">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {member.info}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                    {member.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full 
                           bg-orange-100 dark:bg-orange-900/30 
                           text-orange-600 dark:text-orange-400 
                           text-sm font-medium mb-6">
              Latest News
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              News & Insights
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {news.map((item, idx) => (
              <article 
                key={idx} 
                className="group card-premium p-6 hover:border-orange-500/50 cursor-pointer"
              >
                <div className="relative h-44 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium
                                 bg-orange-100 dark:bg-orange-900/30 
                                 text-orange-600 dark:text-orange-400">
                    {item.tag}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3
                             group-hover:text-orange-600 dark:group-hover:text-orange-400
                             transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center text-orange-600 dark:text-orange-400 
                               font-medium text-sm group-hover:gap-2 transition-all duration-300">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
