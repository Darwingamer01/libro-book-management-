
import { Footer } from '../components/layout/Footer';
import {
    Library,
    Search,
    BarChart3,
    Bookmark,
    Sparkles,
    Zap,
    Users,
    Smartphone,
    ArrowRight,
    Check
} from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { ScaleIn } from '../components/animations/ScaleIn';
import { Link } from 'react-router-dom';

export default function Features() {
    const features = [
        {
            icon: Library,
            title: '3D Visualization',
            description: 'Experience your personal library in a stunning 3D environment. Walk through your virtual aisles and interact with your collection like never before.',
            gradient: 'from-violet-500 to-purple-600'
        },
        {
            icon: Search,
            title: 'Smart Discovery',
            description: 'Our advanced algorithm learns your taste to suggest books you\'ll love. Filter by genre, mood, or reading difficulty.',
            gradient: 'from-emerald-500 to-teal-600'
        },
        {
            icon: BarChart3,
            title: 'Deep Analytics',
            description: 'Visualize your reading habits. Track pages read, completion rates, and reading velocity over time.',
            gradient: 'from-blue-500 to-cyan-600'
        },
        {
            icon: Users,
            title: 'Social Reading',
            description: 'Connect with friends, share reviews, and see what others are reading. Join book clubs and participate in reading challenges.',
            gradient: 'from-pink-500 to-rose-600'
        },
        {
            icon: Bookmark,
            title: 'Custom Collections',
            description: 'Organize your books into unlimited custom stacks. Create lists for "Summer Reads", "Research", or "Classics".',
            gradient: 'from-amber-500 to-orange-600'
        },
        {
            icon: Smartphone,
            title: 'Cross-Platform',
            description: 'Sync your progress seamlessly across all your devices. Start on your desktop and continue on your phone.',
            gradient: 'from-indigo-500 to-purple-600'
        }
    ];

    return (
        <div className="min-h-screen pt-24 flex flex-col bg-white">
            <div className="flex-grow">
                {/* Hero Section */}
                <section className="relative px-6 sm:px-8 lg:px-12 py-20 overflow-hidden">
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8 backdrop-blur-sm">
                                <Zap className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-700">Explore Capabilities</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                                More Than Just a <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                    Book Tracker
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                                A complete ecosystem designed to enhance every aspect of your reading life.
                                From organization to discovery, we've got you covered.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="px-6 sm:px-8 lg:px-12 py-12 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, idx) => (
                                <ScaleIn key={idx} delay={idx * 0.1}>
                                    <div className="group relative p-8 bg-[#f5fbf7] border border-slate-200/60 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 h-full">
                                        {/* Gradient Background on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="relative">
                                            {/* Icon with Gradient */}
                                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                                <feature.icon className="w-7 h-7 text-white" />
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </ScaleIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison Section */}
                <section className="px-6 sm:px-8 lg:px-12 py-24 bg-gradient-to-b from-white to-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Why Choose Libro?</h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                See how we compare to other methods of library management.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {[
                                {
                                    title: 'Traditional Apps',
                                    text: 'Static lists, boring spreadsheets, manual entry.',
                                    benefits: ['Basic List View', 'No Visuals', 'Manual Sorting'],
                                    isLibro: false
                                },
                                {
                                    title: 'Physical Library',
                                    text: 'Space constraints, hard to organize, no analytics.',
                                    benefits: ['Tangible Feel', 'Limited Space', 'Hard to Search'],
                                    isLibro: false
                                },
                                {
                                    title: 'Libro',
                                    text: 'Immersive 3D, smart insights, automated organization.',
                                    benefits: ['3D Visualization', 'Smart Analytics', 'Automated Organizing', 'Social Features'],
                                    isLibro: true
                                },
                            ].map((item, idx) => (
                                <ScaleIn key={idx} delay={idx * 0.1}>
                                    <div
                                        className={`relative p-8 rounded-2xl border transition-all duration-300 h-full hover:shadow-xl hover:-translate-y-1 ${item.isLibro
                                            ? 'bg-white border-2 border-emerald-500 shadow-2xl scale-105 z-10'
                                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        {item.isLibro && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-full shadow-lg">
                                                Best Choice
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            {item.isLibro ? (
                                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg">
                                                    <Sparkles className="w-8 h-8" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                                                    <div className="w-4 h-4 bg-slate-400 rounded-full" />
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">{item.title}</h3>
                                        <p className="text-slate-600 text-center mb-8">{item.text}</p>

                                        <div className="space-y-3">
                                            {item.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    {item.isLibro ? (
                                                        <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3" />
                                                        </div>
                                                    ) : (
                                                        <div className="flex-shrink-0 w-5 h-5 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 bg-current rounded-full" />
                                                        </div>
                                                    )}
                                                    <span className={`text-sm ${item.isLibro ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                                                        {benefit}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {item.isLibro && (
                                            <div className="mt-8">
                                                <Link
                                                    to="/register"
                                                    className="block w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                                                >
                                                    Get Started Free
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </ScaleIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                            Ready to Start Your Reading Journey?
                        </h2>
                        <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
                            Create your digital library today and experience reading in a whole new way.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/browse"
                                className="inline-flex items-center gap-2.5 px-8 py-5 bg-white hover:bg-slate-50 text-emerald-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-0.5 text-lg"
                            >
                                Get Started Now
                                <ArrowRight className="w-6 h-6" />
                            </Link>

                            <button className="inline-flex items-center gap-2.5 px-8 py-5 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 text-lg">
                                Learn More
                            </button>
                        </div>

                        <p className="mt-8 text-emerald-100 text-sm">
                            No credit card required • Free forever • Setup in minutes
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
