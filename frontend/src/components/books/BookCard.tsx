import React from 'react';
import type { Book } from '@/types/Book';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from 'framer-motion';

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: number) => void;
    hideActions?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete, hideActions }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="h-full flex flex-col hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 group">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-bold leading-tight line-clamp-1 group-hover:text-emerald-700 transition-colors" title={book.title}>
                            {book.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-1 text-sm font-medium text-slate-500">by {book.author}</CardDescription>
                    </div>
                    {!hideActions && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => onEdit(book)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => book.id && onDelete(book.id)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </CardHeader>
                <CardContent className="flex-grow pt-2">
                    {book.description && (
                        <p className="text-sm text-slate-500/90 leading-relaxed line-clamp-3">
                            {book.description}
                        </p>
                    )}
                </CardContent>
                <CardFooter className="pt-2">
                    {book.category && (
                        <div className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                            {book.category}
                        </div>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default BookCard;
