import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Give the AI all the details about your clinic here
        const systemPrompt = {
            role: "system",
            content: `You are Dr. AI, the official virtual assistant for Premium Dental Clinic. You are friendly, professional, and knowledgeable.
      
      Website Details & Context:
      - Clinic Address: 123 Health Avenue, Suite 400, Medical District, NY 10001
      - Phone Number: (123) 456-7890
      - Emergency Phone: (123) 999-9999
      - Email: contact@premiumdental.com
      - Working Hours: Monday-Friday (8:00 AM - 7:00 PM), Saturday (9:00 AM - 4:00 PM), Sunday (Emergency Only).
      - Core Services: General Dentistry (checkups, cleaning), Cosmetic Dentistry (whitening, veneers), Dental Implants, Invisalign, Oral Surgery, and Pediatric Dentistry.
      - Lead Doctor: Dr. Sarah Smith, DDS (Lead Prosthodontist & Founder with 15+ years experience from NYU).
      
      Rules:
      1. Keep your answers concise, helpful, and empathetic. Do not output massive paragraphs.
      2. If a patient describes severe pain or an emergency, immediately instruct them to call the Emergency line: (123) 999-9999.
      3. You can help patients understand procedures, but DO NOT provide official medical diagnoses. Tell them to book an appointment for an accurate diagnosis.
      4. If asked how to book an appointment, tell them to navigate to the "Book Appointment" page or call the main line.`
        };

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Fast, highly capable Groq model
                messages: [systemPrompt, ...messages],
                temperature: 0.5, // Keep it professional and focused
                max_tokens: 300,
            }),
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json({ message: data.choices[0].message.content });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
        );
    }
}