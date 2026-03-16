"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  preferred_date: z.string().min(1, "Please select a preferred date"),
  preferred_time: z.string().min(1, "Please select a preferred time"),
  reason: z.string().min(5, "Please briefly describe the reason for your visit"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }

      toast("Appointment request submitted successfully! We will contact you soon to confirm.", "success");
      reset();
    } catch (error: any) {
      console.error(error);
      toast(error.message || "Failed to submit booking. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Book an Appointment</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'} focus:outline-none focus:ring-4 focus:border-primary transition-all`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'} focus:outline-none focus:ring-4 focus:border-primary transition-all`}
              placeholder="(123) 456-7890"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'} focus:outline-none focus:ring-4 focus:border-primary transition-all`}
            placeholder="johndoe@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="preferred_date" className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
            <input
              type="date"
              id="preferred_date"
              {...register("preferred_date")}
              className={`w-full px-4 py-3 rounded-xl border ${errors.preferred_date ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'} focus:outline-none focus:ring-4 focus:border-primary transition-all`}
            />
            {errors.preferred_date && <p className="text-red-500 text-xs mt-1">{errors.preferred_date.message}</p>}
          </div>
          
          <div>
            <label htmlFor="preferred_time" className="block text-sm font-medium text-slate-700 mb-1">Preferred Time</label>
            <select
              id="preferred_time"
              {...register("preferred_time")}
              className={`w-full px-4 py-3 rounded-xl border ${errors.preferred_time ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'} focus:outline-none focus:ring-4 focus:border-primary transition-all bg-white`}
            >
              <option value="">Select a time</option>
              <option value="Morning (8AM - 11AM)">Morning (8AM - 11AM)</option>
              <option value="Midday (11AM - 2PM)">Midday (11AM - 2PM)</option>
              <option value="Afternoon (2PM - 5PM)">Afternoon (2PM - 5PM)</option>
            </select>
            {errors.preferred_time && <p className="text-red-500 text-xs mt-1">{errors.preferred_time.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit</label>
          <textarea
            id="reason"
            rows={4}
            {...register("reason")}
            className={`w-full px-4 py-3 rounded-xl border ${errors.reason ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'} focus:outline-none focus:ring-4 focus:border-primary transition-all resize-none`}
            placeholder="e.g. Regular Checkup, Toothache, Whitening..."
          ></textarea>
          {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Request Appointment"
          )}
        </button>
      </form>
    </div>
  );
}
