"use client";

interface MapEmbedProps {
  className?: string;
}

export default function MapEmbed({ className = "" }: MapEmbedProps) {
  return (
    <div className={`w-full overflow-hidden bg-slate-100 rounded-xl shadow-sm ${className}`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183792036087!2d-73.98773198459345!3d40.75797437932688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1684521408892!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "350px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Clinic Location Map"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
