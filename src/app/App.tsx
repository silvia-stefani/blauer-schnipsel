'use client'
import Header from "@/components/Header/Header";
import "../i18n";
import { usePathname } from "next/navigation";

export default function App({
    children,
  }: {
    children: React.ReactNode
  }) {

    const pathname = usePathname();
    const hideHeaderOnPages = ['/interactive'];
    const showHeader = !hideHeaderOnPages.includes(pathname);
 
    return <>
      {showHeader && <Header />}
      {children}
    </>

}
