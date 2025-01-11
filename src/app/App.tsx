'use client'
import Header from "@/components/Header/Header";
import "../i18n";
import Footer from "@/components/Footer/Footer";

export default function App({
    children,
  }: {
    children: React.ReactNode
  }) {
 
    return <body>
      <Header />
      {children}
      <Footer />
    </body>

}