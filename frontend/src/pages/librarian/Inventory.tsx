import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBooks } from '@/services/bookService';
import type { Book } from '@/types/Book';
import AddBookModal from '@/components/librarian/AddBookModal';
import { Package } from 'lucide-react';
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

const Inventory: React.FC = () => {
    const [allBooks, setAllBooks] = useState<Book[]>([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await getBooks();
            setAllBooks(data);
        } catch (error) {
            console.error("Failed to load books", error);
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
                        Inventory Management
                    </h1>
                    <p className="text-slate-500 mt-2">Manage library catalog, stock, and shelf locations.</p>
                </div>
                <AddBookModal onBookAdded={loadBooks} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <Card className="border-none shadow-lg bg-white dark:bg-slate-900 overflow-hidden">
                    <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-emerald-600" />
                            <CardTitle className="text-lg">Book List</CardTitle>
                        </div>
                        <CardDescription>Total {allBooks.length} titles in catalog</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-12 px-6 py-3 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/80 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-4">Title</div>
                            <div className="col-span-3">Author</div>
                            <div className="col-span-2">Location</div>
                            <div className="col-span-2 text-right">Stock</div>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[600px] overflow-auto">
                            {allBooks.map(book => (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="px-6 py-4 grid grid-cols-12 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                                >
                                    <div className="col-span-1 text-slate-400 font-mono text-xs">#{book.id}</div>
                                    <div className="col-span-4 font-medium text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 transition-colors">
                                        {book.title}
                                    </div>
                                    <div className="col-span-3 text-slate-600 dark:text-slate-400">{book.author}</div>
                                    <div className="col-span-2">
                                        {book.shelfLocation ? (
                                            <Badge variant="outline" className="font-mono text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                                                {book.shelfLocation}
                                            </Badge>
                                        ) : (
                                            <span className="text-slate-400 italic text-xs">Unassigned</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <Badge
                                            className={`${book.availableCopies! > 0
                                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200'
                                                : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
                                                } shadow-none`}
                                        >
                                            {book.availableCopies} / {book.totalCopies}
                                        </Badge>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default Inventory;
