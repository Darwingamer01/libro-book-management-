import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { ScaleIn } from '../components/animations/ScaleIn';

const blogPosts = [
    {
        title: "The Art of Digital Book Organization",
        excerpt: "Discover how to effectively categorize and tag your library for maximum rediscovery potential. Learn the psychology behind organization.",
        date: "Dec 28, 2025",
        author: "Sarah Chen",
        category: "Productivity",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80",
        color: "emerald"
    },
    {
        title: "Introducing 3D Shelf Visualization",
        excerpt: "A deep dive into the technology behind our new 3D rendering engine. How we brought physical library magic to the browser.",
        date: "Dec 20, 2025",
        author: "Alex Rivera",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&q=80",
        color: "teal"
    },
    {
        title: "5 Reading Habits to Build in 2026",
        excerpt: "Practical tips to reset your reading goals. From setting realistic targets to creating the perfect reading nook.",
        date: "Dec 15, 2025",
        author: "Marcus Johnson",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1513475303661-bc450283248f?auto=format&fit=crop&q=80",
        color: "cyan"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen pt-24 flex flex-col bg-slate-50">
            <div className="flex-grow pb-20">
                {/* Header */}
                <section className="px-4 sm:px-6 lg:px-8 py-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-50"></div>

                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-700">The Libro Blog</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
                            Stories & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Insights</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Updates, reading tips, and behind-the-scenes looks at how we're building the future of reading.
                        </p>
                    </FadeIn>
                </section>

                {/* Blog Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, idx) => (
                            <ScaleIn key={idx} delay={idx * 0.1}>
                                <motion.article
                                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold text-slate-900 rounded-full uppercase tracking-wider shadow-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow relative">
                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                                            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full">
                                                <User className="w-3.5 h-3.5" />
                                                {post.author}
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-emerald-600 font-bold text-sm tracking-wide">
                                            <span>Read Article</span>
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300">
                                                <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </ScaleIn>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}
                <section className="mt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                        {/* Dot pattern overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">Stay in the Loop</h2>
                            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                                Subscribe to our newsletter to get the latest reading tips, product updates, and book recommendations directly in your inbox.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white/10 transition-all font-medium"
                                />
                                <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 whitespace-nowrap">
                                    Subscribe Now
                                </button>
                            </form>
                            <p className="mt-6 text-slate-500 text-sm">
                                No spam, unsubscribe at any time.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
