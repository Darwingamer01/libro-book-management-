import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Book } from '../types/Book';
import { getBookById } from '../services/bookService';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, BookOpen, User } from 'lucide-react';

export default function BookDetail() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchBook(parseInt(id));
        }
    }, [id]);

    const fetchBook = async (bookId: number) => {
        try {
            const data = await getBookById(bookId);
            setBook(data);
        } catch (error) {
            console.error('Failed to fetch book', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="container mx-auto py-10"><Skeleton className="h-[400px] w-full" /></div>;
    }

    if (!book) {
        return <div className="container mx-auto py-10">Book not found</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-0">
            <Link to="/dashboard">
                <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cover Image Column */}
                <div className="md:col-span-1">
                    <div className="rounded-lg shadow-xl overflow-hidden aspect-[2/3] relative">
                        <img
                            src={book.coverImageUrl || `https://placehold.co/400x600?text=${book.title}`}
                            alt={book.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Details Column */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">{book.title}</h1>
                            <Badge variant={book.isAvailable ? "default" : "destructive"}>
                                {book.isAvailable ? "Available" : "Checked Out"}
                            </Badge>
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-300 flex items-center">
                            <User className="mr-2 h-5 w-5" /> {book.author}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Badge variant="secondary">{book.category}</Badge>
                        <Badge variant="outline">{book.language || 'English'}</Badge>
                        <Badge variant="outline">{book.pageCount || '?'} Pages</Badge>
                        <Badge variant="outline">{book.publicationYear || 'N/A'}</Badge>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-semibold mb-2">Description</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {book.description}
                        </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-semibold block">Publisher:</span> {book.publisher || 'Unknown'}
                        </div>
                        <div>
                            <span className="font-semibold block">ISBN:</span> {book.isbn || 'N/A'}
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link to={`/read/${book.id}`}>
                            <Button size="lg" className="w-full md:w-auto">
                                <BookOpen className="mr-2 h-5 w-5" /> Read Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
