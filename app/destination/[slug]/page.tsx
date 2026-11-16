import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: destination } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Wanderly
          </Link>
          <Link
            href="/explore"
            className="text-white/90 hover:text-white text-sm font-medium"
          >
            ← Back to Explore
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={destination.cover_image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm uppercase tracking-wider opacity-90 mb-2">
              {destination.country}
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold mb-3">
              {destination.name}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              {destination.short_description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {destination.description}
              </p>
            </section>

            {destination.tags && destination.tags.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Quick Info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Best time</dt>
                  <dd className="font-medium">{destination.best_time_to_visit}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Avg cost / day</dt>
                  <dd className="font-medium">
                    ₹{destination.average_cost_per_day?.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Rating</dt>
                  <dd className="font-medium">
                    ⭐ {destination.rating} ({destination.review_count} reviews)
                  </dd>
                </div>
              </dl>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/plan?destination=${destination.name}`}
                  className="block w-full text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  Plan a Trip
                </Link>
                <button className="w-full border border-slate-200 hover:bg-slate-50 font-medium py-3 rounded-xl transition">
                  ♡ Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}