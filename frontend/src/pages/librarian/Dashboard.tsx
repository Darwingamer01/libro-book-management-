import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStats as fetchStatsAPI } from '@/services/librarianService';
import { AlertCircle, BookOpen, Users, ArrowUpRight, BookCopy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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

const LibrarianDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        activeLoans: 0,
        overdueBooks: 0,
        finesCollected: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const s = await fetchStatsAPI();
            setStats(s);
        } catch (error) {
            console.error("Failed to load stats", error);
        }
    };

    return (
        <motion.div
            className="container mx-auto py-8 px-4 mt-16 max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                        Librarian Dashboard
                    </h1>
                    <p className="text-slate-500 mt-2">Overview of library operations and key metrics.</p>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="flex gap-4 mb-8">
                <Button asChild className="gap-2 h-12 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all">
                    <Link to="/librarian/loans">
                        <Users className="w-4 h-4" />
                        Go to Circulation
                    </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2 h-12 border-slate-200 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all">
                    <Link to="/librarian/inventory">
                        <BookOpen className="w-4 h-4" />
                        Go to Inventory
                    </Link>
                </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Total Inventory - Styled like "Books Read" */}
                <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookCopy className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100">Total Inventory</CardTitle>
                        <BookOpen className="h-4 w-4 text-emerald-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.totalBooks}</div>
                        <p className="text-xs text-emerald-100/80 mt-1">Books in catalog</p>
                    </CardContent>
                </Card>

                {/* Active Loans - Styled like "Pages Read" */}
                <Card className="border-none shadow-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white relative overflow-hidden group border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-blue-600">
                        <Users className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Active Loans</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.activeLoans}</div>
                        <p className="text-xs text-slate-500 mt-1">Currently checked out</p>
                    </CardContent>
                </Card>

                {/* Overdue Books - Red Accent */}
                <Card className="border-none shadow-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white relative overflow-hidden group border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-red-600">
                        <AlertCircle className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Overdue Books</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600">{stats.overdueBooks}</div>
                        <p className="text-xs text-red-400 mt-1">Requires attention</p>
                    </CardContent>
                </Card>

                {/* Total Fines - Gold/Orange Accent */}
                <Card className="border-none shadow-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white relative overflow-hidden group border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-600">
                        <ArrowUpRight className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Fines</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">${stats.finesCollected}</div>
                        <p className="text-xs text-slate-500 mt-1">Outstanding pending fines</p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Placeholder for Graphs or Activity Feed */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="h-[300px] flex items-center justify-center bg-slate-50 border-dashed border-2 shadow-none hover:bg-slate-100 transition-colors">
                    <div className="text-center">
                        <p className="text-slate-400 font-medium">Activity Chart Overview</p>
                        <p className="text-slate-400 text-sm">Coming Soon</p>
                    </div>
                </Card>
                <Card className="h-[300px] flex items-center justify-center bg-slate-50 border-dashed border-2 shadow-none hover:bg-slate-100 transition-colors">
                    <div className="text-center">
                        <p className="text-slate-400 font-medium">Recent Transactions Log</p>
                        <p className="text-slate-400 text-sm">Coming Soon</p>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default LibrarianDashboard;
