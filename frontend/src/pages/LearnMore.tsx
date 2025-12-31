import { Footer } from '../components/layout/Footer';
import { BookOpen, Star, Shield, Zap, Globe, Users, ArrowRight, Check } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { ScaleIn } from '../components/animations/ScaleIn';
import { Link } from 'react-router-dom';

export default function LearnMore() {
    return (
        <div className="min-h-screen pt-24 flex flex-col bg-white">
            <div className="flex-grow">
                {/* Hero Section */}
                <section className="relative px-6 sm:px-8 lg:px-12 py-20 overflow-hidden text-center">
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8 backdrop-blur-sm">
                                <Star className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-700">Discover More</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                                Dive Deeper into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Libro</span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                                Learn how Libro transforms your reading habits with advanced tracking, social features, and immersive 3D libraries.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Join for Free
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 sm:px-8 lg:px-12 py-12 mb-20 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Why Choose Libro?</h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                More than just a book tracker. A complete ecosystem for your reading life.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Globe,
                                    title: 'Universal Access',
                                    desc: 'Access your library from any device. Your data stays synced across phone, tablet, and desktop.',
                                    gradient: 'from-blue-100 to-blue-200',
                                    iconColor: 'text-blue-600'
                                },
                                {
                                    icon: Shield,
                                    title: 'Data Privacy',
                                    desc: 'We do not sell your data. Your reading history and personal notes are yours alone.',
                                    gradient: 'from-emerald-100 to-emerald-200',
                                    iconColor: 'text-emerald-600'
                                },
                                {
                                    icon: Zap,
                                    title: 'Lightning Fast',
                                    desc: 'Built with modern tech for instant loads and smooth interactions. No more waiting.',
                                    gradient: 'from-amber-100 to-amber-200',
                                    iconColor: 'text-amber-600'
                                },
                                {
                                    icon: Users,
                                    title: 'Community First',
                                    desc: 'Connect with other readers, share reviews, and find your next favorite book together.',
                                    gradient: 'from-purple-100 to-purple-200',
                                    iconColor: 'text-purple-600'
                                },
                                {
                                    icon: BookOpen,
                                    title: 'Unlimited Books',
                                    desc: 'No caps on your library size. Add as many books as you want, forever free.',
                                    gradient: 'from-rose-100 to-rose-200',
                                    iconColor: 'text-rose-600'
                                },
                                {
                                    icon: Star,
                                    title: 'Premium Features',
                                    desc: 'Unlock advanced analytics and customization with our optional premium tier.',
                                    gradient: 'from-indigo-100 to-indigo-200',
                                    iconColor: 'text-indigo-600'
                                }
                            ].map((item, idx) => (
                                <ScaleIn key={idx} delay={idx * 0.1}>
                                    <div className="group relative p-8 bg-[#f5fbf7] border border-slate-200/60 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 h-full">
                                        {/* Gradient Background on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="relative">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </ScaleIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison / Benefits Section */}
                <section className="px-6 sm:px-8 lg:px-12 py-24 bg-gradient-to-b from-white to-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <FadeIn>
                                <div className="space-y-8">
                                    <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                                        Everything you need to <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">master your reading</span>
                                    </h2>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        We've scrutinized every detail to ensure the best possible experience for book lovers.
                                    </p>

                                    <ul className="space-y-4">
                                        {[
                                            'Detailed reading statistics and insights',
                                            'Import from Goodreads (coming soon)',
                                            'Private notes and highlighting system',
                                            'Reading streaks and habit checker'
                                        ].map((benefit, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4" />
                                                </div>
                                                <span className="text-slate-700 font-medium">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                            <ScaleIn delay={0.2}>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-3xl blur-2xl opacity-30 transform rotate-3"></div>
                                    <div className="relative bg-white border border-slate-200/60 rounded-3xl shadow-2xl p-8 overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-emerald-500/20">
                                        {/* Mock UI Element - maybe a stat card */}
                                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold text-slate-800">Reading Activity</h4>
                                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">This Week</span>
                                            </div>
                                            <div className="h-32 flex items-end justify-between gap-2">
                                                {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                                    <div key={i} className="w-full bg-emerald-500 rounded-t-md opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                                <div className="text-2xl font-bold text-slate-900 mb-1">12</div>
                                                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Books Read</div>
                                            </div>
                                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                                <div className="text-2xl font-bold text-slate-900 mb-1">3.4k</div>
                                                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Pages Turned</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScaleIn>
                        </div>
                    </div>
                </section>

                {/* FAQ Teaser */}
                {/* FAQ Teaser */}
                <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg ring-1 ring-white/20">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                            Still have questions?
                        </h2>
                        <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
                            Check out our FAQ page for more detailed information about how Libro works, pricing, and features.
                        </p>

                        <div className="flex justify-center">
                            <Link
                                to="/faq"
                                className="inline-flex items-center gap-2.5 px-8 py-5 bg-white hover:bg-slate-50 text-emerald-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-0.5 text-lg"
                            >
                                Visit FAQ
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
