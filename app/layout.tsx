import type {Metadata} from "next";import "./globals.css";
export const metadata:Metadata={title:"Rx Plantão",description:"Protocolos rápidos, doses e calculadoras para pronto-socorro adulto e pediátrico.",other:{"codex-preview":"development"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
