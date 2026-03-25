import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Facilities", href: "/facilities" },
    { label: "Contact", href: "/contact" },
  ];

  const research = [
    { label: "Machine Learning", href: "/research" },
    { label: "Natural Language Processing", href: "/research" },
    { label: "Computer Vision", href: "/research" },
    { label: "AI Ethics", href: "/research" },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gray-700" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.svg"
                alt="Netra-Anveshan AI Research Institute Logo"
                width={40}
                height={40}
                className="rounded-md object-cover border border-slate-600"
              />
              <div>
                <span className="text-lg font-bold">Netra-Anveshan AI</span>
                <span className="text-lg font-light text-gray-400"> Research Institute</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Leading AI research since 2025. Pioneering breakthrough discoveries 
              for the benefit of humanity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              Quick Links
              <div className="flex-1 h-px bg-gray-700 ml-4" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300
                             flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 
                                   group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              Research Areas
              <div className="flex-1 h-px bg-gray-700 ml-4" />
            </h4>
            <ul className="space-y-3">
              {research.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300
                             flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 
                                   group-hover:opacity-100 transition-opacity duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              Contact Us
              <div className="flex-1 h-px bg-gray-700 ml-4" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  1200 Vigyan Marg<br />
                  Technik Nagar, India 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-400">info@netra-anveshan.org.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              2026 Netra-Anveshan AI Research Institute. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
