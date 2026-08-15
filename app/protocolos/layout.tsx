import type { Metadata } from "next";

export const metadata: Metadata = { title: "Protocolos", robots: { index: false, follow: false }, alternates: {} };
export default function ProtocolosLayout({ children }: { children: React.ReactNode }) { return children; }
