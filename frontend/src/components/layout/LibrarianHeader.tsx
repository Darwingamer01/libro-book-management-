import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, LayoutDashboard, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function LibrarianHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 text-slate-100">
            <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/librarian/dashboard" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-emerald-500 transition-colors">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">Libro Librarian</span>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/librarian/dashboard"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/librarian/dashboard')
                                ? 'bg-slate-800 text-emerald-400'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <Link
                            to="/librarian/inventory"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/librarian/inventory')
                                ? 'bg-slate-800 text-emerald-400'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            Inventory
                        </Link>
                        <Link
                            to="/librarian/loans"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/librarian/loans')
                                ? 'bg-slate-800 text-emerald-400'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            <ArrowLeftRight className="w-4 h-4" />
                            Loans
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <button className="flex items-center gap-2 focus:outline-none">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium shadow-md group-hover:shadow-emerald-500/20 transition-all">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </div>
                            </button>

                            <div className="absolute right-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 pt-2">
                                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5">
                                    <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                                        <p className="text-sm font-medium text-white">{user?.username}</p>
                                        <p className="text-xs text-slate-400 mt-0.5 truncate">librarian@libro.com</p>
                                        <p className="text-xs text-emerald-400 mt-1 font-medium bg-emerald-400/10 inline-block px-1.5 py-0.5 rounded">Librarian</p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
