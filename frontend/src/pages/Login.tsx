import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { BookOpen, ArrowLeft, Eye, EyeOff, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showCredentials, setShowCredentials] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', { username, password });
            const { token, username: user, role } = response.data;
            login(token, user, role);
            toast({ title: 'Welcome back!', description: 'Logged in successfully' });
            navigate(role === 'ADMIN' ? '/admin/dashboard' : '/dashboard');
        } catch (error) {
            toast({ variant: 'destructive', title: 'Login Failed', description: 'Please check your credentials and try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-black">
            {/* Left Side - Visual/Brand */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop"
                    alt="Library"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-1000"
                />
                <div className="relative z-20 p-12 text-white max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity w-fit">
                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                <BookOpen className="w-8 h-8 text-emerald-400" />
                            </div>
                            <span className="text-3xl font-bold tracking-tight text-white">Libro</span>
                        </Link>
                        <h2 className="text-4xl font-bold mb-4 leading-tight">Welcome back to your sanctuary.</h2>
                        <p className="text-lg text-emerald-100/80">
                            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-950">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-sm space-y-8"
                >
                    <div className="space-y-2 text-center lg:text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-slate-900"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Sign In</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 pl-2">Enter your credentials to access your library</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 relative">
                            <Label htmlFor="username">Username</Label>
                            <div
                                className="relative"
                                onMouseEnter={() => setShowCredentials(true)}
                                onMouseLeave={() => setShowCredentials(false)}
                            >
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="johndoe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                                <AnimatePresence>
                                    {showCredentials && (username === '') && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute left-0 top-full mt-2 w-full z-50 pointer-events-none"
                                        >
                                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-3 pointer-events-auto cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                                                onClick={() => {
                                                    setUsername('admin');
                                                    setPassword('password');
                                                    setShowCredentials(false);
                                                }}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Click to fill demo user</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">admin</span>
                                                            <span className="text-slate-300 dark:text-slate-600">•</span>
                                                            <div className="flex gap-0.5">
                                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                                                    <div key={i} className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="relative flex items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 dark:border-slate-700 dark:bg-slate-900"
                                        />
                                    </div>
                                    <div className="ml-2 text-sm leading-6">
                                        <label htmlFor="remember" className="font-medium text-slate-700 dark:text-slate-300">
                                            Remember for 30 days
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02]" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
