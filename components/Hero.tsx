import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
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
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: "1s" }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="inline-block px-4 py-2 rounded-full 
                         bg-white/10 backdrop-blur-sm border border-white/20
                         text-white/90 text-sm font-medium mb-6">
            🚀 🇮🇳 अग्रणी AI अनुसंधान 1987 से
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in"
            style={{ animationDelay: "0.4s" }}>
          Netra Anveshan
          <span className="block mt-2 text-slate-200">
            Institute
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 fade-in"
           style={{ animationDelay: "0.6s" }}>
          मानवता की भलाई के लिए कृत्रिम बुद्धिमत्ता को आगे बढ़ाना
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in"
             style={{ animationDelay: "0.8s" }}>
          <a href="/research" className="btn-primary group">
            Explore Research
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/contact" className="btn-secondary">
            Get in Touch
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
  );
}
