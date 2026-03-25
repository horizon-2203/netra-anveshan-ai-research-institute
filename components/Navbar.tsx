"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  showThemeToggle?: boolean;
}

export default function Navbar({ showThemeToggle = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/research", label: "Research" },
    { href: "/facilities", label: "Facilities" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
                  ${scrolled 
                    ? 'bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700' 
                    : 'bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700'
                  }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Organization Logo"
                width={40}
                height={40}
                className="rounded-md object-cover border border-slate-300 dark:border-slate-700"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className={`text-xl font-bold transition-colors duration-300
                              ${scrolled 
                                ? 'text-gray-900 dark:text-white' 
                                : 'text-gray-900 dark:text-white'
                              }`}>
                Netra-Anveshan AI
              </span>
              <span className={`text-lg font-light transition-colors duration-300
                              ${scrolled 
                                ? 'text-gray-600 dark:text-gray-400' 
                                : 'text-gray-600 dark:text-gray-400'
                              }`}>
                {" "}Research Institute
              </span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-4 py-2 rounded-md border font-medium
                           transition-all duration-300 ease-out
                           hover:bg-slate-100 dark:hover:bg-slate-700
                           ${scrolled 
                             ? 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-slate-300 dark:border-slate-600' 
                             : 'text-gray-700 dark:text-gray-300 border-slate-300 dark:border-slate-600'
                           }`}
              >
                {link.label}
              </Link>
            ))}
            
            {showThemeToggle && <ThemeToggle />}
            
            <Link 
              href="/portal" 
              className="ml-2 px-5 py-2.5 rounded-md font-semibold
                        bg-slate-800 text-white shadow-md
                        hover:bg-slate-900 hover:shadow-lg
                        hover:-translate-y-0.5
                        transition-all duration-300"
            >
              Staff Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            {showThemeToggle && <ThemeToggle />}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300
                         ${scrolled 
                           ? 'text-gray-900 dark:text-white' 
                           : 'text-white'
                         }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out
                     ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="py-4 space-y-2 bg-white/95 dark:bg-gray-900/95 
                         rounded-md mb-4 px-4 border border-slate-200 dark:border-slate-700">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block py-3 px-4 rounded-xl font-medium
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/portal" 
              className="block py-3 px-4 rounded-md font-semibold text-center
                        bg-slate-800
                        text-white mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
