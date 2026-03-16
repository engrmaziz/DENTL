"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Phone, MapPin, Mail, Clock, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { ClinicSettings } from "@/types/clinic";
import { useToast } from "@/hooks/useToast";

const defaultSettings: ClinicSettings = {
  phone: "",
  emergency_phone: "",
  email: "",
  address: "",
  hours_weekday: "",
  hours_saturday: "",
  hours_sunday: "",
  open_time: "",
  close_time: "",
};

const settingsConfig = [
  {
    key: "phone" as keyof ClinicSettings,
    label: "Main Phone Number",
    icon: Phone,
    type: "text",
    placeholder: "(123) 456-7890",
  },
  {
    key: "emergency_phone" as keyof ClinicSettings,
    label: "Emergency Phone",
    icon: Phone,
    type: "text",
    placeholder: "(123) 999-9999",
  },
  {
    key: "email" as keyof ClinicSettings,
    label: "Contact Email",
    icon: Mail,
    type: "email",
    placeholder: "contact@premiumdental.com",
  },
  {
    key: "address" as keyof ClinicSettings,
    label: "Clinic Address",
    icon: MapPin,
    type: "text",
    placeholder: "123 Health Avenue, Medical District, NY 10001",
  },
  {
    key: "hours_weekday" as keyof ClinicSettings,
    label: "Weekday Hours",
    icon: Clock,
    type: "text",
    placeholder: "Mon-Fri: 8:00 AM - 7:00 PM",
  },
  {
    key: "hours_saturday" as keyof ClinicSettings,
    label: "Saturday Hours",
    icon: Clock,
    type: "text",
    placeholder: "Sat: 9:00 AM - 4:00 PM",
  },
  {
    key: "hours_sunday" as keyof ClinicSettings,
    label: "Sunday Hours",
    icon: Clock,
    type: "text",
    placeholder: "Sunday: 24/7 Emergencies Only",
  },
  {
    key: "open_time" as keyof ClinicSettings,
    label: "Opening Time (24h, for calendar)",
    icon: Clock,
    type: "time",
    placeholder: "08:00",
  },
  {
    key: "close_time" as keyof ClinicSettings,
    label: "Closing Time (24h, for calendar)",
    icon: Clock,
    type: "time",
    placeholder: "19:00",
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<ClinicSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      const { data, error } = await supabase
        .from("clinic_settings")
        .select("key, value");

      if (error) {
        toast("Failed to load settings", "error");
      } else if (data) {
        const map = data.reduce(
          (acc, { key, value }) => ({ ...acc, [key]: value }),
          {} as Record<string, string>
        );
        setSettings((prev) => ({ ...prev, ...map }));
      }
      setLoading(false);
    }

    fetchSettings();
  }, [toast]);

  const handleSave = async () => {
    setSaving(true);

    const upserts = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from("clinic_settings")
      .upsert(upserts, { onConflict: "key" });

    if (error) {
      toast("Failed to save settings", "error");
    } else {
      toast("Settings saved successfully!", "success");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Clinic Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Update global clinic information displayed on the website
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        {settingsConfig.map((config, i) => (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <config.icon size={15} className="text-blue-500" />
              {config.label}
            </label>
            <input
              type={config.type}
              value={settings[config.key]}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, [config.key]: e.target.value }))
              }
              placeholder={config.placeholder}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </motion.div>
        ))}

        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            {saving ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
