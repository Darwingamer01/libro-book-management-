import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { Users, BookOpen, Target, Heart, Shield } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { ScaleIn } from '../components/animations/ScaleIn';

export default function About() {
    return (
        <div className="min-h-screen pt-24 flex flex-col bg-slate-50">
            <div className="flex-grow">
                {/* Hero */}
                <section className="px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-50"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8 backdrop-blur-sm">
                                <Users className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-700">About Us</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
                                Reimagining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Digital Library</span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                                We are building the future of how people interact with, organize, and discover books in the digital age.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* Mission */}
                <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-3xl transform rotate-3 blur-lg"></div>
                                <div className="relative bg-slate-900 p-8 rounded-3xl shadow-2xl aspect-video flex items-center justify-center overflow-hidden group">
                                    <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1507842217121-9e93922cc131?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>
                                    <div className="text-center relative z-10">
                                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-white/20 shadow-lg">
                                            <BookOpen className="w-10 h-10 text-emerald-400" />
                                        </div>
                                        <h3 className="text-white text-3xl font-bold tracking-tight">Our Vision</h3>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Why We Started</h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                    As avid readers ourselves, we felt that existing digital library tools were functional but uninspiring. Spreadsheets were good for data but lacked soul. Traditional apps felt cluttered and outdated.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    We wanted to create a space that felt as magical as a physical library—a place where you could wander, explore, and feel a sense of pride in your collection. <span className="font-semibold text-emerald-700">Libro</span> is the result of that dream: a beautiful, modern, and powerful home for your reading life.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="px-4 sm:px-6 lg:px-8 py-24 bg-slate-50 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Our Core Values</h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                The principles that guide every feature we build and every decision we make.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Target,
                                    title: 'Simplicity',
                                    desc: 'We believe in design that gets out of the way. Complex power, simple interface.',
                                    gradient: 'from-emerald-400 to-emerald-600'
                                },
                                {
                                    icon: Heart,
                                    title: 'Passion',
                                    desc: 'We love books, and we build for people who love books. That passion drives every feature.',
                                    gradient: 'from-rose-400 to-rose-600'
                                },
                                {
                                    icon: Shield,
                                    title: 'Privacy',
                                    desc: 'Your reading history is personal. We treat your data with the utmost respect and security.',
                                    gradient: 'from-blue-400 to-blue-600'
                                },
                            ].map((val, idx) => (
                                <ScaleIn key={idx} delay={idx * 0.1}>
                                    <div className="group h-full p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/60 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${val.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <val.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">{val.title}</h3>
                                            <p className="text-slate-600 leading-relaxed text-base">
                                                {val.desc}
                                            </p>
                                        </div>
                                    </div>
                                </ScaleIn>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
