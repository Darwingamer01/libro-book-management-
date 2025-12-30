import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import {
    HelpCircle,
    Plus,
    Minus,
    MessageCircle,
    ArrowRight
} from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { Link } from 'react-router-dom';

const faqs = [
    {
        question: "Is Libro really free to use?",
        answer: "Yes! Libro allows you to create your personal digital library completely for free. We believe everyone deserves a beautiful space to organize their reading journey. We may introduce premium features in the future, but the core experience will always remain free."
    },
    {
        question: "How does the 3D library visualization work?",
        answer: "Our 3D engine procedurally generates a virtual bookshelf based on your collection. You can customize the look of your shelves, arrange books by color, size, or genre, and navigate through your library using intuitive camera controls."
    },
    {
        question: "Can I import my books from other platforms?",
        answer: "Currently, we support CSV import which allows you to bring your data from Goodreads and other platforms. We are working on direct API integrations to make this process even smoother in upcoming updates.",
    },
    {
        question: "Is there a mobile app available?",
        answer: "Libro is a Progressive Web App (PWA), which means you can install it on your iOS or Android device directly from the browser. It works offline and offers a native-like experience without needing to download from an app store."
    },
    {
        question: "How do you handle my data privacy?",
        answer: "We take privacy seriously. Your reading data is encrypted and stored securely. We do not sell your personal information to third parties. You can read our full Privacy Policy for more details."
    }
];

export default function FAQ() {
    return (
        <div className="min-h-screen pt-24 flex flex-col bg-white">
            <div className="flex-grow">
                {/* Header */}
                <section className="px-6 sm:px-8 lg:px-12 py-20 text-center relative overflow-hidden">
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8 backdrop-blur-sm">
                            <HelpCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-700">Support Center</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                        </p>
                    </FadeIn>
                </section>

                {/* FAQ Accordion */}
                <section className="px-6 sm:px-8 lg:px-12 pb-24">
                    <div className="max-w-3xl mx-auto">
                        <div className="grid gap-6">
                            {faqs.map((faq, idx) => (
                                <FAQItem key={idx} question={faq.question} answer={faq.answer} index={idx} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg ring-1 ring-white/20">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                            Still have questions?
                        </h2>
                        <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
                            Can't find the answer you're looking for? Please chat to our friendly team.
                        </p>

                        <div className="flex justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2.5 px-8 py-5 bg-white hover:bg-slate-50 text-emerald-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-0.5 text-lg"
                            >
                                Get in Touch
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

function FAQItem({ question, answer, index }: { question: string, answer: string, index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-2xl bg-white overflow-hidden transition-all duration-300 ${isOpen ? 'border-emerald-200 shadow-lg ring-1 ring-emerald-100' : 'border-slate-200 shadow-sm hover:border-emerald-200 hover:shadow-md'
                }`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-6 text-left"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {question}
                </span>
                <div className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? 'bg-emerald-100 text-emerald-600 rotate-180' : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed text-lg border-t border-slate-100 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
