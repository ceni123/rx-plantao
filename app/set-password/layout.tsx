import type { Metadata } from "next";

export const metadata: Metadata = { title: "Criar senha", robots: { index: false, follow: false }, alternates: {} };
export default function PasswordLayout({ children }: { children: React.ReactNode }) { return children; }
