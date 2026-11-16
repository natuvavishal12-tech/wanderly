"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-600">
            Wanderly
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-600 hover:text-red-600"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-3xl font-bold text-brand-600">
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user?.user_metadata?.full_name || "Traveler"}
              </h1>
              <p className="text-slate-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-brand-600">0</div>
            <div className="text-sm text-slate-500 mt-1">Trips Planned</div>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-brand-600">0</div>
            <div className="text-sm text-slate-500 mt-1">Wishlist</div>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-brand-600">0</div>
            <div className="text-sm text-slate-500 mt-1">Reviews</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-8">
          <h2 className="text-xl font-bold mb-4">My Trips</h2>
          <p className="text-slate-500 text-center py-12">
            You haven't planned any trips yet.{" "}
            <Link href="/plan" className="text-brand-600 font-medium hover:underline">
              Start planning →
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}