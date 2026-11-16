import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ExplorePage() {
  const supabase = await createClient();
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-600">
            Wanderly
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/explore" className="text-brand-600">Explore</Link>
            <Link href="/plan" className="hover:text-brand-600">AI Planner</Link>
            <Link href="/stories" className="hover:text-brand-600">Stories</Link>
            <Link href="/login" className="hover:text-brand-600">Login</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Explore Destinations</h1>
          <p className="text-lg text-slate-600">Find your next favorite place on earth</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {["All", "Beach", "Mountains", "City", "Adventure", "Culture", "India"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                f === "All"
                  ? "bg-brand-600 text-white"
                  : "bg-white border text-slate-600 hover:border-brand-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(destinations || []).map((dest) => (
            <Link
              key={dest.id}
              href={`/destination/${dest.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={dest.cover_image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{dest.name}</h3>
                    <p className="text-slate-500 text-sm">{dest.country}</p>
                  </div>
                  {dest.rating && (
                    <span className="text-sm font-medium">⭐ {dest.rating}</span>
                  )}
                </div>
                <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                  {dest.short_description}
                </p>
                <p className="text-brand-600 font-medium">
                  From ₹{dest.average_cost_per_day?.toLocaleString()}/day
                </p>
              </div>
            </Link>
          ))}
        </div>

        {(!destinations || destinations.length === 0) && (
          <div className="text-center py-20 text-slate-500">
            No destinations found yet.
          </div>
        )}
      </main>
    </div>
  );
}