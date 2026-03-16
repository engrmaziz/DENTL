import { Resend } from "resend";

// Provide a safe fallback so Next.js static generation doesn't crash during build time
const resendApiKey = process.env.RESEND_API_KEY || "re_placeholder_123456789";

export const resend = new Resend(resendApiKey);
