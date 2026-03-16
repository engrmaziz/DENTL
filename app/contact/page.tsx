import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Premium Dental Clinic. Book an appointment or send us your inquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're here to help you achieve the perfect smile. Reach out to our team today.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Contact Details & Maps */}


            {/* Contact Details & Maps */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold text-slate-900">Get In Touch</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Whether you have questions about our services, want to schedule an appointment, or have a dental emergency, our dedicated team is ready to assist you.
                </p>
              </div>

              {/* Premium Tinted Card */}
              <div className="bg-blue-50/40 rounded-3xl p-8 border border-blue-100/60 shadow-sm space-y-8">

                {/* Phone */}
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Phone</h4>
                    <div className="space-y-2">
                      <p className="text-slate-600 hover:text-primary transition-colors cursor-pointer">Main: (123) 456-7890</p>
                      <p className="text-red-600 font-medium hover:text-red-700 transition-colors cursor-pointer">Emergency: (123) 999-9999</p>
                    </div>
                  </div>
                </div>

                {/* Visible Divider */}
                <div className="w-full h-px bg-blue-200/50"></div>

                {/* Email */}
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Email</h4>
                    <div className="space-y-2">
                      <p className="text-slate-600 hover:text-primary transition-colors cursor-pointer break-all">contact@premiumdental.com</p>
                    </div>
                  </div>
                </div>

                {/* Visible Divider */}
                <div className="w-full h-px bg-blue-200/50"></div>

                {/* Working Hours */}
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Clock size={24} />
                  </div>
                  <div className="w-full">
                    <h4 className="font-semibold text-slate-900 mb-4">Working Hours</h4>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex justify-between items-center pb-3 border-b border-blue-200/50">
                        <span className="font-medium">Monday - Friday</span>
                        <span className="text-slate-500">8:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-blue-200/50">
                        <span className="font-medium">Saturday</span>
                        <span className="text-slate-500">9:00 AM - 4:00 PM</span>
                      </div>
                      {/* Cleaned up Sunday Row */}
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-semibold text-red-600">Sunday</span>
                        <span className="font-semibold text-red-600">Emergency Only</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>




            {/* Contact Form & Expanded Map */}
            <div className="lg:col-span-7 flex flex-col gap-12">
              <ContactForm />

              <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 relative group">
                <MapEmbed className="h-full" />
                <div className="absolute inset-0 bg-black/5 pointer-events-none group-hover:bg-transparent transition-colors" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
