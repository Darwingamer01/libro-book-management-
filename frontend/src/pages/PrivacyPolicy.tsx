import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen pt-24 flex flex-col">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex-grow">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-6">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-700">Privacy First</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            We are committed to protecting your personal data and ensuring strict confidentiality.
                        </p>
                    </div>

                    <div className="prose prose-slate lg:prose-lg max-w-none">
                        <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <Eye className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-0">1. Information We Collect</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        We collect information that you provide directly to us when you create an account, update your profile, or use our interactive features. This includes:
                                    </p>
                                    <ul className="space-y-2 list-none pl-0">
                                        {['Account Information (Name, Email, Password)', 'Reading History and Preferences', 'Library Data and Collections', 'Usage Data and Device Information'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-emerald-50 rounded-xl">
                                    <Lock className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-0">2. How We Use Your Data</h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        We use the information we collect to operate, maintain, and improve our services, such as:
                                    </p>
                                    <ul className="space-y-2 list-none pl-0">
                                        {['Providing personalized book recommendations', 'Synchronizing your library across devices', 'Analyzing usage trends to improve user experience', 'Sending administrative information and updates'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-purple-50 rounded-xl">
                                    <FileText className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-0">3. Data Security</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, accidental loss, disclosure, or destruction. We regularly review our security practices to ensure the safety of your information.
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
