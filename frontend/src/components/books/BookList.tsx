import React, { useEffect, useState } from 'react';
import type { Book } from '@/types/Book';
import { getBooks, deleteBook } from '@/services/bookService';
import BookCard from './BookCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import BookForm from './BookForm';

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

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    // Create/Edit Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

    // Delete Alert Dialog State
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error("Failed to fetch books", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDeleteClick = (id: number) => {
        const book = books.find(b => b.id === id);
        if (book) {
            setBookToDelete(book);
            setIsDeleteAlertOpen(true);
        }
    };

    const confirmDelete = async () => {
        if (!bookToDelete) return;

        try {
            await deleteBook(bookToDelete.id);
            setBooks(books.filter(book => book.id !== bookToDelete.id));
            toast.success("Book deleted successfully");
        } catch (error) {
            console.error("Failed to delete book", error);
            toast.error("Failed to delete book");
        } finally {
            setIsDeleteAlertOpen(false);
            setBookToDelete(null);
        }
    };

    const handleEdit = (book: Book) => {
        setSelectedBook(book);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedBook(undefined);
        setIsDialogOpen(true);
    };

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
        fetchBooks();
    };

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
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Library Collection</h2>
                    <p className="text-slate-500 mt-2">Manage your book collection.</p>
                </div>
                <Button onClick={handleCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105">
                    <Plus className="mr-2 h-4 w-4" /> Add Book
                </Button>
            </motion.div>

            {books.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-20 border rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border-dashed border-slate-200 dark:border-slate-800">
                    <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No books yet</h3>
                    <p className="text-slate-500 mt-2 max-w-sm mx-auto">Get started by adding your first book to the collection.</p>
                    <Button onClick={handleCreate} variant="outline" className="mt-6 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800">
                        Add Book
                    </Button>
                </motion.div>
            ) : (
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Create/Edit Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{selectedBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
                        <DialogDescription>
                            {selectedBook ? 'Make changes to the book details below.' : 'Fill in the details to add a new book to the library.'}
                        </DialogDescription>
                    </DialogHeader>
                    <BookForm
                        book={selectedBook}
                        onSuccess={handleFormSuccess}
                        onCancel={() => setIsDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Alert */}
            <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete
                            <span className="font-semibold text-foreground"> "{bookToDelete?.title}" </span>
                            from the library.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setBookToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    );
};

export default BookList;
