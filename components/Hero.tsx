"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Users } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-50 pt-16 pb-32 lg:pt-24 lg:pb-40">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-[800px] h-[800px] rounded-full bg-blue-50/50 blur-3xl absolute top-0 right-0 mix-blend-multiply" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              Accepting New Patients
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Your <span className="text-primary relative inline-block">
                Smile
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>, <br />
              Our Priority
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              Advanced dental care with modern technology and compassionate service. Experience pain-free treatments in a relaxing environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/appointment" 
                className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group"
              >
                Book Appointment
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services" 
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200/60">
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-bold text-2xl mb-1">
                  15+ <span className="text-yellow-400"><Star size={20} fill="currentColor" /></span>
                </div>
                <div className="text-sm border-slate-500 font-medium text-slate-500">Years Experience</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-bold text-2xl mb-1">
                  10k+ <span className="text-blue-500"><Users size={20} /></span>
                </div>
                <div className="text-sm font-medium text-slate-500">Happy Patients</div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-2xl mb-1">
                  100% <span className="text-green-500"><Shield size={20} /></span>
                </div>
                <div className="text-sm font-medium text-slate-500">Safe Procedures</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Using a solid color / gradient placeholder for the image to avoid empty <img> tag */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 lg:rounded-3xl flex items-center justify-center text-white/50 font-medium">
              [Hero Image: Happy Patient Smiling]
            </div>
            
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/50">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Star fill="currentColor" size={24} />
              </div>
              <div>
                <div className="font-bold text-slate-900 leading-tight">4.9/5 Rating</div>
                <div className="text-sm text-slate-500 font-medium">from 500+ reviews</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
