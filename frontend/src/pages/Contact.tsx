import { useState, useRef, useEffect } from 'react';
import { Footer } from '../components/layout/Footer';
import { Mail, MessageSquare, Phone, Send, ChevronDown, Check } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

const subjectOptions = [
    "General Inquiry",
    "Bug Report",
    "Feature Request",
    "Partnership",
    "Technical Support"
];

function CustomSelect({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 border transition-all duration-300 outline-none flex items-center justify-between group ${isOpen
                        ? 'border-emerald-500 ring-2 ring-emerald-200/50'
                        : 'border-slate-200 hover:border-emerald-400'
                    }`}
            >
                <span className={`text-base ${value ? 'text-slate-900' : 'text-slate-500'}`}>
                    {value || "Select a Subject"}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : 'group-hover:text-emerald-500'}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-slate-100 shadow-xl overflow-hidden py-1"
                    >
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-2.5 text-left text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between group"
                            >
                                {option}
                                {value === option && (
                                    <Check className="w-4 h-4 text-emerald-500" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Contact() {
    const [subject, setSubject] = useState(subjectOptions[0]);

    return (
        <div className="min-h-screen pt-24 flex flex-col bg-slate-50">
            <div className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Contact Info */}
                        <FadeIn>
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl"></div>

                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8 backdrop-blur-sm">
                                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-medium text-emerald-700">Get in Touch</span>
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                                        Let's Chat
                                    </h1>
                                    <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                                        Have a question, feedback, or just want to say hi? We'd love to hear from you. Fill out the form or reach out directly.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-5 group">
                                            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm group-hover:border-emerald-200 group-hover:shadow-md transition-all duration-300">
                                                <Mail className="w-6 h-6 text-emerald-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-1 text-lg">Email Us</h3>
                                                <p className="text-emerald-600 font-medium hover:underline cursor-pointer">support@libro.com</p>
                                                <p className="text-slate-500">partnerships@libro.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-5 group">
                                            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm group-hover:border-emerald-200 group-hover:shadow-md transition-all duration-300">
                                                <Phone className="w-6 h-6 text-emerald-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-1 text-lg">Call Us</h3>
                                                <p className="text-slate-600 font-medium">+1 (555) 123-4567</p>
                                                <p className="text-sm text-slate-500 mt-1">Mon-Fri from 8am to 5pm EST</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Contact Form */}
                        <FadeIn delay={0.2}>
                            <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                <form className="space-y-6 relative z-10">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2.5">First Name</label>
                                            <input type="text" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none placeholder:text-slate-400" placeholder="Jane" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2.5">Last Name</label>
                                            <input type="text" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none placeholder:text-slate-400" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2.5">Email Address</label>
                                        <input type="email" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none placeholder:text-slate-400" placeholder="jane@company.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2.5">Subject</label>
                                        <CustomSelect
                                            options={subjectOptions}
                                            value={subject}
                                            onChange={setSubject}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2.5">Message</label>
                                        <textarea rows={4} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none resize-none placeholder:text-slate-400" placeholder="How can we help you?"></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2.5">
                                        Send Message
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
