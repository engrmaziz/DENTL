import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Premium Dental <onboarding@resend.dev>", // Replace with verified domain in production
      to: ["hello@premiumdental.example.com"], // Replace with your clinic email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend Error:", emailResponse.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // Optional: Save to a contacts/messages table in Supabase
    // await supabase.from('messages').insert([{ name, email, subject, message }]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
