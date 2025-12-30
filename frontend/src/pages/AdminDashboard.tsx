import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/adminService';
import type { DashboardStats } from '../services/adminService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Users, BookOpen, Eye } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch admin stats', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto py-10 px-4 mt-16">
                <Skeleton className="h-[200px] w-full" />
            </div>
        );
    }

    if (!stats) return <div className="text-center py-20 text-slate-500 mt-16">Failed to load stats</div>;

    return (
        <motion.div
            className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-slate-500 mt-2">Overview of library activity and content.</p>
                </div>
                <div className="mt-4 sm:mt-0 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                    System Active
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Total Books</CardTitle>
                        <BookOpen className="h-4 w-4 text-blue-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalBooks}</div>
                        <p className="text-xs text-blue-100/80 mt-1">+{stats.booksAddedToday} added today</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-emerald-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-emerald-100/80 mt-1">Active readers</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white relative overflow-hidden group border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-500">
                        <Eye className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalViews}</div>
                        <p className="text-xs text-slate-500 mt-1">Page interactions</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white relative overflow-hidden group border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-500">
                        <BarChart className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Categories</CardTitle>
                        <BarChart className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{Object.keys(stats.booksByCategory).length}</div>
                        <p className="text-xs text-slate-500 mt-1">Active genres</p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div variants={itemVariants} className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="border shadow-lg border-slate-100 bg-white/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800">Books by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {Object.entries(stats.booksByCategory)
                                .sort(([, a], [, b]) => b - a)
                                .map(([category, count]) => (
                                    <div key={category} className="group">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-sm font-medium text-slate-700">{category}</div>
                                            <div className="text-sm font-medium text-slate-500">{count} books</div>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:scale-x-[1.02] transition-transform origin-left duration-500"
                                                style={{ width: `${(count / stats.totalBooks) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
