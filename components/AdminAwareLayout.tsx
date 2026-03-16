"use client";

import { usePathname } from "next/navigation";

interface AdminAwareLayoutProps {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  floatingWidgets: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminAwareLayout({
  navbar,
  footer,
  floatingWidgets,
  children,
}: AdminAwareLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1">{children}</main>
      {floatingWidgets}
      {footer}
    </>
  );
}
