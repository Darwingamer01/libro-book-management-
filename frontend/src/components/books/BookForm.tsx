import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Book } from '@/types/Book';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createBook, updateBook } from '@/services/bookService';
import { toast } from 'sonner';

const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    description: z.string().optional(),
    category: z.string().optional(),
    totalCopies: z.coerce.number().min(0, "Copies must be 0 or more").default(1),
    // Handle "true"/"false" strings from radio inputs and transform to boolean
    isPhysical: z.union([z.boolean(), z.string()]).transform((val) => val === true || val === 'true'),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
    book?: Book;
    onSuccess: () => void;
    onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSuccess, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookFormValues>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: '',
            author: '',
            description: '',
            category: '',
            totalCopies: 1,
            isPhysical: true
        }
    });

    useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                author: book.author,
                description: book.description || '',
                category: book.category || '',
                totalCopies: book.totalCopies || 1,
                isPhysical: book.isPhysical ?? true
            });
        } else {
            reset({
                title: '',
                author: '',
                description: '',
                category: '',
                totalCopies: 1,
                isPhysical: true
            });
        }
    }, [book, reset]);

    const onSubmit = async (data: BookFormValues) => {
        try {
            if (book && book.id) {
                await updateBook(book.id, data as any);
            } else {
                // Logic: If creating new book, set availableCopies = totalCopies initially
                const newBookData = {
                    ...data,
                    availableCopies: data.totalCopies,
                    // If isPhysical is true, ensure format is PHYSICAL_ONLY (or handled by backend logic if defaulted)
                };
                await createBook(newBookData as any);
            }
            onSuccess();
            toast.success(book ? "Book updated successfully" : "Book added successfully");
        } catch (error) {
            console.error("Failed to save book", error);
            toast.error("Failed to save book");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-700 font-medium">Title</Label>
                <Input
                    id="title"
                    {...register("title")}
                    placeholder="Enter book title"
                    className="focus-visible:ring-emerald-500 border-slate-200"
                />
                {errors.title && <p className="text-sm text-red-500 font-medium">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="author" className="text-slate-700 font-medium">Author</Label>
                <Input
                    id="author"
                    {...register("author")}
                    placeholder="Enter author name"
                    className="focus-visible:ring-emerald-500 border-slate-200"
                />
                {errors.author && <p className="text-sm text-red-500 font-medium">{errors.author.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-700 font-medium">Category</Label>
                <Input
                    id="category"
                    {...register("category")}
                    placeholder="e.g. Fiction, History"
                    className="focus-visible:ring-emerald-500 border-slate-200"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="totalCopies" className="text-slate-700 font-medium">Total Copies</Label>
                    <Input
                        id="totalCopies"
                        type="number"
                        min="0"
                        {...register("totalCopies")}
                        className="focus-visible:ring-emerald-500 border-slate-200"
                    />
                    {errors.totalCopies && <p className="text-sm text-red-500 font-medium">{errors.totalCopies.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-700 font-medium block">Format</Label>
                    <div className="flex items-center space-x-4 pt-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                value="true"
                                {...register("isPhysical")}
                                defaultChecked
                                className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-slate-700">Physical</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input // Future proofing for Digital support
                                type="radio"
                                value="false"
                                disabled // Disable "Digital" for now until Phase 2 fully ready or logic handled
                                {...register("isPhysical")}
                                className="text-slate-400 focus:ring-slate-400"
                            />
                            <span className="text-sm text-slate-400">Digital (Coming Soon)</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Brief description about the book"
                    className="resize-none focus-visible:ring-emerald-500 border-slate-200"
                    rows={4}
                />
            </div>

            <div className="flex justify-end space-x-3 pt-6">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20"
                >
                    {isSubmitting ? "Saving..." : (book ? "Update Book" : "Add Book")}
                </Button>
            </div>
        </form>
    );
};

export default BookForm;
