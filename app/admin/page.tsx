"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Images,
  FileText,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface DashboardStats {
  appointments: number;
  doctors: number;
  gallery: number;
  blogs: number;
}

const statConfig = [
  {
    key: "appointments" as keyof DashboardStats,
    label: "Total Appointments",
    icon: Calendar,
    href: "/admin/appointments",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    key: "doctors" as keyof DashboardStats,
    label: "Team Members",
    icon: Users,
    href: "/admin/team",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
  },
  {
    key: "gallery" as keyof DashboardStats,
    label: "Gallery Images",
    icon: Images,
    href: "/admin/gallery",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    key: "blogs" as keyof DashboardStats,
    label: "Blog Articles",
    icon: FileText,
    href: "/admin/blog",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    appointments: 0,
    doctors: 0,
    gallery: 0,
    blogs: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState<
    Record<string, unknown>[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [appointmentsRes, doctorsRes, galleryRes, blogsRes, recentRes] =
          await Promise.all([
            supabase
              .from("appointments")
              .select("id", { count: "exact", head: true }),
            supabase
              .from("doctors")
              .select("id", { count: "exact", head: true }),
            supabase
              .from("gallery")
              .select("id", { count: "exact", head: true }),
            supabase
              .from("blogs")
              .select("id", { count: "exact", head: true }),
            supabase
              .from("appointments")
              .select("*")
              .order("created_at", { ascending: false })
              .limit(5),
          ]);

        setStats({
          appointments: appointmentsRes.count || 0,
          doctors: doctorsRes.count || 0,
          gallery: galleryRes.count || 0,
          blogs: blogsRes.count || 0,
        });

        if (recentRes.data) {
          setRecentAppointments(recentRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Activity size={24} />
          <h2 className="text-xl font-bold">Command Center</h2>
        </div>
        <p className="text-blue-100 text-sm">
          Welcome back. Here&apos;s what&apos;s happening at Premium Dental
          today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statConfig.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={stat.href}>
              <div
                className={`bg-white rounded-2xl p-6 border ${stat.border} hover:shadow-lg transition-all cursor-pointer`}
              >
                <div
                  className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <stat.icon size={24} className={stat.text} />
                </div>
                <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">
                  {loading ? (
                    <span className="inline-block w-8 h-8 bg-slate-100 rounded animate-pulse" />
                  ) : (
                    stats[stat.key]
                  )}
                </p>
                <p
                  className={`text-xs ${stat.text} mt-2 flex items-center gap-1`}
                >
                  <TrendingUp size={12} />
                  View all
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-blue-500" />
            <h3 className="font-semibold text-slate-900">
              Recent Appointments
            </h3>
          </div>
          <Link
            href="/admin/appointments"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-slate-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : recentAppointments.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Calendar size={40} className="mx-auto mb-3 opacity-30" />
            <p>No appointments yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recentAppointments.map((apt) => (
              <div
                key={String(apt.id)}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {String(apt.name ?? "")}
                  </p>
                  <p className="text-sm text-slate-500">
                    {String(apt.phone ?? "")}
                    {apt.email ? ` · ${String(apt.email)}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">
                    {String(apt.preferred_date ?? "")}
                  </p>
                  <p className="text-xs text-slate-400">
                    {String(apt.preferred_time ?? "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
