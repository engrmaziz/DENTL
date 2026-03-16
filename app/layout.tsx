import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toaster from "@/components/ui/Toaster";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import EmergencyBanner from "@/components/EmergencyBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIAssistant from "@/components/AIAssistant";
import AdminAwareLayout from "@/components/AdminAwareLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Premium Dental Clinic",
    default: "Premium Dental Clinic | Your Smile, Our Priority",
  },
  description: "Advanced dental care with modern technology and compassionate service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-slate-800 bg-slate-50 flex flex-col min-h-screen`}>
        <AdminAwareLayout
          navbar={<><EmergencyBanner /><NavbarWrapper /></>}
          footer={<Footer />}
          floatingWidgets={<><WhatsAppButton /><AIAssistant /></>}
        >
          {children}
        </AdminAwareLayout>
        <Toaster />
      </body>
    </html>
  );
}