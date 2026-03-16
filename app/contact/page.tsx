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
            <div className="lg:col-span-5 flex flex-col gap-10">
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Get In Touch</h2>
                  <p className="text-slate-600 text-lg mb-8">
                    Whether you have questions about our services, want to schedule an appointment, or have a dental emergency, our dedicated team is ready to assist you.
                  </p>
                </div>

                <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Phone Numbers</h4>
                      <p className="text-slate-600 font-medium hover:text-primary transition-colors cursor-pointer">Main: (123) 456-7890</p>
                      <p className="text-slate-600 font-medium hover:text-primary transition-colors cursor-pointer">Emergency: (123) 999-9999</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Email Addresses</h4>
                      <p className="text-slate-600 font-medium hover:text-primary transition-colors cursor-pointer">contact@premiumdental.com</p>
                      <p className="text-slate-600 font-medium hover:text-primary transition-colors cursor-pointer">appointments@premiumdental.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Clinic Address</h4>
                      <p className="text-slate-600 leading-relaxed">
                        123 Health Avenue<br />
                        Suite 400<br />
                        Medical District, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Working Hours</h4>
                      <ul className="text-slate-600 space-y-1">
                        <li className="flex justify-between w-48"><span>Monday - Friday</span> <span>8:00 AM - 7:00 PM</span></li>
                        <li className="flex justify-between w-48"><span>Saturday</span> <span>9:00 AM - 4:00 PM</span></li>
                        <li className="flex justify-between w-48 text-red-600 font-medium mt-1"><span>Sunday: Emergency Only</span></li>
                      </ul>
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
