import Image from "next/image";
import { CheckCircle2, Award, Heart, Shield } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";

export const metadata = {
  title: "About Us",
  description: "Learn about our clinic's story, values, and the expert team dedicated to your smile.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Our Story & Mission</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Dedicated to providing exceptional dental care in a comfortable, state-of-the-art environment.
          </p>
        </div>
      </div>

      {/* Clinic Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">The Beginning</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">A Legacy of Beautiful Smiles</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Founded in 2008, Premium Dental started with a simple vision: to change the way people experience dentistry. We believed that a visit to the dentist should be relaxing, transparent, and completely pain-free.
                </p>
                <p>
                  Over the past 15 years, we've grown from a small neighborhood practice to a leading dental facility. We continuously invest in the latest technology—from 3D imaging to laser dentistry—ensuring our patients receive the most advanced care possible.
                </p>
                <p>
                  Our commitment remains the same: treating every patient like family and delivering customized care that focuses on long-term oral health.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000&h=800"
                  alt="Modern Clinic Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Our Core Values</h2>
            <p className="text-lg text-slate-600">The principles that guide every interaction and procedure at our clinic.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Compassion</h3>
              <p className="text-slate-600">We listen to your concerns, understand your fears, and treat you with the utmost empathy.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Excellence</h3>
              <p className="text-slate-600">We never compromise on the quality of our materials, techniques, or the final results.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Integrity</h3>
              <p className="text-slate-600">Transparent pricing, honest assessments, and treatment plans that prioritize your health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Meet Our Specialists</h2>
            <p className="text-lg text-slate-600">An elite team of board-certified professionals dedicated to your smile.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DoctorCard
              name="Dr. Sarah Smith, DDS"
              role="Lead Prosthodontist & Founder"
              image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800&h=800"
              bio="Dr. Smith graduated top of her class from NYU College of Dentistry. With over 15 years of experience, she specializes in restorative and cosmetic dentistry, bringing thousands of smiles to life."
              specialties={["Cosmetic Dentistry", "Dental Implants", "Invisalign"]}
            />
            <DoctorCard
              name="Dr. Michael Chen, DMD"
              role="Orthodontist"
              image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800&h=800"
              bio="Dr. Chen completed his residency at UCLA. He is passionate about modern orthodontic solutions and has successfully treated severe malocclusions with both traditional brackets and clear aligners."
              specialties={["Braces", "Clear Aligners", "TMJ Treatment"]}
            />
            <DoctorCard
              name="Dr. Emily Davis, DDS"
              role="Pediatric Dentist"
              image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              bio="Known for her gentle approach, Dr. Davis makes dental visits fun and fear-free for children. She focuses on early intervention and preventative care to set kids up for a lifetime of healthy smiles."
              specialties={["Pediatric Care", "Preventative Care", "Special Needs"]}
            />
          </div>
        </div>
      </section>

      {/* Certifications Snapshot */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-slate-400 font-medium tracking-wider uppercase text-sm mb-8">Accreditations & Memberships</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            <div className="font-bold text-2xl tracking-tighter">ADA Certified</div>
            <div className="font-bold text-2xl tracking-tighter">AACD Member</div>
            <div className="font-bold text-2xl tracking-tighter">Invisalign Platinum</div>
            <div className="font-bold text-2xl tracking-tighter">Top Doc 2024</div>
          </div>
        </div>
      </section>
    </div>
  );
}
