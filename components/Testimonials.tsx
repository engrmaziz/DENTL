"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Olivia Anderson",
      role: "Patient for 2 years",
      content: "I've always been terrified of the dentist, but Dr. Smith and the team completely changed my perspective. The root canal was entirely painless, and they made sure I was comfortable the entire time.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Invisalign Patient",
      content: "The level of professionalism here is unmatched. My teeth alignment journey was smooth, and the modern equipment they use is fascinating. I highly recommend Premium Dental to anyone.",
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      role: "Cosmetic Dentistry",
      content: "Got my veneers done here and I couldn't be happier with the results! My smile looks so natural and I finally have the confidence to show my teeth in photos.",
      rating: 5,
    }
  ];

  return (
    <section className="py-24 bg-blue-50/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Patient Stories</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Hear From Our Happy Patients</h2>
          <p className="text-lg text-slate-600">
            Don't just take our word for it. Read what our patients have to say about their experiences at Premium Dental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full relative"
            >
              <div className="absolute top-8 right-8 text-blue-100">
                <Quote size={48} />
              </div>
              <div className="flex gap-1 text-yellow-400 mb-6 relative z-10">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" stroke="none" />
                ))}
              </div>
              <p className="text-slate-600 mb-8 italic flex-1 relative z-10">"{t.content}"</p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <span className="text-sm text-slate-500">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
