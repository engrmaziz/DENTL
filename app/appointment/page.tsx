import BookingForm from "@/components/BookingForm";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Book an Appointment",
  description: "Schedule your dental visit online. Fast, easy, and secure appointment booking.",
};

export default function AppointmentPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Schedule Your Visit</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Take the first step towards a healthier, brighter smile. We look forward to seeing you.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-blue-50/50 blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] rounded-full bg-blue-50/30 blur-3xl z-0" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Content */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Why Choose Us?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="text-green-500" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Expert Team</h4>
                      <p className="text-slate-600 leading-relaxed mt-1">Our highly trained specialists are leaders in their respective fields.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="text-green-500" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Modern Technology</h4>
                      <p className="text-slate-600 leading-relaxed mt-1">We utilize the latest equipment to ensure accurate diagnostics and pain-free treatments.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="text-green-500" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Comprehensive Care</h4>
                      <p className="text-slate-600 leading-relaxed mt-1">From routine cleanings to complete smile makeovers, we handle it all.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Emergency Visit?</h3>
                <p className="text-slate-300 mb-6">If you are experiencing severe pain, swelling, or have a knocked-out tooth, please do not use this form. Call us immediately.</p>
                <a href="tel:+1234567890" className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors text-center w-full shadow-lg shadow-red-500/30">
                  Call Emergency Line
                </a>
              </div>
            </div>

            {/* Right Content: Booking Form */}
            <div>
              <BookingForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
