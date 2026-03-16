import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Insert into Supabase
    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert([
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          preferred_date: data.preferred_date,
          preferred_time: data.preferred_time,
          reason: data.reason,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to save appointment" }, { status: 500 });
    }

    // Optional: Send internal notification email via Resend
    await resend.emails.send({
      from: "Premium Dental <onboarding@resend.dev>",
      to: ["hello@premiumdental.example.com"],
      subject: `New Appointment Request from ${data.name}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Date:</strong> ${data.preferred_date}</p>
        <p><strong>Time:</strong> ${data.preferred_time}</p>
        <p><strong>Reason:</strong> ${data.reason}</p>
      `,
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Appointment API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
