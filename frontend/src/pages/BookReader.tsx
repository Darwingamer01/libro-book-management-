import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Book } from '../types/Book';
import { getBookById } from '../services/bookService';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

export default function BookReader() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

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
        return <div className="container mx-auto py-10"><Skeleton className="h-[600px] w-full" /></div>;
    }

    if (!book) {
        return <div className="container mx-auto py-10">Book not found</div>;
    }

    return (
        <div className="min-h-screen bg-[#f8f5f2] dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 flex flex-col">
            {/* Reader Header */}
            <header className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b px-4 py-3 flex justify-between items-center shadow-sm">
                <div className="flex items-center">
                    <Link to={`/books/${book.id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Exit
                        </Button>
                    </Link>
                    <span className="ml-4 font-semibold hidden md:inline-block">{book.title}</span>
                </div>
                <div className="text-sm text-gray-500">
                    Page {page} of {book.pageCount || 100}
                </div>
            </header>

            {/* Reader Content */}
            <main className="flex-1 container mx-auto max-w-3xl py-10 px-6 prose dark:prose-invert lg:prose-xl">
                <h1 className="text-center mb-8">{book.title}</h1>
                <div className="whitespace-pre-wrap font-serif leading-loose">
                    {book.content || "No content available for this book."}
                </div>

                {/* Mock Pagination Content for "demo" feel if content is short */}
                <div className="mt-8 p-4 bg-yellow-50 dark:bg-zinc-900 border rounded-lg text-sm text-center text-gray-500">
                    <p>(This is a demo reader. In a real app, content would be paginated.)</p>
                </div>
            </main>

            {/* Reader Footer Controls */}
            <footer className="sticky bottom-0 bg-white/90 dark:bg-black/90 border-t px-4 py-4 flex justify-center gap-4">
                <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    <ArrowLeftCircle className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setPage(p => p + 1)}
                >
                    Next <ArrowRightCircle className="ml-2 h-4 w-4" />
                </Button>
            </footer>
        </div>
    );
}
