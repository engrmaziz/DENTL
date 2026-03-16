"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How often should I visit the dentist for a checkup?",
    answer: "We recommend visiting the dentist for a routine checkup and cleaning at least twice a year (every six months). However, depending on your oral health needs, we may suggest more frequent visits."
  },
  {
    question: "Do you accept dental insurance?",
    answer: "Yes, we accept most major dental insurance plans. Our front desk team will happily walk you through your coverage and handle the claims process to ensure you maximize your benefits."
  },
  {
    question: "What should I do in a dental emergency?",
    answer: "If you experience a dental emergency, such as a knocked-out tooth, severe toothache, or a broken crown, contact us immediately. We have a 24/7 designated emergency hotline and reserve time daily for urgent cases."
  },
  {
    question: "Are your dental treatments painful?",
    answer: "Your comfort is our top priority. We use the latest pain management techniques, including topical anesthetics and gentle handling, to ensure virtually pain-free treatments."
  },
  {
    question: "How long does teeth whitening last?",
    answer: "Professional teeth whitening can last from several months up to three years. The duration depends largely on your lifestyle habits, such as smoking or consuming staining liquids like coffee and red wine."
  },
  {
    question: "What are dental implants and are they right for me?",
    answer: "Dental implants are titanium posts surgically placed into the jawbone to replace missing teeth roots. Most healthy adults are good candidates. We provide comprehensive consultations to determine if they are right for you."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, insurance, and dental health.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-colors hover:border-blue-200"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between bg-white focus:outline-none"
                >
                  <span className="font-bold text-lg text-slate-900 pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`text-blue-500 transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-3xl p-8 md:p-12 text-center border border-blue-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-primary hover:bg-blue-700 text-white font-semibold flex items-center justify-center px-8 py-4 rounded-full transition-all shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
