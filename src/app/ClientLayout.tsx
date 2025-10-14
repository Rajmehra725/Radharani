'use client';

import { usePathname } from "next/navigation";
import Header from "@/Components/header/page";
import Footer from "@/Components/footer/page";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Hide Header/Footer on Lock Screen or Landing Page
  const hideLayout = pathname === "/" || pathname === "/lock";

  return (
    <>
      {!hideLayout && <Header />} {/* Header tabhi dikhe jab lock page na ho */}
      {children}
      {!hideLayout && <Footer />} {/* Footer bhi wahi logic follow kare */}
    </>
  );
}
