import { Stethoscope, Sparkles, ShieldCheck, HeartPulse, Bone, Activity } from "lucide-react";

export const servicesData: Record<string, any> = {
  "general-dentistry": {
    title: "General Dentistry",
    description: "Comprehensive check-ups, cleanings, and preventative care.",
    cover: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200",
    whoItsFor: "Everyone! Routine dental visits are essential for patients of all ages to maintain good oral hygiene and catch potential issues early.",
    benefits: [
      "Prevents cavities and gum disease",
      "Keeps breath fresh",
      "Early detection of oral health issues",
      "Saves money on complex procedures later"
    ],
    procedure: [
      { step: "Examination", detail: "A thorough visual check of your teeth, gums, and mouth." },
      { step: "X-Rays", detail: "To check for cavities between teeth or issues below the gumline." },
      { step: "Cleaning", detail: "Removal of plaque and tartar buildup by a hygienist." },
      { step: "Consultation", detail: "Discussing the findings and any necessary treatment plans with the dentist." }
    ],
    recovery: "Immediate. You can return to normal activities right after a standard check-up and cleaning.",
    faqs: [
      { q: "How often should I get a checkup?", a: "We recommend every 6 months for most patients." },
      { q: "Does a cleaning hurt?", a: "No, routine cleanings are generally painless." }
    ],
    icon: Stethoscope
  },
  "teeth-whitening": {
    title: "Teeth Whitening",
    description: "Professional laser whitening for a brighter, sparkling smile.",
    cover: "https://images.unsplash.com/photo-1590625691060-e83ee91e84e1?auto=format&fit=crop&q=80&w=1200",
    whoItsFor: "Patients looking to remove stains caused by coffee, tea, smoking, or aging, and who want a more vibrant, youthful smile.",
    benefits: [
      "Instantly brighter smile",
      "Removes deep-set stains",
      "Boosts self-confidence",
      "Safe and controlled environment"
    ],
    procedure: [
      { step: "Shade Assessment", detail: "We determine your current tooth color and target shade." },
      { step: "Preparation", detail: "Your gums and lips are protected to prevent irritation." },
      { step: "Gel Application", detail: "A professional-grade whitening gel is applied to the teeth." },
      { step: "Laser Activation", detail: "A specialized light is used to accelerate the whitening process." }
    ],
    recovery: "No downtime, though some temporary tooth sensitivity may occur for 24-48 hours.",
    faqs: [
      { q: "How long do the results last?", a: "Results can last from 6 months to 2 years depending on your diet and oral hygiene." },
      { q: "Is it safe for enamel?", a: "Yes, professional whitening is completely safe for your enamel." }
    ],
    icon: Sparkles
  },
  "orthodontics": {
    title: "Orthodontics",
    description: "Clear aligners and traditional braces for perfect alignment.",
    cover: "https://images.unsplash.com/photo-1598256989467-31362098d5c4?auto=format&fit=crop&q=80&w=1200",
    whoItsFor: "Patients with misaligned teeth, bite issues, or spacing problems who desire a straighter, healthier smile.",
    benefits: [
      "Improved aesthetics",
      "Better oral health and easier cleaning",
      "Corrects bite issues",
      "Boosts overall confidence"
    ],
    procedure: [
      { step: "Consultation & Imaging", detail: "Comprehensive assessment using 3D imaging." },
      { step: "Treatment Plan", detail: "Customized plan mapping out tooth movements." },
      { step: "Appliance Fitting", detail: "Fitting of braces or first set of aligners." },
      { step: "Adjustments", detail: "Regular visits for progress checks and adjustments." }
    ],
    recovery: "Moderate. Initial discomfort expected for a few days after adjustments.",
    faqs: [
      { q: "How long does treatment take?", a: "Typically 6 to 24 months depending on complexity." },
      { q: "Are clear aligners right for me?", a: "Most patients are good candidates, but a consultation is required." }
    ],
    icon: ShieldCheck
  },
  "dental-implants": {
    title: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements.",
    cover: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&q=80&w=1200",
    whoItsFor: "Patients missing one or more teeth looking for an aesthetic and functional replacement.",
    benefits: [
      "Looks and feels like natural teeth",
      "Prevents bone loss",
      "Long-lasting solution",
      "Restores biting power"
    ],
    procedure: [
      { step: "Assessment", detail: "Evaluation of jawbone density and oral health." },
      { step: "Implant Placement", detail: "Surgical insertion of the titanium implant." },
      { step: "Healing", detail: "Osseointegration process taking a few months." },
      { step: "Crown Placement", detail: "Attaching the custom-made crown to the implant." }
    ],
    recovery: "Moderate. Swelling and mild pain for a few days post-surgery.",
    faqs: [
      { q: "Is the procedure painful?", a: "Done under local anesthesia, so you shouldn't feel pain during the procedure." },
      { q: "How long do implants last?", a: "With proper care, they can last a lifetime." }
    ],
    icon: HeartPulse
  },
  "root-canal": {
    title: "Root Canal",
    description: "Pain-free treatments to save infected or damaged teeth.",
    cover: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
    whoItsFor: "Patients experiencing severe tooth pain or sensitivity due to deep decay or infection.",
    benefits: [
      "Relieves severe pain",
      "Saves the natural tooth",
      "Prevents further infection",
      "Restores normal biting function"
    ],
    procedure: [
      { step: "Diagnosis", detail: "X-rays to determine the extent of infection." },
      { step: "Anesthesia", detail: "Numbing the area for a pain-free experience." },
      { step: "Cleaning", detail: "Removing infected pulp and cleaning the root canals." },
      { step: "Sealing & Restoration", detail: "Filling the canals and placing a crown for strength." }
    ],
    recovery: "Mild. Sensitivity for a few days after the procedure.",
    faqs: [
      { q: "Are root canals painful?", a: "Modern root canals are no more uncomfortable than a standard filling." },
      { q: "Do I need a crown after?", a: "Yes, a crown is usually necessary to protect the weakened tooth." }
    ],
    icon: Bone
  },
  "emergency-dentistry": {
    title: "Emergency Care",
    description: "Immediate attention to severe dental pain or injuries.",
    cover: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    whoItsFor: "Patients needing immediate treatment for toothaches, knocked-out teeth, or broken restorations.",
    benefits: [
      "Fast pain relief",
      "Prevents permanent damage",
      "Immediate expert care",
      "Available for urgent situations"
    ],
    procedure: [
      { step: "Triage", detail: "Immediate assessment of the emergency." },
      { step: "Pain Management", detail: "Quick administration of pain relief or anesthesia." },
      { step: "Stabilization", detail: "Treating the immediate issue to prevent further damage." },
      { step: "Follow-up Plan", detail: "Scheduling any necessary permanent repairs." }
    ],
    recovery: "Varies depending on the extent of the emergency.",
    faqs: [
      { q: "What should I do if a tooth is knocked out?", a: "Keep it moist in milk or your cheek and see a dentist immediately." },
      { q: "Do you offer after-hours care?", a: "Please call our emergency line for after-hours instructions." }
    ],
    icon: Activity
  }
};
