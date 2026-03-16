import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours_weekday: string;
  hours_saturday: string;
  hours_sunday: string;
}

const defaults: ContactInfo = {
  phone: "(123) 456-7890",
  email: "contact@premiumdental.com",
  address: "123 Health Avenue, Medical District,\nNew York, NY 10001",
  hours_weekday: "Mon-Fri: 8:00 AM - 7:00 PM",
  hours_saturday: "Sat: 9:00 AM - 4:00 PM",
  hours_sunday: "Sunday: 24/7 Emergencies Only",
};

async function getContactInfo(): Promise<ContactInfo> {
  try {
    const { data, error } = await supabase
      .from("clinic_settings")
      .select("key, value")
      .in("key", ["phone", "email", "address", "hours_weekday", "hours_saturday", "hours_sunday"]);

    if (error || !data) return defaults;

    const map: Record<string, string> = {};
    data.forEach(({ key, value }: { key: string; value: string }) => {
      map[key] = value;
    });

    return {
      phone: map.phone || defaults.phone,
      email: map.email || defaults.email,
      address: map.address || defaults.address,
      hours_weekday: map.hours_weekday || defaults.hours_weekday,
      hours_saturday: map.hours_saturday || defaults.hours_saturday,
      hours_sunday: map.hours_sunday || defaults.hours_sunday,
    };
  } catch {
    return defaults;
  }
}

export default async function Footer() {
  const contact = await getContactInfo();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12 text-center md:text-left">
          {/* Brand Info */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Premium Dental Logo"
                width={225}
                height={75}
                className="h-28 w-auto object-contain bg-transparent"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Advanced dental care with modern technology and compassionate service. Your smile is our top priority.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">
              <li><Link href="/about" className="hover:text-secondary transition-colors block">About Our Clinic</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors block">Dental Services</Link></li>
              <li><Link href="/gallery" className="hover:text-secondary transition-colors block">Smile Gallery</Link></li>
              <li><Link href="/patient-info" className="hover:text-secondary transition-colors block">Patient Information</Link></li>
              <li><Link href="/faq" className="hover:text-secondary transition-colors block">FAQs</Link></li>
              <li><Link href="/blog" className="hover:text-secondary transition-colors block">Dental Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">Our Services</h3>
            <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">
              <li><Link href="/services/general-dentistry" className="hover:text-secondary transition-colors block">General Dentistry</Link></li>
              <li><Link href="/services/teeth-whitening" className="hover:text-secondary transition-colors block">Teeth Whitening</Link></li>
              <li><Link href="/services/orthodontics" className="hover:text-secondary transition-colors block">Orthodontics</Link></li>
              <li><Link href="/services/dental-implants" className="hover:text-secondary transition-colors block">Dental Implants</Link></li>
              <li><Link href="/services/root-canal" className="hover:text-secondary transition-colors block">Root Canal Treatment</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors block text-primary font-medium">View All Services &rarr;</Link></li>
            </ul>
          </div>

          {/* Contact Details (dynamic from Supabase) */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">Contact Us</h3>
            <ul className="space-y-4 text-sm flex flex-col items-center md:items-start">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span className="text-slate-400 whitespace-pre-line">{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <a
                  href={`tel:${contact.phone.replace(/\D/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-secondary shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  {contact.hours_weekday}<br />
                  {contact.hours_saturday}<br />
                  <span className="text-red-400 font-medium">{contact.hours_sunday}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Premium Dental Clinic. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
