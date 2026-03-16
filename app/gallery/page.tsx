import Image from "next/image";
import SmileGallery from "@/components/SmileGallery";

export const metadata = {
  title: "Clinic Gallery",
  description: "Take a tour of our modern clinic facilities and view our amazing patient smile transformations.",
};

const clinicImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1667133295315-820bb6481730?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800&h=600",
  "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1626878880028-0438b1403b3f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function ClinicGalleryPage() {
  return (
    <div className="pt-20">

      {/* Transformations Gallery Component */}
      <SmileGallery />

      {/* Clinic Interior Gallery */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Take a Tour</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Our Modern Facilities</h2>
            <p className="text-lg text-slate-600">
              We've designed our clinic to feel less like a hospital and more like a relaxing lounge. Experience dental care in a comfortable, state-of-the-art environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicImages.map((src, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group border border-slate-100">
                <Image
                  src={src}
                  alt={`Clinic Photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
