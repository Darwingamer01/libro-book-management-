import React, { useEffect, useState } from 'react';
import type { BorrowingRecord } from '@/types/BorrowingRecord';
import BorrowingCard from '@/components/books/BorrowingCard';
import { getUserHistory, returnBook } from '@/services/borrowService';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const MyBooks: React.FC = () => {
    const [borrowings, setBorrowings] = useState<BorrowingRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

    const fetchHistory = async () => {
        setLoading(true);
        try {
            // Hardcoded User ID 1 for MVP
            const userId = 1;
            const data = await getUserHistory(userId);
            // Sort by date
            const sorted = data.sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime());
            setBorrowings(sorted);
        } catch (error) {
            console.error("Failed to fetch history", error);
            toast.error("Failed to load your books.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleReturn = async (record: BorrowingRecord) => {
        try {
            await returnBook(record.id);
            toast.success("Book returned successfully!");
            fetchHistory(); // Refresh to update status
        } catch (error) {
            console.error("Return failed", error);
            toast.error("Failed to return book.");
        }
    };

    const activeLoans = borrowings.filter(r => r.status === 'BORROWED' || r.status === 'OVERDUE');
    const pastLoans = borrowings.filter(r => r.status === 'RETURNED');
    const displayedLoans = activeTab === 'current' ? activeLoans : pastLoans;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <motion.div
            className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
                        <BookMarked className="mr-3 h-8 w-8 text-emerald-600" />
                        My Books
                    </h2>
                    <p className="text-slate-500 mt-2">Manage your active loans and view reading history.</p>
                </div>

                {/* Stats Summary */}
                <div className="flex gap-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Active</div>
                        <div className="text-2xl font-bold text-emerald-600">{activeLoans.length}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Read</div>
                        <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">{pastLoans.length}</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 rounded-xl bg-slate-100/80 p-1 mb-8 w-fit">
                <button
                    onClick={() => setActiveTab('current')}
                    className={`
                        w-32 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                        ${activeTab === 'current'
                            ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200'
                            : 'text-slate-600 hover:bg-white/[0.12] hover:text-emerald-800'
                        }
                    `}
                >
                    Current Loans
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`
                        w-32 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                        ${activeTab === 'history'
                            ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200'
                            : 'text-slate-600 hover:bg-white/[0.12] hover:text-emerald-800'
                        }
                    `}
                >
                    History
                </button>
            </div>

            <div className="min-h-[400px]">
                {displayedLoans.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                    >
                        <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
                            <BookMarked className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {activeTab === 'current' ? "No active loans" : "No reading history"}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
                            {activeTab === 'current'
                                ? "You don't have any books currently borrowed. Explore our library to find your next read!"
                                : "Your reading history is empty. Start reading today to track your journey."}
                        </p>
                        {activeTab === 'current' && (
                            <Link
                                to="/books"
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                            >
                                Browse Library
                            </Link>
                        )}
                    </motion.div>
                ) : (
                    <motion.div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {displayedLoans.map((record) => (
                                <motion.div
                                    key={record.id}
                                    variants={itemVariants}
                                    layout
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                >
                                    <BorrowingCard record={record} onReturn={handleReturn} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default MyBooks;
