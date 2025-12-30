import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
    return (
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
                        <Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
