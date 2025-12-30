import { motion } from 'framer-motion';
import { Scale, FileCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

export default function TermsOfService() {
    return (
        <div className="min-h-screen pt-24 flex flex-col">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex-grow">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200/60 rounded-full mb-6">
                            <Scale className="w-4 h-4 text-teal-600" />
                            <span className="text-sm font-medium text-teal-700">Legal Agreement</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            Terms of Service
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Please read these terms carefully before using our services.
                        </p>
                    </div>

                    <div className="prose prose-slate lg:prose-lg max-w-none">
                        <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-teal-50 rounded-xl">
                                    <FileCheck className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-0">1. Acceptance of Terms</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        By accessing or using Libro ("the Service"), you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-orange-50 rounded-xl">
                                    <AlertCircle className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-0">2. User Responsibilities</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        When creating an account, you must provide accurate and complete information. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                                    </p>
                                    <ul className="space-y-2 list-none pl-0">
                                        {['You must not use the service for any illegal purposes', 'You must not violate any laws in your jurisdiction', 'You must respectful to other community members', 'You are responsible for your content backup'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600">
                                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <HelpCircle className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-0">3. Termination</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="text-center pt-8 border-t border-slate-200">
                            <p className="text-slate-500 text-sm">
                                Last updated: December 31, 2025
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
