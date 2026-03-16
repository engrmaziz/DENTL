import { FileText, AlertTriangle, CalendarX, Copyright, Activity, Scale, Mail, Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Premium Dental",
  description: "Read the Terms of Service for using the Premium Dental website and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-20 bg-slate-50 pb-24 min-h-screen">
      {/* Premium Hero Section */}
      <div className="w-full bg-slate-900 py-24 lg:py-32 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
        
        <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-8 border border-primary/30 shadow-lg shadow-primary/20">
            <FileText size={40} className="text-blue-400" />
          </div>
          <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-4 block">Legal Documentation</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Terms of Service</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services and website. They govern the relationship between you and Premium Dental.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-2 text-sm text-slate-400">
            <Info size={16} /> Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-4xl px-4 -mt-10 relative z-20 space-y-8">
        
        {/* Intro Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 text-center">
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Welcome to <span className="text-primary font-bold">Premium Dental</span>. These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-100 group-hover:bg-primary transition-colors" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
              <Scale size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Premium Dental's website if you do not accept all of the terms and conditions stated on this page. If you disagree with any part of these terms and conditions, you must not use our website.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 (Important Highlight) */}
        <div className="bg-amber-50 rounded-3xl p-8 md:p-10 shadow-sm border border-amber-200 hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1.5 h-full bg-amber-400 group-hover:bg-amber-500 transition-colors" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Medical Disclaimer</h2>
              <p className="text-slate-700 leading-relaxed font-medium">
                The content on this website is provided for general informational purposes only and is not intended as, nor should it be considered a substitute for, professional medical or dental advice, diagnosis, or treatment. 
              </p>
              <div className="mt-4 p-4 bg-white/60 rounded-xl border border-amber-100">
                <p className="text-amber-900 text-sm italic">
                  Always seek the advice of your dentist or other qualified health provider with any questions you may have regarding a medical or dental condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 & 4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-100 group-hover:bg-primary transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
              <CalendarX size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Cancellations</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              When scheduling appointments, you agree to provide accurate information. 
            </p>
            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <p className="text-slate-700 text-sm font-medium">
                We require at least <strong className="text-rose-600">24 hours' notice</strong> for cancellations. Failure to do so may result in a cancellation fee.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-100 group-hover:bg-primary transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
              <Copyright size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              Unless otherwise stated, Premium Dental and/or its licensors own the intellectual property rights for all material on Premium Dental. All intellectual property rights are reserved. You may view and/or print pages for your own personal use.
            </p>
          </div>
        </div>

        {/* Section 5 & 6 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 5 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-100 group-hover:bg-primary transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
              <Activity size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. User Conduct</h2>
            <p className="text-slate-600 leading-relaxed">
              You must not use our website in any way that causes damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-100 group-hover:bg-primary transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
              <FileText size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify these terms. We do so by posting the updated terms on this site. Your decision to continue to visit and make use of the site constitutes your formal acceptance of the new Terms.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50/50 rounded-3xl p-8 md:p-10 border border-blue-100 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shadow-blue-200 mx-auto mb-6">
            <Mail size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Legal Inquiries?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            If you have any questions or concerns regarding our terms of service, please contact our legal and administrative team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="mailto:legal@premiumdental.com" className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-colors w-full sm:w-auto mt-4 sm:mt-0">
              Email Legal Team
            </Link>
            <Link href="/contact" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold transition-colors w-full sm:w-auto">
              Contact Clinic
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
