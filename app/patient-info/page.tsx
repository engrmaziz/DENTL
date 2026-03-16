import Link from "next/link";
import { FileText, CreditCard, ShieldCheck, Clock } from "lucide-react";

export const metadata = {
  title: "Patient Information",
  description: "Important information for new and existing patients at Premium Dental Clinic.",
};

export default function PatientInfoPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Patient Information</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know before your visit, from insurance details to patient forms.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

            {/* New Patients */}
            <div className="space-y-6">
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-8">
                <FileText size={28} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">New Patients</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Welcome to Premium Dental! To save time on your first visit, please download, print, and fill out our new patient forms before your appointment.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">1</div>
                  Download Patient Registration Form
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">2</div>
                  Download Medical History Form
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">3</div>
                  Download Consent for Treatment
                </li>
              </ul>
              <button className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md">
                Download All Forms (PDF)
              </button>
            </div>

            {/* Insurance & Financing */}
            <div className="space-y-6">
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-8">
                <CreditCard size={28} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Insurance & Financing</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                We believe everyone deserves a healthy smile. We accept most major PPO insurances and offer flexible financing options.
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-6">
                <h4 className="font-bold text-slate-900 mb-3">Accepted Insurances Include:</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <span>Delta Dental</span>
                  <span>Aetna</span>
                  <span>Cigna</span>
                  <span>MetLife</span>
                  <span>Guardian</span>
                  <span>Blue Cross Blue Shield</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 italic mt-4">
                * Please call us to verify if we are in-network with your specific plan. Let us help you maximize your benefits!
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className="space-y-6 mt-8">
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8">
                <Clock size={28} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Cancellation Policy</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                We reserve time specifically for you. If you need to cancel or modify an appointment, we kindly ask for a 48-hour notice.
                Cancellations made with less than 48 hours notice may be subject to a fee. By providing early notice, you allow us to offer that time slot to another patient in need of care.
              </p>
            </div>

            {/* Privacy Policy */}
            <div className="space-y-6 mt-8">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Privacy Practices (HIPAA)</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Your medical records and personal information are strictly confidential. We fully comply with the Health Insurance Portability and Accountability Act (HIPAA) to protect your health information.
              </p>
              <Link href="/privacy-policy" className="text-primary font-semibold hover:underline mt-2 inline-block">
                Read our Notice of Privacy Practices →
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
