import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Book } from '../types/Book';
import { getBooks } from '../services/bookService';
import BookCard from '../components/books/BookCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { motion } from 'framer-motion';
import { BookOpen, Bookmark, Flame } from 'lucide-react';

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

export default function UserDashboard() {
    const { user } = useAuth();
    const [recentBooks, setRecentBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await getBooks();
            // Simulate "Recent" by taking first 4 for now
            setRecentBooks(data.slice(0, 4));
        } catch (error) {
            console.error('Failed to fetch books', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="container mx-auto py-8 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back, {user?.username}</h1>
                <p className="text-slate-500 mt-2">Pick up where you left off or discover something new.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3 mb-12">
                <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100">Books Read</CardTitle>
                        <BookOpen className="h-4 w-4 text-emerald-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">12</div>
                        <p className="text-xs text-emerald-100/80 mt-1">+2 from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white relative overflow-hidden group border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-600">
                        <Bookmark className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Pages Read</CardTitle>
                        <Bookmark className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">3,450</div>
                        <p className="text-xs text-slate-500 mt-1">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white relative overflow-hidden group border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-orange-500">
                        <Flame className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Reading Streak</CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">5 Days</div>
                        <p className="text-xs text-slate-500 mt-1">Keep it up!</p>
                    </CardContent>
                </Card>
            </motion.div>

            <section>
                <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Recommended for You</h2>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col space-y-3">
                                <Skeleton className="h-[250px] w-full rounded-xl" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recentBooks.map((book) => (
                            <motion.div key={book.id} variants={itemVariants}>
                                <BookCard book={book} onDelete={() => { }} onEdit={() => { }} hideActions />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>
        </motion.div>
    );
}
