"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { servicesData } from "@/lib/data";

const services = Object.entries(servicesData).map(([slug, service]) => ({
  title: service.title,
  description: service.description,
  href: `/services/${slug}`,
  icon: service.icon,
}));

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Comprehensive Dental Care</h2>
          <p className="text-lg text-slate-600">
            We offer a wide range of state-of-the-art dental procedures to ensure you and your family maintain optimal oral health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-slate-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <service.icon strokeWidth={1.5} size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 line-clamp-2">
                {service.description}
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" /> Pain-free treatment
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" /> Expert specialists
                </li>
              </ul>
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 font-semibold text-primary group-hover:text-blue-700 transition-colors"
              >
                Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
