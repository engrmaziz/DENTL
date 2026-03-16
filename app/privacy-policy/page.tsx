import { ShieldCheck, UserCheck, Settings, Lock, Share2, Mail, Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Premium Dental",
  description: "Learn how Premium Dental protects your personal information and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 bg-slate-50 pb-24 min-h-screen">
      {/* Premium Hero Section */}
      <div className="w-full bg-slate-900 py-24 lg:py-32 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
        
        <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-8 border border-primary/30 shadow-lg shadow-primary/20">
            <ShieldCheck size={40} className="text-blue-400" />
          </div>
          <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-4 block">Legal Documentation</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your trust is our top priority. Learn how we carefully handle and protect your personal information at Premium Dental.
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
            At <span className="text-primary font-bold">Premium Dental</span>, we take your privacy seriously. This Privacy Policy outlines the types of personal information we receive and collect when you use our website, as well as some of the steps we take to safeguard that information.
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-100 group-hover:bg-primary transition-colors" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
              <UserCheck size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We collect information you provide directly to us. For example, we collect information when you fill out a form, request an appointment, communicate with us via third-party social media sites, request customer support, or otherwise communicate with us.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">Contact Info</h4>
                  <p className="text-slate-600 text-sm">Name, email address, phone number, and postal address.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">Health Info</h4>
                  <p className="text-slate-600 text-sm">Information relating to your dental history provided voluntarily.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-100 group-hover:bg-primary transition-colors" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
              <Settings size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We use the information we collect to provide, maintain, and improve our services, including to:
              </p>
              <ul className="space-y-3">
                {[
                  "Process and manage your appointments and requests.",
                  "Send you technical notices, updates, security alerts, and support messages.",
                  "Respond to your comments, questions, and customer service requests.",
                  "Communicate with you about products, services, and events offered by Premium Dental."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0 mt-0.5"><span className="text-sm font-bold">✓</span></div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 & 4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-100 group-hover:bg-primary transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect the personal information that we collect and process about you. The measures we use are designed to provide a level of security appropriate to the risk of processing your personal information.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-100 group-hover:bg-primary transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <Share2 size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Sharing Info</h2>
            <p className="text-slate-600 leading-relaxed">
              We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights. This may include sharing information with trusted third-party service providers.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50/50 rounded-3xl p-8 md:p-10 border border-blue-100 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shadow-blue-200 mx-auto mb-6">
            <Mail size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Questions About Privacy?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to reach out to our dedicated support team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="mailto:privacy@premiumdental.com" className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-colors w-full sm:w-auto mt-4 sm:mt-0">
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
