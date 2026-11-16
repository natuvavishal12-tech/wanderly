"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function TripsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from("trips")
        .select("*, destinations(name, cover_image, country)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setTrips(data || []);
      setLoading(false);
    };
    load();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading your trips...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-600">
            Wanderly
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/explore" className="hover:text-brand-600">Explore</Link>
            <Link href="/plan" className="hover:text-brand-600">AI Planner</Link>
            <Link href="/trips" className="text-brand-600">My Trips</Link>
            <Link href="/profile" className="hover:text-brand-600">Profile</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">My Trips</h1>
            <p className="text-slate-600">All your planned and saved adventures</p>
          </div>
          <Link
            href="/plan"
            className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            + Plan New Trip
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white rounded-2xl border p-16 text-center">
            <div className="text-5xl mb-4">✈️</div>
            <h2 className="text-xl font-semibold mb-2">No trips yet</h2>
            <p className="text-slate-500 mb-6">
              Start planning your next adventure with our AI Trip Planner
            </p>
            <Link
              href="/plan"
              className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition"
              >
                {trip.destinations?.cover_image && (
                  <img
                    src={trip.destinations.cover_image}
                    alt={trip.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{trip.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">
                    {trip.destinations?.name}, {trip.destinations?.country}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize px-2 py-1 bg-slate-100 rounded-full">
                      {trip.status}
                    </span>
                    {trip.start_date && (
                      <span className="text-slate-500">{trip.start_date}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}