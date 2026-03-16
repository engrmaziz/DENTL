"use client";

import { Phone, Clock, MapPin } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <div className="bg-red-600 text-white py-2 px-4 shadow-sm relative z-50">
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center text-sm font-medium">
        <div className="flex items-center gap-4 mb-2 sm:mb-0">
          <span className="flex items-center gap-1.5 bg-red-700/50 px-2 py-0.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            24/7 Emergency Dental Care
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock size={16} /> Open Now
          </span>
        </div>
        <div className="flex gap-4">
          <a href="tel:+1234567890" className="flex items-center gap-1.5 hover:text-red-100 transition-colors">
            <Phone size={16} /> Call: (123) 456-7890
          </a>
          <a href="/contact" className="hidden sm:flex items-center gap-1.5 hover:text-red-100 transition-colors">
            <MapPin size={16} /> Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
