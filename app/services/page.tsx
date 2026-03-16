import ServicesGrid from "@/components/ServicesGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Dental Services",
  description: "Explore our comprehensive range of dental treatments, from general dentistry to advanced cosmetic procedures.",
};

export default function ServicesIndexPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Our Dental Services</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive care tailored to your unique smile. Discover how we can help you achieve optimal oral health.
          </p>
        </div>
      </div>

      <ServicesGrid />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Not Sure What You Need?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Schedule a comprehensive consultation with our specialists. We'll assess your oral health and create a personalized treatment plan just for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/appointment"
              className="bg-white text-primary hover:bg-slate-50 font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              Book a Consultation <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
