import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];
  
  if (!service) {
    return {
      title: "Service Not Found | Premium Dental",
      description: "The requested dental service could not be found.",
    };
  }
  
  return {
    title: `${service.title} | Premium Dental`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-20 bg-white pb-24">
      {/* Cover Image & Title */}
      <div className="w-full h-[300px] lg:h-[400px] relative bg-slate-900 flex items-center justify-center">
        <Image
          src={service.cover}
          alt={service.title}
          fill
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-medium mb-4">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={14} />
            <span className="text-white">{service.title}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4">{service.title}</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">{service.description}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview & Who it's for */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {service.whoItsFor}
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Procedure */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">The Procedure</h2>
              <div className="space-y-6">
                {service.procedure.map((step: any, i: number) => (
                  <div key={i} className="flex gap-6 relative">
                    {/* Line for timeline */}
                    {i !== service.procedure.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-[-24px] w-[2px] bg-slate-100" />
                    )}
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0 relative z-10 shadow-md">
                      {i + 1}
                    </div>
                    <div className="pt-2 pb-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{step.step}</h4>
                      <p className="text-slate-600 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recovery */}
            <section className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                ⏱️ Recovery Timeline
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {service.recovery}
              </p>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <HelpCircle className="text-primary" size={32} /> FAQs
              </h2>
              <div className="space-y-4">
                {service.faqs.map((faq: any, i: number) => (
                  <div key={i} className="border border-slate-200 rounded-2xl p-6">
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{faq.q}</h4>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-slate-100 shadow-xl rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to start?</h3>
              <p className="text-slate-600 mb-8">
                Book a consultation today to discuss if {service.title.toLowerCase()} is right for you.
              </p>
              <Link 
                href={`/appointment?reason=${encodeURIComponent(service.title)}`}
                className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md flex items-center justify-center mb-4"
              >
                Book Consultation
              </Link>
              <a 
                href="tel:+1234567890"
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-4 rounded-xl transition-all flex items-center justify-center"
              >
                Call Us Instead
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
