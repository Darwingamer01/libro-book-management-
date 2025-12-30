import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">Forgot password?</a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
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
