import Link from "next/link";

const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e667a8c6e3b9?w=800&q=80",
    tag: "Beach & Culture",
    price: "₹25,000",
  },
  {
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    tag: "Romance & Art",
    price: "₹85,000",
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    tag: "City & Food",
    price: "₹95,000",
  },
  {
    name: "Manali",
    country: "India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    tag: "Mountains",
    price: "₹12,000",
  },
  {
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    tag: "Beach Party",
    price: "₹8,000",
  },
  {
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    tag: "Island Escape",
    price: "₹1,10,000",
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-600">
            Wanderly
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/explore" className="text-brand-600">Explore</Link>
            <Link href="/plan" className="hover:text-brand-600">AI Planner</Link>
            <Link href="/login" className="hover:text-brand-600">Login</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Explore Destinations</h1>
          <p className="text-lg text-slate-600">Find your next favorite place on earth</p>
        </div>

        {/* Filters */}
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

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.name}
              href={`/destination/${dest.name.toLowerCase()}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={dest.image}
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
                  <span className="text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded-full">
                    {dest.tag}
                  </span>
                </div>
                <p className="text-brand-600 font-medium mt-3">From {dest.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}