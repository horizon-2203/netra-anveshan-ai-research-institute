"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Target } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const leadership = [
    { name: "Dr. Shreyansh Samir", role: "Senior Researcher", info: "Previously worked with national policy labs and AI governance taskforces.", email: "dr.shreyansh.samir@netra-anveshan.org.in" },
    { name: "Dr. Milind Rai", role: "Research Scientist", info: "Prior experience in multimodal model evaluation and public-sector AI deployments.", email: "dr.milind.rai@netra-anveshan.org.in" },
    { name: "Utpal Kant", role: "Lead Developer", info: "Built secure enterprise platforms for data-intensive government programs.", email: "utpal.kant@netra-anveshan.org.in" },
    { name: "Nitish Kumar", role: "Senior Developer", info: "Worked across large-scale analytics systems and AI product engineering.", email: "nitish.kumar@netra-anveshan.org.in" },
    { name: "Dr. Bheem Shukla", role: "Professor", info: "Formerly associated with international AI curriculum and ethics initiatives.", email: "dr.bheem.shukla@netra-anveshan.org.in" },
    { name: "Dr. Samay Raina", role: "Assistant Professor", info: "Contributed to AI research programs spanning academia and applied innovation.", email: "dr.samay.raina@netra-anveshan.org.in" },
  ];

  const divisions = [
    { name: "Machine Learning Division", description: "Deep learning, neural networks, and advanced ML algorithms", color: "bg-slate-700" },
    { name: "Natural Language Processing", description: "Language models, text analysis, and conversational AI", color: "bg-slate-700" },
    { name: "Computer Vision", description: "Image recognition, object detection, and visual understanding", color: "bg-slate-700" },
    { name: "AI Ethics & Safety", description: "Responsible AI development and ethical guidelines", color: "bg-slate-700" },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-900">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm 
                             border border-white/20 text-white/90 text-sm font-medium mb-6">
                About Netra Anveshan
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Leading AI Research
                <span className="block mt-2 text-slate-200">
                  Since 2025
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                मानवता के लिए कृत्रिम बुद्धिमत्ता को आगे बढ़ाने की दिशा में 
                अग्रणी अनुसंधान, नवाचार और समर्पण की नई यात्रा।
              </p>
            </div>

            <div className="relative h-72 md:h-96 rounded-md overflow-hidden border border-slate-700">
              <Image
                src="/tiger.jpg"
                alt="Tiger"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Institute Gallery */}
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="card-premium p-6 max-w-7xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Institute Snapshots</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="relative h-64 md:h-80 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image src="/snap1.jpeg" alt="Institute Snapshot 1" fill className="object-cover" />
              </div>
              <div className="relative h-64 md:h-80 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image src="/snap2.jpeg" alt="Institute Snapshot 2" fill className="object-cover" />
              </div>
              <div className="relative h-64 md:h-80 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image src="/snap3.jpeg" alt="Institute Snapshot 3" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="card-premium p-8">
              <div className="w-14 h-14 rounded-md bg-slate-700
                            flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                मानव धारणा को सशक्त बनाने, समझ को और गहरा करने तथा समाज में सार्थक योगदान देने वाली 
                प्रणालियाँ विकसित करके कृत्रिम बुद्धिमत्ता की सीमाओं को आगे बढ़ाना।
              </p>
            </div>

            {/* Mission */}
            <div className="card-premium p-8">
              <div className="w-14 h-14 rounded-md bg-slate-700
                            flex items-center justify-center mb-6 shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">●</span>
                  एआई, एमएल और संज्ञानात्मक प्रणालियों में अत्याधुनिक अनुसंधान करना
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">●</span>
                  मानव निर्णय-निर्माण को सशक्त बनाने वाली प्रौद्योगिकियाँ विकसित करना
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">●</span>
                  नैतिक, पारदर्शी और जिम्मेदार एआई विकास को बढ़ावा देना
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">●</span>
                  शोधकर्ताओं और नवाचारकर्ताओं की अगली पीढ़ी का मार्गदर्शन और विकास करना
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 
                           text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              Leadership
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Executive Team</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.map((person, idx) => (
              <div key={idx} className="team-card p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{person.name}</h3>
                <p className="text-orange-600 dark:text-orange-400 font-medium mb-3">{person.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{person.info}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{person.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Divisions */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 
                           text-orange-600 dark:text-orange-400 text-sm font-medium mb-6">
              Our Focus
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Research Divisions</h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-5">
            {divisions.map((division, idx) => (
              <div key={idx} className="card-premium p-6 border-l-4 border-l-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-slate-700 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {division.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{division.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
