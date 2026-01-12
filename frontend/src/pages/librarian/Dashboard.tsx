import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStats as fetchStatsAPI } from '@/services/librarianService'; // Ensure correct import
import { LayoutDashboard, AlertCircle, BookOpen, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
        <div className="container mx-auto py-8 px-4 mt-16 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <LayoutDashboard className="text-emerald-600" />
                        Librarian Dashboard
                    </h1>
                    <p className="text-slate-500 mt-2">Overview of library operations and key metrics.</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mb-8">
                <Button asChild variant="outline" className="gap-2 h-12">
                    <Link to="/librarian/loans">
                        <Users className="w-4 h-4" />
                        Go to Circulation
                    </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2 h-12">
                    <Link to="/librarian/inventory">
                        <BookOpen className="w-4 h-4" />
                        Go to Inventory
                    </Link>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Inventory</CardTitle>
                        <BookOpen className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalBooks}</div>
                        <p className="text-xs text-slate-500 mt-1">Books in catalog</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500">Active Loans</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.activeLoans}</div>
                        <p className="text-xs text-slate-500 mt-1">Currently checked out</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-red-100 dark:border-red-900/20 bg-red-50/10">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-red-600">Overdue Books</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.overdueBooks}</div>
                        <p className="text-xs text-red-400 mt-1">Requires attention</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Fines</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">${stats.finesCollected}</div>
                        <p className="text-xs text-slate-500 mt-1">Outstanding pending fines</p>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder for Graphs or Activity Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="h-[300px] flex items-center justify-center bg-slate-50 border-dashed">
                    <p className="text-slate-400">Activity Chart Placeholder</p>
                </Card>
                <Card className="h-[300px] flex items-center justify-center bg-slate-50 border-dashed">
                    <p className="text-slate-400">Recent Transactions Placeholder</p>
                </Card>
            </div>
        </div>
    );
};

export default LibrarianDashboard;
