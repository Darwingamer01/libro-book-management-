import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBooks } from '@/services/bookService';
import type { Book } from '@/types/Book';
import AddBookModal from '@/components/librarian/AddBookModal';
import { Package } from 'lucide-react';

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
        <div className="container mx-auto py-8 px-4 mt-16 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Package className="text-emerald-600" />
                        Inventory Management
                    </h1>
                    <p className="text-slate-500 mt-2">Manage library catalog, stock, and shelf locations.</p>
                </div>
                <AddBookModal onBookAdded={loadBooks} />
            </div>

            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle>Book List</CardTitle>
                    <CardDescription>Total {allBooks.length} titles in catalog</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-hidden">
                        <div className="p-4 grid grid-cols-12 font-medium text-sm text-slate-500 border-b bg-slate-50 dark:bg-slate-900/50">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-4">Title</div>
                            <div className="col-span-3">Author</div>
                            <div className="col-span-2">Location</div>
                            <div className="col-span-2 text-right">Stock</div>
                        </div>
                        <div className="divide-y max-h-[600px] overflow-auto">
                            {allBooks.map(book => (
                                <div key={book.id} className="p-4 grid grid-cols-12 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="col-span-1 text-slate-500">#{book.id}</div>
                                    <div className="col-span-4 font-medium text-slate-900 dark:text-slate-100">{book.title}</div>
                                    <div className="col-span-3 text-slate-600 dark:text-slate-400">{book.author}</div>
                                    <div className="col-span-2">
                                        {book.shelfLocation ? (
                                            <Badge variant="outline" className="font-mono text-xs">
                                                {book.shelfLocation}
                                            </Badge>
                                        ) : (
                                            <span className="text-slate-400 italic text-xs">Unassigned</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <Badge variant={book.availableCopies! > 0 ? 'secondary' : 'destructive'}>
                                            {book.availableCopies} / {book.totalCopies}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Inventory;
