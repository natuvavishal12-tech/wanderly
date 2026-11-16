"use client";

import { useState } from "react";
import Link from "next/link";

export default function PlanPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("5");
  const [budget, setBudget] = useState("medium");
  const [style, setStyle] = useState("balanced");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const generateItinerary = async () => {
    if (!destination) return;
    setLoading(true);
    setItinerary(null);

    // Simulated AI response for MVP (later we connect real AI)
    await new Promise((r) => setTimeout(r, 1800));

    const sample = `
🌟 Your ${days}-Day ${destination} Itinerary
Budget: ${budget.charAt(0).toUpperCase() + budget.slice(1)} | Style: ${style}

📅 Day 1 – Arrival & Orientation
• Morning: Arrive and check into hotel
• Afternoon: Explore the main city center / old town
• Evening: Sunset viewpoint + local dinner
• Overnight: Recommended area near the center

📅 Day 2 – Culture & Highlights
• Morning: Top landmark / museum visit
• Afternoon: Local market + street food tour
• Evening: Optional cultural show or night market

📅 Day 3 – Nature / Adventure
• Full day: Day trip to nearby nature spot / beach / mountains
• Pack light, wear comfortable shoes
• Picnic or local lunch recommended

📅 Day 4 – Free / Flexible Day
• Morning: Optional activity (spa, shopping, or another attraction)
• Afternoon: Coffee + people watching
• Evening: Best restaurant in town (reservation recommended)

📅 Day 5 – Departure
• Morning: Last-minute souvenir shopping
• Check out and head to airport/station

💡 Tips:
- Book popular attractions in advance
- Carry a power bank and offline maps
- Try at least one local specialty dish every day

Want me to adjust this itinerary? Just tell me what you prefer!
    `.trim();

    setItinerary(sample);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-600">
            Wanderly
          </Link>
          <Link href="/explore" className="text-sm font-medium text-slate-600 hover:text-brand-600">
            Explore
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">AI Trip Planner</h1>
          <p className="text-lg text-slate-600">
            Tell us a few details and get a complete itinerary in seconds
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Where do you want to go?
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Bali, Manali, Tokyo, Paris..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Days</label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
              >
                {[3, 4, 5, 6, 7, 8, 10, 14].map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
              >
                <option value="budget">Budget</option>
                <option value="medium">Medium</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Travel Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
              >
                <option value="relaxed">Relaxed</option>
                <option value="balanced">Balanced</option>
                <option value="adventure">Adventure</option>
                <option value="culture">Culture</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateItinerary}
            disabled={loading || !destination}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition text-lg"
          >
            {loading ? "Generating your perfect trip..." : "Generate Itinerary ✨"}
          </button>
        </div>

        {itinerary && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg border p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Your Itinerary</h2>
            <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
              {itinerary}
            </pre>
            <div className="mt-6 flex gap-3">
              <button className="px-5 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700">
                Save Trip
              </button>
              <button className="px-5 py-2.5 border rounded-lg font-medium hover:bg-slate-50">
                Adjust
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}