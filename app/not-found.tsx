import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <h1 className="text-6xl font-bold text-brand-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">Page not found</h2>
      <p className="text-slate-600 mb-8 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-medium transition"
      >
        Back to Home
      </Link>
    </div>
  );
}