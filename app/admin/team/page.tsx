"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  RefreshCw,
  User,
  Briefcase,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Doctor } from "@/types/doctor";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";

const emptyDoctor: Omit<Doctor, "id" | "created_at"> = {
  name: "",
  role: "",
  image_url: "",
  bio: "",
  specialties: [],
  availability: {},
};

export default function TeamAdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Doctor, "id" | "created_at">>(emptyDoctor);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast("Failed to load team members", "error");
    } else {
      setDoctors(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const startEdit = (doctor: Doctor) => {
    setEditing(doctor);
    setFormData({
      name: doctor.name,
      role: doctor.role,
      image_url: doctor.image_url || "",
      bio: doctor.bio || "",
      specialties: doctor.specialties || [],
      availability: doctor.availability || {},
    });
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditing(null);
    setFormData(emptyDoctor);
  };

  const cancelEdit = () => {
    setEditing(null);
    setIsAdding(false);
    setFormData(emptyDoctor);
  };

  const addSpecialty = () => {
    if (!specialtyInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specialties: [...prev.specialties, specialtyInput.trim()],
    }));
    setSpecialtyInput("");
  };

  const removeSpecialty = (s: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((sp) => sp !== s),
    }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role) {
      toast("Name and role are required", "error");
      return;
    }

    if (isAdding) {
      const { data, error } = await supabase
        .from("doctors")
        .insert([formData])
        .select()
        .single();

      if (error) {
        toast("Failed to add team member", "error");
      } else {
        toast("Team member added!", "success");
        setDoctors((prev) => [...prev, data]);
        cancelEdit();
      }
    } else if (editing) {
      setSavingId(editing.id);
      const { data, error } = await supabase
        .from("doctors")
        .update(formData)
        .eq("id", editing.id)
        .select()
        .single();

      if (error) {
        toast("Failed to update team member", "error");
      } else {
        toast("Team member updated!", "success");
        setDoctors((prev) => prev.map((d) => (d.id === editing.id ? data : d)));
        cancelEdit();
      }
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;

    const { error } = await supabase.from("doctors").delete().eq("id", id);

    if (error) {
      toast("Failed to delete team member", "error");
    } else {
      toast("Team member deleted", "success");
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const showForm = editing !== null || isAdding;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage doctors and their schedules
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDoctors}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={startAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium"
          >
            <Plus size={16} />
            Add Member
          </button>
        </div>
      </div>

      {/* Edit / Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">
                {isAdding ? "Add New Team Member" : "Edit Team Member"}
              </h3>
              <button onClick={cancelEdit} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role / Title *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Lead Orthodontist"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Specialties
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSpecialty()}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Add specialty..."
                  />
                  <button
                    onClick={addSpecialty}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.specialties.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs"
                    >
                      {s}
                      <button onClick={() => removeSpecialty(s)}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Doctor biography..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                disabled={savingId !== null}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium"
              >
                <Save size={16} />
                {isAdding ? "Add Member" : "Save Changes"}
              </button>
              <button
                onClick={cancelEdit}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Doctors Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <Users size={48} className="mx-auto mb-4 text-slate-200" />
          <p className="text-slate-400 font-medium">No team members yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  {doctor.image_url ? (
                    <Image
                      src={doctor.image_url}
                      alt={doctor.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={24} className="text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate">{doctor.name}</h3>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <Briefcase size={12} />
                    {doctor.role}
                  </p>
                  {doctor.specialties && doctor.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {doctor.specialties.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                      {doctor.specialties.length > 2 && (
                        <span className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                          +{doctor.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {doctor.bio && (
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{doctor.bio}</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(doctor)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
                >
                  <Edit3 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
