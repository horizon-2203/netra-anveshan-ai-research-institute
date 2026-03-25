"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", organization: "", subject: "", message: "" });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: MapPin, label: "Address", value: "1200 Vigyan Marg\nTechnik Nagar, India 110001", color: "bg-slate-700" },
    { icon: Phone, label: "Phone", value: "+91 9914173314", color: "bg-slate-700" },
    { icon: Mail, label: "Email", value: "info@netra-anveshan.org.in", color: "bg-slate-700" },
    { icon: Clock, label: "Hours", value: "Mon-Fri: 9 AM - 5 PM", color: "bg-slate-700" },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 
                         border border-white/20 text-white/90 text-sm font-medium mb-6">
                Contact Us
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Contact
                <span className="block mt-2 text-slate-200">
                  Our Team
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                क्या आपके पास कोई प्रश्न है या आप सहयोग करना चाहते हैं? हम आपसे सुनना पसंद करेंगे।
              </p>
            </div>

            <div className="relative h-72 md:h-96 rounded-md overflow-hidden border border-slate-700">
              <Image
                src="/cntus.jpeg"
                alt="Contact Us"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className={`w-12 h-12 rounded-md ${info.color}
                                      flex items-center justify-center shadow-lg flex-shrink-0
                                      group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          {info.label}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 h-48 rounded-md bg-gray-100 dark:bg-gray-900
                            flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-premium p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Fill out the form and we will get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30
                                  flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you for contacting us. We will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                   focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500
                                   transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                   focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500
                                   transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Organization
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                   focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500
                                   transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject *
                        </label>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                   focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500
                                   transition-all duration-300"
                        >
                          <option value="">Select Subject</option>
                          <option value="collaboration">Research Collaboration</option>
                          <option value="partnership">Industry Partnership</option>
                          <option value="careers">Career Opportunities</option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500
                                 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Message
                          <Send className="w-5 h-5" />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
