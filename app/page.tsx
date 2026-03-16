import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import SmileGallery from "@/components/SmileGallery";
import Testimonials from "@/components/Testimonials";
import DoctorCard from "@/components/DoctorCard";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import GoogleReviews from "@/components/GoogleReviews";
import { ArrowRight, Phone, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />

      {/* Meet the Doctor Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Meet The Team</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Expert Care From Leading Professionals</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our clinic is led by top-rated dental professionals who are passionate about bringing you the best in oral healthcare. We combine artistic precision with advanced medical science to ensure your smile is not only beautiful but healthy from the roots up.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-semibold text-slate-800">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary">✓</div>
                  Board Certified Specialists
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-800">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary">✓</div>
                  Over 15 Years of Experience
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-800">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary">✓</div>
                  Continuous Medical Education
                </li>
              </ul>

              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-md group"
              >
                Learn More About Us <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
              <DoctorCard 
                name="Dr. Sarah Smith, DDS"
                role="Lead Prosthodontist & Founder"
                image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800&h=800"
                bio="Dr. Smith graduated top of her class from NYU College of Dentistry. With over 15 years of experience, she specializes in restorative and cosmetic dentistry, bringing thousands of smiles to life."
                specialties={["Cosmetic Dentistry", "Dental Implants", "Invisalign"]}
              />
            </div>
          </div>
        </div>
      </section>

      <SmileGallery />
      
      <Testimonials />

      {/* Contact & Location Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">We're Here for Your Smile</h2>
            <p className="text-lg text-slate-600">
              Have a question or want to schedule an appointment? Reach out to us anytime, or visit our clinic in person.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details & Maps */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                      <p className="text-slate-600">(123) 456-7890</p>
                      <p className="text-sm text-slate-500 mt-1">Mon-Fri 8am-7pm, Sat 9am-4pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Clinic Address</h4>
                      <p className="text-slate-600 leading-relaxed">123 Health Avenue,<br />Medical District, NY 10001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shadow-sm shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Emergency Care</h4>
                      <p className="text-red-600 font-medium">Available 24/7</p>
                      <p className="text-sm text-slate-500 mt-1">Call the emergency hotline immediately.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-64 rounded-3xl overflow-hidden shadow-sm">
                <MapEmbed />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
              <div className="mt-8">
                 <GoogleReviews />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
