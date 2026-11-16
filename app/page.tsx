import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: featured } = await supabase
    .from("destinations")
    .select("*")
    .eq("is_featured", true)
    .order("rating", { ascending: false })
    .limit(6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Navbar */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-600">
            Wanderly
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/explore" className="hover:text-brand-600 transition">Explore</Link>
            <Link href="/plan" className="hover:text-brand-600 transition">AI Planner</Link>
            <Link href="/stories" className="hover:text-brand-600 transition">Stories</Link>
            <Link href="/trips" className="hover:text-brand-600 transition">My Trips</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-brand-600"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-700 transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            Plan your next
            <span className="block text-brand-600">adventure</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Discover destinations, build perfect itineraries with AI, and book everything in one place.
          </p>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border p-2 flex flex-col sm:flex-row gap-2">
            <Link href="/explore" className="flex-1">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full px-5 py-4 rounded-xl border-0 focus:ring-2 focus:ring-brand-500 outline-none text-lg cursor-pointer"
                readOnly
              />
            </Link>
            <Link
              href="/explore"
              className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-semibold transition text-center"
            >
              Explore
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span>Popular:</span>
            <Link href="/destination/bali" className="hover:text-brand-600">Bali</Link>
            <Link href="/destination/paris" className="hover:text-brand-600">Paris</Link>
            <Link href="/destination/tokyo" className="hover:text-brand-600">Tokyo</Link>
            <Link href="/destination/manali" className="hover:text-brand-600">Manali</Link>
            <Link href="/destination/goa" className="hover:text-brand-600">Goa</Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      {featured && featured.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold">Featured Destinations</h2>
              <Link href="/explore" className="text-brand-600 font-medium hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destination/${dest.slug}`}
                  className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={dest.cover_image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5 bg-white">
                    <h3 className="text-xl font-semibold">{dest.name}</h3>
                    <p className="text-slate-500 text-sm">{dest.country}</p>
                    <p className="text-brand-600 font-medium mt-2">
                      From ₹{dest.average_cost_per_day?.toLocaleString()}/day
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to travel better</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/plan" className="p-6 rounded-2xl bg-white border hover:shadow-lg transition block">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">AI Trip Planner</h3>
              <p className="text-slate-600">Tell us your preferences and get a complete day-by-day itinerary in seconds.</p>
            </Link>
            <div className="p-6 rounded-2xl bg-white border hover:shadow-lg transition">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold mb-2">Book Everything</h3>
              <p className="text-slate-600">Flights, hotels, activities and experiences — all in one seamless flow.</p>
            </div>
            <Link href="/stories" className="p-6 rounded-2xl bg-white border hover:shadow-lg transition block">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Community & Stories</h3>
              <p className="text-slate-600">Real stories and tips from fellow travelers to make every trip better.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Wanderly. Built with ❤️ for travelers.</p>
        </div>
      </footer>
    </div>
  );
}