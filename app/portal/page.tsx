"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PortalPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.session) {
        router.push("/admin");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-900 
                    flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/portalindiaai.jpeg"
          alt="India AI Portal Background"
          fill
          className="object-cover blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" 
           style={{ backgroundSize: "50px 50px" }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <Image
              src="/logo.svg"
              alt="Netra-Anveshan AI Research Institute Logo"
              width={48}
              height={48}
              className="rounded-md object-cover border border-slate-300"
            />
            <div className="text-left">
              <span className="text-xl font-bold text-white">Netra-Anveshan AI</span>
              <span className="text-xl font-light text-white/70"> Research Institute</span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-md border border-slate-200 p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome</h1>
            <p className="text-slate-600">Sign in to the staff portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 
                            px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@netra-anveshan.org.in"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300
                         text-slate-900 placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-500
                         transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300
                           text-slate-900 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-500
                           transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700
                           transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 bg-white text-slate-700
                           focus:ring-slate-500/30 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-slate-700 hover:text-slate-900 transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold
                        bg-slate-700
                        text-white shadow-md
                        hover:bg-slate-600 hover:shadow-lg
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transform hover:-translate-y-0.5
                        transition-all duration-300
                        flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              Secured by enterprise-grade encryption
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
          >
            ← Back to main website
          </Link>
        </div>
      </div>
    </div>
  );
}
