"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    text: "The best dental experience I've ever had. Dr. Smith is incredibly gentle and the staff is so welcoming.",
    date: "2 weeks ago"
  },
  {
    id: 2,
    author: "Michael Chen",
    rating: 5,
    text: "Very professional clinic with state-of-the-art equipment. Made my root canal completely painless.",
    date: "1 month ago"
  },
  {
    id: 3,
    author: "Emily Davis",
    rating: 5,
    text: "Got my teeth whitened here and the results are amazing. Highly recommend their services!",
    date: "2 months ago"
  }
];

export default function GoogleReviews() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
          <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 leading-tight">Google Reviews</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="font-bold text-slate-800">4.9</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" stroke="none" />
              ))}
            </div>
            <span className="text-sm text-slate-500">(128+ reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border-b border-slate-100 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-between pl-1 mb-2">
              <span className="font-semibold text-slate-800 text-sm">{review.author}</span>
              <span className="text-xs text-slate-400">{review.date}</span>
            </div>
            <div className="flex text-yellow-400 mb-2 pl-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" stroke="none" />
              ))}
            </div>
            <p className="text-sm text-slate-600 pl-1 leading-relaxed">
              "{review.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
