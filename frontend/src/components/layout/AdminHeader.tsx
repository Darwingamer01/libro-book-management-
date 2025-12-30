import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, LayoutDashboard, BookMarked, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';

export function AdminHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

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
                    <Link to="/admin/dashboard" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-emerald-500 transition-colors">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">Libro Admin</span>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            to="/admin/dashboard"
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isActive('/admin/dashboard')
                                ? 'bg-slate-800 text-emerald-400'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </div>
                        </Link>
                        <Link
                            to="/admin/books"
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isActive('/admin/books')
                                ? 'bg-slate-800 text-emerald-400'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <BookMarked className="w-4 h-4" />
                                Manage Books
                            </div>
                        </Link>
                        {/* Placeholder links for visual completeness */}
                        <div className="px-4 py-2 rounded-md text-sm font-medium text-slate-500 cursor-not-allowed flex items-center gap-2">
                            <Users className="w-4 h-4" /> Users
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-slate-400 hover:text-white hover:bg-red-900/20 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
