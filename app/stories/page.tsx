import Link from "next/link";

const stories = [
  {
    id: 1,
    title: "10 Days in Bali: Temples, Beaches & Rice Terraces",
    author: "Priya Sharma",
    location: "Bali, Indonesia",
    excerpt: "From the spiritual highlands of Ubud to the surfing beaches of Canggu, here's how I spent 10 unforgettable days in Bali...",
    image: "https://images.unsplash.com/photo-1537996194471-e667a8c6e3b9?w=800",
    date: "2 days ago",
    readTime: "8 min",
  },
  {
    id: 2,
    title: "A Solo Trip to Manali That Changed Everything",
    author: "Rahul Verma",
    location: "Manali, India",
    excerpt: "I went alone for the first time and discovered more about myself than the mountains. Here's my honest experience...",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    date: "5 days ago",
    readTime: "6 min",
  },
  {
    id: 3,
    title: "Paris on a Budget: How I Did It for Under ₹60,000",
    author: "Ananya Patel",
    location: "Paris, France",
    excerpt: "Yes, Paris is expensive. But with smart planning and a few local tricks, you can still have an amazing trip without breaking the bank.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    date: "1 week ago",
    readTime: "7 min",
  },
  {
    id: 4,
    title: "Tokyo Food Guide: 15 Must-Try Dishes",
    author: "Vikram Singh",
    location: "Tokyo, Japan",
    excerpt: "From ramen alleys to high-end sushi, Tokyo is a food lover's paradise. These are the dishes you absolutely cannot miss.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    date: "1 week ago",
    readTime: "9 min",
  },
];

export default function StoriesPage() {
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
            <Link href="/stories" className="text-brand-600">Stories</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Travel Stories</h1>
          <p className="text-lg text-slate-600">
            Real experiences shared by fellow travelers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                  <span>{story.location}</span>
                  <span>•</span>
                  <span>{story.date}</span>
                  <span>•</span>
                  <span>{story.readTime} read</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition">
                  {story.title}
                </h2>
                <p className="text-slate-600 mb-4 line-clamp-2">{story.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    by {story.author}
                  </span>
                  <span className="text-brand-600 text-sm font-medium">Read more →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}