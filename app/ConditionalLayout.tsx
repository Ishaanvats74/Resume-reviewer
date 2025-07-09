'use client';

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarPaths = ['/frontend/ResultTab'];
  const showNavbar = !hideNavbarPaths.includes(pathname);

  return (
    <div>
      {showNavbar && (
        <div className="z-10 fixed inset-x-0 right-50 left-50">
          <Navbar />
        </div>
      )}
      <div className="z-0 relative bg-cover text-white min-h-screen">
        {children}
      </div>
    </div>
  );
}
