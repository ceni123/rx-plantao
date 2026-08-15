import type {Metadata} from "next";import "./globals.css";
export const metadata:Metadata={
  metadataBase:new URL("https://rx-plantao.vercel.app"),
  title:{default:"Rx Plantão — Decisão rápida no pronto-socorro",template:"%s | Rx Plantão"},
  description:"Protocolos objetivos, doses e calculadoras para decisões rápidas no pronto-socorro adulto e pediátrico.",
  applicationName:"Rx Plantão",
  alternates:{canonical:"/"},
  openGraph:{title:"Rx Plantão",description:"O essencial para decidir e agir no plantão.",url:"/",siteName:"Rx Plantão",locale:"pt_BR",type:"website"},
  robots:{index:true,follow:true},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
