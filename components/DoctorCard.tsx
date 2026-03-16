"use client";

import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

interface DoctorCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
}

export default function DoctorCard({ name, role, image, bio, specialties }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
      <div className="relative h-80 w-full overflow-hidden bg-blue-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Social Overlay */}
        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
            <Linkedin size={18} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
            <Twitter size={18} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-600 hover:text-white transition-colors">
            <Mail size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-1">{name}</h3>
        <p className="text-secondary font-medium text-sm mb-4 uppercase tracking-wider">{role}</p>
        
        <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-3">
          {bio}
        </p>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3 block">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {specialties.map((spec) => (
              <span 
                key={spec} 
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
