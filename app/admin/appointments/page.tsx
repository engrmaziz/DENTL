"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  RefreshCw,
  Trash2,
  Search,
  Filter,
  User,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Appointment } from "@/types/appointment";
import { useToast } from "@/hooks/useToast";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast("Failed to load appointments", "error");
    } else {
      setAppointments(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    setDeletingId(id);

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) {
      toast("Failed to delete appointment", "error");
    } else {
      toast("Appointment deleted successfully", "success");
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
    setDeletingId(null);
  };

  const handleDownloadCSV = () => {
    const headers = ["Name", "Phone", "Email", "Date", "Time", "Reason", "Created At"];
    const rows = appointments.map((a) => [
      `"${a.name}"`,
      `"${a.phone}"`,
      `"${a.email || ""}"`,
      `"${a.preferred_date}"`,
      `"${a.preferred_time}"`,
      `"${a.reason.replace(/"/g, '""')}"`,
      `"${a.created_at ? new Date(a.created_at).toLocaleString() : ""}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `appointments-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast("CSV downloaded successfully", "success");
  };

  const filtered = appointments.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.includes(searchQuery) ||
      (a.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointment Hub</h1>
          <p className="text-slate-500 text-sm mt-1">
            Live feed of all patient bookings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAppointments}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={handleDownloadCSV}
            disabled={appointments.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-6 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} className="text-blue-500" />
          <strong className="text-slate-900">{appointments.length}</strong> total
        </span>
        <span className="flex items-center gap-1.5">
          <Filter size={14} className="text-purple-500" />
          <strong className="text-slate-900">{filtered.length}</strong> shown
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Calendar size={48} className="mx-auto mb-4 text-slate-200" />
            <p className="text-slate-400 font-medium">No appointments found</p>
            <p className="text-slate-300 text-sm">
              {searchQuery ? "Try a different search term" : "Appointments will appear here"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Patient", "Contact", "Date & Time", "Reason", "Booked", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((apt, i) => (
                  <motion.tr
                    key={apt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-900">{apt.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-sm text-slate-700">
                          <Phone size={12} className="text-slate-400" />
                          {apt.phone}
                        </div>
                        {apt.email && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail size={12} className="text-slate-400" />
                            {apt.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {apt.preferred_date}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={11} />
                        {apt.preferred_time}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {apt.reason}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-400">
                      {apt.created_at
                        ? new Date(apt.created_at).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleDelete(apt.id)}
                        disabled={deletingId === apt.id}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
