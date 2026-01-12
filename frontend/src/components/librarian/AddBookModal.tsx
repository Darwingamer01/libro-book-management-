import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createBook } from '@/services/librarianService';
import { toast } from 'sonner';
import { BookFormat, BookSource } from '@/types/Book';
import { Plus } from 'lucide-react';

interface AddBookModalProps {
    onBookAdded: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onBookAdded }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        isbn: '',
        publicationYear: new Date().getFullYear(),
        publisher: '',
        pageCount: 0,
        language: 'English',
        description: '',
        coverImageUrl: '',
        totalCopies: 1,
        availableCopies: 1,
        shelfLocation: '',
        isPhysical: true,
        isDigital: false,
        format: BookFormat.PHYSICAL_ONLY,
        source: BookSource.LIBRARY_ASSET
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'publicationYear' || name === 'pageCount' || name === 'totalCopies' || name === 'availableCopies'
                ? parseInt(value) || 0
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Sync available copies with total copies for new books usually
            const payload = { ...formData, availableCopies: formData.totalCopies };
            await createBook(payload);
            toast.success("Book added successfully");
            setOpen(false);
            onBookAdded();
            // Reset form
            setFormData({
                title: '',
                author: '',
                category: '',
                isbn: '',
                publicationYear: new Date().getFullYear(),
                publisher: '',
                pageCount: 0,
                language: 'English',
                description: '',
                coverImageUrl: '',
                totalCopies: 1,
                availableCopies: 1,
                shelfLocation: '',
                isPhysical: true,
                isDigital: false,
                format: BookFormat.PHYSICAL_ONLY,
                source: BookSource.LIBRARY_ASSET
            });
        } catch (error) {
            toast.error("Failed to add book");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Book
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                <DialogHeader>
                    <DialogTitle>Add New Book to Inventory</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="author">Author *</Label>
                            <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Input id="category" name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. Fiction" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="totalCopies">Total Copies *</Label>
                            <Input type="number" id="totalCopies" name="totalCopies" value={formData.totalCopies} onChange={handleChange} min={1} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="shelfLocation">Shelf Location *</Label>
                            <Input id="shelfLocation" name="shelfLocation" value={formData.shelfLocation} onChange={handleChange} placeholder="e.g. A1-23" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="publisher">Publisher</Label>
                            <Input id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pageCount">Page Count</Label>
                            <Input type="number" id="pageCount" name="pageCount" value={formData.pageCount} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="publicationYear">Year</Label>
                            <Input type="number" id="publicationYear" name="publicationYear" value={formData.publicationYear} onChange={handleChange} />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="coverImageUrl">Cover Image URL</Label>
                            <Input id="coverImageUrl" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} placeholder="https://..." />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Book'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddBookModal;
