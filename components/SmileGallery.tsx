"use client";

import { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { motion, AnimatePresence } from "framer-motion";

const transformations = [
  {
    id: 1,
    title: "Invisalign Treatment",
    category: "Orthodontics",
    before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800&h=600",
    after: "https://images.unsplash.com/photo-1590625691060-e83ee91e84e1?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    id: 2,
    title: "Porcelain Veneers",
    category: "Cosmetic",
    before: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800&h=600",
    after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    id: 3,
    title: "Teeth Whitening",
    category: "Cosmetic",
    before: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&q=80&w=800&h=600",
    after: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800&h=600",
  }
];

export default function SmileGallery() {
  const [activeTab, setActiveTab] = useState("All");
  
  const categories = ["All", ...Array.from(new Set(transformations.map(t => t.category)))];
  
  const filtered = activeTab === "All" 
    ? transformations 
    : transformations.filter(t => t.category === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Real Results</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Before & After Smile Gallery</h2>
          <p className="text-lg text-slate-600">
            Slide to see the incredible transformations of our actual patients.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === cat 
                  ? "bg-primary text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
              >
                <div className="aspect-[4/3] w-full relative">
                  {/* Using unoptimized standard images as placeholders for the template */}
                  <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src={item.before} style={{ objectFit: 'cover' }} alt={`${item.title} Before`} />}
                    itemTwo={<ReactCompareSliderImage src={item.after} style={{ objectFit: 'cover' }} alt={`${item.title} After`} />}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-secondary font-medium mb-1">{item.category}</div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
