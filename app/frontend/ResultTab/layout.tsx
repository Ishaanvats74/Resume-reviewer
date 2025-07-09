import Link from "next/link";

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Custom Navbar */}
        <nav className="bg-gray-900 p-4 text-white shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">AI Resume Review</h1>
            <Link href="/" className="text-sm text-gray-300 hover:text-white">Back to Home</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
