// pages/LandingPage.tsx - MODERN PROFESSIONAL DESIGN (EMERALD THEME)
import { Scene3D } from '../components/3d/Scene3D';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Library,
    BarChart3,
    ArrowRight,
    Search,
    Bookmark,
    Clock,
    Zap,
    Shield,
    Sparkles,
    Twitter,
    Github,
    Linkedin
} from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { ScaleIn } from '../components/animations/ScaleIn';

export function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
                {/* Subtle gradient orbs */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>

                {/* 3D Book Animation - Right Side */}
                <Scene3D />

                {/* Hero Content - Left Side */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
                    <FadeIn>
                        <div className="max-w-xl lg:max-w-2xl">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8 backdrop-blur-sm">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-emerald-700">
                                    Your Digital Reading Companion
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                                Build Your{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                    Personal Library
                                </span>
                                {' '}in 3D
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
                                Discover, organize, and track your reading journey with an immersive
                                3D library experience. Transform how you interact with books.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mb-12">
                                <Link
                                    to="/browse"
                                    className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Start Exploring
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <button className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-900 font-semibold rounded-xl border-2 border-slate-200/80 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                                    <BookOpen className="w-5 h-5" />
                                    View Demo
                                </button>
                            </div>

                            {/* Feature Pills */}
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-2 px-4 py-2 bg-[#f5fbf7] backdrop-blur-sm border border-slate-200/60 rounded-full">
                                    <Shield className="w-4 h-4 text-emerald-600" />
                                    <span className="text-slate-700">Free forever</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-[#f5fbf7] backdrop-blur-sm border border-slate-200/60 rounded-full">
                                    <Zap className="w-4 h-4 text-emerald-600" />
                                    <span className="text-slate-700">No setup required</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ==================== HOW IT WORKS SECTION ==================== */}
            <FadeIn>
                <section className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200/60 rounded-full mb-6">
                                <Sparkles className="w-4 h-4 text-teal-600" />
                                <span className="text-sm font-medium text-teal-700">Simple Process</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                                How Libro Works
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Three simple steps to transform your reading experience
                            </p>
                        </div>

                        {/* Steps Grid */}
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto service-cards">
                            {[
                                {
                                    step: '01',
                                    icon: Search,
                                    title: 'Discover Books',
                                    description: 'Browse through our curated collection or search for specific titles. Add books to your personal library with one click.'
                                },
                                {
                                    step: '02',
                                    icon: Library,
                                    title: 'Build Your Library',
                                    description: 'Organize your collection in a beautiful 3D environment. See your books come to life in an immersive shelf experience.'
                                },
                                {
                                    step: '03',
                                    icon: BarChart3,
                                    title: 'Track Progress',
                                    description: 'Monitor your reading habits, set goals, and visualize your journey with detailed analytics and insights.'
                                }
                            ].map((step, idx) => (
                                <div key={idx} className="relative group">
                                    {/* Connecting Line (not for last item) */}
                                    {idx < 2 && (
                                        <div className="hidden md:block absolute top-[60px] left-1/2 w-[calc(100%+2rem)] h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 z-0"></div>
                                    )}

                                    {/* Card */}
                                    <ScaleIn delay={idx * 0.1}>
                                        <div className="relative p-8 bg-[#f5fbf7] border border-slate-200/60 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-hover:border-emerald-200/80 z-10 h-full">
                                            {/* Step Number */}
                                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-2xl flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                                                {step.step}
                                            </div>

                                            {/* Icon */}
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 mb-6 group-hover:scale-110 transition-transform">
                                                <step.icon className="w-7 h-7 text-emerald-600" />
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </ScaleIn>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </FadeIn>

            {/* ==================== FEATURES SECTION ==================== */}
            <FadeIn>
                <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-6">
                                <Zap className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-700">Key Features</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                                Everything You Need
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Powerful tools designed for modern readers
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Library,
                                    title: '3D Visualization',
                                    description: 'Experience your books in stunning 3D. Navigate through your library as if walking through a real bookshelf.',
                                    gradient: 'from-violet-500 to-purple-600'
                                },
                                {
                                    icon: Search,
                                    title: 'Smart Search',
                                    description: 'Find any book instantly with our intelligent search. Filter by genre, author, or reading status.',
                                    gradient: 'from-emerald-500 to-teal-600'
                                },
                                {
                                    icon: BarChart3,
                                    title: 'Reading Analytics',
                                    description: 'Track your reading habits and progress. Visualize your journey with beautiful charts and insights.',
                                    gradient: 'from-blue-500 to-cyan-600'
                                },
                                {
                                    icon: Bookmark,
                                    title: 'Custom Collections',
                                    description: 'Organize books into custom collections. Create reading lists for different moods and goals.',
                                    gradient: 'from-amber-500 to-orange-600'
                                },
                                {
                                    icon: Clock,
                                    title: 'Reading Timer',
                                    description: 'Set reading goals and track time spent. Build consistent reading habits with reminders.',
                                    gradient: 'from-pink-500 to-rose-600'
                                },
                                {
                                    icon: Sparkles,
                                    title: 'AI Recommendations',
                                    description: 'Get personalized book suggestions based on your reading history and preferences.',
                                    gradient: 'from-indigo-500 to-purple-600'
                                }
                            ].map((feature, idx) => (
                                <ScaleIn key={idx} delay={idx * 0.1}>
                                    <div
                                        className="group relative p-8 bg-[#f5fbf7] border border-slate-200/60 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80"
                                    >
                                        {/* Gradient Background on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="relative">
                                            {/* Icon with Gradient */}
                                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                                <feature.icon className="w-7 h-7 text-white" />
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </ScaleIn>
                            ))}
                        </div>
                    </div>
                </section>
            </FadeIn>

            {/* ==================== USE CASES SECTION ==================== */}
            <FadeIn>
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                                Perfect For Every Reader
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Whether you're a casual reader or a book enthusiast, Libro adapts to your needs
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    title: 'Students & Researchers',
                                    description: 'Organize academic materials, track research papers, and manage study resources efficiently.',
                                    benefits: ['Reference tracking', 'Citation management', 'Study progress monitoring']
                                },
                                {
                                    title: 'Book Clubs & Communities',
                                    description: 'Share reading lists, discuss books, and coordinate group reading activities seamlessly.',
                                    benefits: ['Shared collections', 'Discussion threads', 'Reading schedules']
                                },
                                {
                                    title: 'Professional Readers',
                                    description: 'Manage large collections, track professional development, and maintain reading goals.',
                                    benefits: ['Advanced organization', 'Custom tagging', 'Productivity insights']
                                },
                                {
                                    title: 'Casual Book Lovers',
                                    description: 'Discover new titles, keep track of favorites, and enjoy a beautiful reading experience.',
                                    benefits: ['Personalized recommendations', 'Wishlist management', 'Reading streaks']
                                }
                            ].map((useCase, idx) => (
                                <ScaleIn key={idx} delay={idx * 0.1}>
                                    <div
                                        className="p-8 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200/60 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 h-full"
                                    >
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                            {useCase.title}
                                        </h3>
                                        <p className="text-slate-600 mb-6 leading-relaxed">
                                            {useCase.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {useCase.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-center gap-2 text-slate-700">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </ScaleIn>
                            ))}
                        </div>
                    </div>
                </section>
            </FadeIn>

            {/* ==================== FINAL CTA SECTION ==================== */}
            <FadeIn>
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
            </FadeIn>

            {/* ==================== FOOTER ==================== */}
            <footer className="bg-slate-900 text-slate-300 py-16">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        {/* Logo & Description */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">Libro</span>
                            </div>
                            <p className="text-slate-400 max-w-md mb-6">
                                Your personal 3D library experience. Discover, organize, and track your reading journey with elegance.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">
                            © 2025 Libro. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
