import React from 'react';
import type { Book } from '@/types/Book';
import { BookFormat } from '@/types/Book';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2, BookOpen, Smartphone, Layers } from 'lucide-react';
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
    onBorrow?: (book: Book) => void;
    onReturn?: (book: Book) => void;
    hideActions?: boolean;
}

const BookCard = React.forwardRef<HTMLDivElement, BookCardProps>(({ book, onEdit, onDelete, onBorrow, onReturn: _onReturn, hideActions }, ref) => {

    const isPhysical = book.isPhysical || (!book.isPhysical && !book.isDigital); // Default to physical if not specified
    const isDigital = book.isDigital;

    // Helper to get format icon
    const getFormatIcon = () => {
        if (isDigital) return <Smartphone className="h-3 w-3 mr-1" />;
        return <BookOpen className="h-3 w-3 mr-1" />;
    };

    // Helper to get format label
    const getFormatLabel = () => {
        if (book.format === BookFormat.EPUB) return "eBook (ePub)";
        if (book.format === BookFormat.PDF) return "PDF";
        if (isDigital) return "Digital";
        return "Physical Copy";
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 group relative overflow-hidden">
                {/* Format Badge (Top Right) */}
                <div className="absolute top-2 right-2 flex gap-1">
                    <Badge variant={isDigital ? "secondary" : "outline"} className={`text-[10px] px-2 py-0.5 h-5 ${isDigital ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-amber-50 text-amber-800 border-amber-100"}`}>
                        {getFormatIcon()}
                        {getFormatLabel()}
                    </Badge>
                </div>

                <CardHeader className="flex flex-col items-start space-y-0 pb-2 pt-8">
                    <div className="space-y-1 w-full pr-6">
                        <CardTitle className="text-lg font-bold leading-tight line-clamp-1 group-hover:text-emerald-700 transition-colors" title={book.title}>
                            {book.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-1 text-sm font-medium text-slate-500">by {book.author}</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="flex-grow space-y-3">
                    {/* Availability Info */}
                    {isPhysical && (
                        <div className="flex items-center text-xs space-x-2">
                            <Badge variant="outline" className={`px-2 py-0.5 h-5 ${book.availableCopies! > 0 ? "text-emerald-600 border-emerald-100 bg-emerald-50" : "text-red-600 border-red-100 bg-red-50"}`}>
                                {book.availableCopies! > 0 ? `${book.availableCopies} Available` : "Out of Stock"}
                            </Badge>
                            <span className="text-slate-400">of {book.totalCopies || 1} copies</span>
                        </div>
                    )}

                    {book.description && (
                        <p className="text-sm text-slate-500/90 leading-relaxed line-clamp-3">
                            {book.description}
                        </p>
                    )}

                    {/* Shelf Location if User is Admin roughly (or just show it for now) */}
                    {book.shelfLocation && (
                        <div className="flex items-center text-xs text-slate-400">
                            <Layers className="h-3 w-3 mr-1" />
                            Loc: {book.shelfLocation}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="pt-2 flex flex-col gap-3">
                    {/* Action Button */}
                    <div className="w-full">
                        {isPhysical ? (
                            <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-lg p-3 text-center">
                                {book.availableCopies && book.availableCopies > 0 ? (
                                    <div className="flex flex-col gap-1 items-center">
                                        <div className="text-emerald-700 dark:text-emerald-400 font-medium text-sm flex items-center">
                                            <BookOpen className="w-4 h-4 mr-1.5" />
                                            Available at Library
                                        </div>
                                        {book.shelfLocation && (
                                            <div className="text-xs text-slate-500 font-medium bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                                                Shelf: {book.shelfLocation}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-red-600 dark:text-red-400 font-medium text-sm flex items-center justify-center">
                                        <Layers className="w-4 h-4 mr-1.5" />
                                        Currently Issued
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                                onClick={() => onBorrow && onBorrow(book)}
                            >
                                <Smartphone className="mr-2 h-4 w-4" /> Read Now
                            </Button>
                        )}
                    </div>

                    <div className="flex justify-between items-center w-full">
                        {book.category && (
                            <div className="text-xs font-semibold text-emerald-700">
                                {book.category}
                            </div>
                        )}

                        {!hideActions && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 ml-auto">
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
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
});

BookCard.displayName = "BookCard";

export default BookCard;
