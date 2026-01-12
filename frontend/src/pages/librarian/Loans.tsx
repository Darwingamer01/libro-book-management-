import React, { useState, useEffect } from 'react';
import { Search, ArrowLeftRight, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { searchUsers, getUserLoans, getAllActiveLoans } from '@/services/librarianService';
import { getBooks } from '@/services/bookService';
import type { User } from '@/types/User';
import type { Book } from '@/types/Book';
import type { BorrowingRecord } from '@/types/BorrowingRecord';
import IssueBookModal from '@/components/librarian/IssueBookModal';
import ReturnBookModal from '@/components/librarian/ReturnBookModal';

const Loans: React.FC = () => {
    // Modal States
    const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
    const [returnRecord, setReturnRecord] = useState<BorrowingRecord | null>(null);

    // Search & Data States
    const [userQuery, setUserQuery] = useState("");
    const [bookQuery, setBookQuery] = useState("");
    const [foundUsers, setFoundUsers] = useState<User[]>([]);
    const [foundBooks, setFoundBooks] = useState<Book[]>([]);
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [userLoans, setUserLoans] = useState<BorrowingRecord[]>([]);
    const [allActiveLoans, setAllActiveLoans] = useState<BorrowingRecord[]>([]);

    // Selection States
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    // Guest States removed (handled in modal)

    // Loading States
    const [searchingUsers, setSearchingUsers] = useState(false);

    // Initial Load
    useEffect(() => {
        loadBooks();
        loadAllUsers();
    }, []);

    const loadAllUsers = async () => {
        try {
            const results = await searchUsers(""); // Empty query to get all
            setFoundUsers(results);
        } catch (error) {
            console.error("Failed to load users", error);
        }
    };

    const loadBooks = async () => {
        try {
            const data = await getBooks();
            setAllBooks(data);
        } catch (error) {
            console.error("Failed to load books", error);
        }
    };

    // User Search Effect (Filtering local or remote)
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setSearchingUsers(true);
            try {
                const results = await searchUsers(userQuery);
                setFoundUsers(results);
            } catch (error) {
                console.error(error);
            } finally {
                setSearchingUsers(false);
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [userQuery]);

    // Book Search
    useEffect(() => {
        if (bookQuery.length > 1) {
            const results = allBooks.filter(b =>
                b.title.toLowerCase().includes(bookQuery.toLowerCase()) ||
                b.isbn?.includes(bookQuery) ||
                b.author.toLowerCase().includes(bookQuery.toLowerCase())
            );
            setFoundBooks(results.slice(0, 5));
        } else {
            setFoundBooks([]);
        }
    }, [bookQuery, allBooks]);

    // Fetch Loans
    const fetchUserLoans = async () => {
        if (selectedUser) {
            try {
                const loans = await getUserLoans(selectedUser.id);
                setUserLoans(loans);
            } catch (error) {
                toast.error("Failed to load user loans");
            }
        }
    };

    const fetchAllActiveLoans = async () => {
        try {
            const loans = await getAllActiveLoans();
            setAllActiveLoans(loans);
        } catch (error) {
            console.error("Failed to load active loans", error);
        }
    };

    useEffect(() => {
        fetchUserLoans();
    }, [selectedUser]);

    useEffect(() => {
        fetchAllActiveLoans();
    }, [isIssueModalOpen, returnRecord]); // Refresh when issue/return happens

    const handleIssueClick = () => {
        if (!selectedBook) return;
        setIsIssueModalOpen(true);
    };

    const handleReturnClick = (record: BorrowingRecord) => {
        setReturnRecord(record);
    };

    const clearSelection = () => {
        setSelectedUser(null);
        setSelectedBook(null);
        setUserQuery("");
        setBookQuery("");
        setUserLoans([]);
    };

    return (
        <div className="container mx-auto py-8 px-4 mt-16 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ArrowLeftRight className="text-emerald-600" />
                        Circulation & Loans
                    </h1>
                    <p className="text-slate-500 mt-2">Issue books and process returns.</p>
                </div>
                <Button variant="outline" onClick={clearSelection}>Reset Selection</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Member Selection Panel - Repurposed for Active Loans Lookup */}
                <div className="lg:col-span-4 space-y-4">
                    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm h-full">
                        <CardHeader>
                            <CardTitle>View User Loans</CardTitle>
                            <CardDescription>Search a member to see their active loans</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search member name..."
                                    className="pl-9"
                                    value={userQuery}
                                    onChange={(e) => setUserQuery(e.target.value)}
                                />
                            </div>

                            {/* User List */}
                            {userQuery.length > 0 && !selectedUser && (
                                <div className="border rounded-md divide-y max-h-48 overflow-y-auto">
                                    {foundUsers.map(user => (
                                        <div key={user.id} className="p-3 hover:bg-slate-50 cursor-pointer flex justify-between" onClick={() => { setSelectedUser(user); setUserQuery(""); }}>
                                            <span className="font-medium">{user.name}</span>
                                            <span className="text-xs text-slate-500">{user.email}</span>
                                        </div>
                                    ))}
                                    {foundUsers.length === 0 && !searchingUsers && <div className="p-3 text-sm text-slate-500 text-center">No users found</div>}
                                </div>
                            )}

                            {selectedUser && (
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-emerald-100 p-2 rounded-full">
                                            <UserIcon className="w-4 h-4 text-emerald-700" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-emerald-800">{selectedUser.name}</div>
                                            <div className="text-xs text-emerald-600">{selectedUser.username}</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>Change</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Circulation Operations Panel - 2/3 Width */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Issue Book Section */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Issue Book</CardTitle>
                            <CardDescription>Search for a book to issue.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search book title or ISBN..."
                                        className="pl-9"
                                        value={bookQuery}
                                        onChange={(e) => setBookQuery(e.target.value)}
                                    />

                                    {/* Book Results */}
                                    {bookQuery.length > 1 && !selectedBook && (
                                        <div className="border rounded-md divide-y max-h-60 overflow-y-auto shadow-lg absolute top-full left-0 right-0 z-[100] bg-white mt-1">
                                            {foundBooks.length > 0 ? (
                                                foundBooks.map(book => (
                                                    <div
                                                        key={book.id}
                                                        className={`p-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center ${book.availableCopies! <= 0 ? 'opacity-50 pointer-events-none' : ''}`}
                                                        onClick={() => { setSelectedBook(book); setBookQuery(""); }}
                                                    >
                                                        <div className="font-medium">{book.title}</div>
                                                        <div className="text-xs">
                                                            {book.availableCopies! > 0 ? <span className="text-emerald-600">{book.availableCopies} Avail</span> : <span className="text-red-500">Out</span>}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-3 text-sm text-slate-500 text-center">No books found matching this title</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {selectedBook && (
                                <div className="p-4 border rounded-lg flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-slate-100">{selectedBook.title}</h4>
                                        <p className="text-sm text-slate-500">{selectedBook.author}</p>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600">ISBN: {selectedBook.isbn}</span>
                                            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600">Loc: {selectedBook.shelfLocation || 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className="flex bg-white dark:bg-slate-800 rounded-md border shadow-sm overflow-hidden">
                                        <Button variant="ghost" onClick={() => setSelectedBook(null)} className="rounded-none border-r">Change</Button>
                                        <Button onClick={handleIssueClick} className="rounded-none bg-emerald-600 hover:bg-emerald-700 text-white">Issue This Book</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Active Loans Section */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>
                                {selectedUser ? `Active Loans for ${selectedUser.name}` : 'All Active Loans'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {(selectedUser ? userLoans : allActiveLoans).length === 0 ? (
                                <div className="text-center py-8 text-slate-500 border border-dashed rounded-lg bg-slate-50/50">
                                    <p>No active loans found.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {(selectedUser ? userLoans : allActiveLoans)
                                        .filter(l => l.status === 'BORROWED' || l.status === 'OVERDUE')
                                        .map(loan => (
                                            <div key={loan.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors bg-white dark:bg-slate-950">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-2 h-12 rounded-full ${loan.status === 'OVERDUE' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 dark:text-slate-100">{loan.book.title}</div>
                                                        <div className="text-sm text-slate-500">
                                                            <span className="font-medium text-slate-700 mr-2">
                                                                {loan.user ? loan.user.name : (loan.guestBorrowerName ? `${loan.guestBorrowerName} (Guest)` : 'Unknown')}
                                                            </span>
                                                            Due: <span className={loan.status === 'OVERDUE' ? 'text-red-600 font-medium' : ''}>{new Date(loan.dueDate).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline" onClick={() => handleReturnClick(loan)} className="hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200">
                                                    Return Book
                                                </Button>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <IssueBookModal
                open={isIssueModalOpen}
                onOpenChange={setIsIssueModalOpen}
                book={selectedBook}
                onSuccess={() => {
                    fetchUserLoans();
                    fetchAllActiveLoans();
                    loadBooks(); // Update stock
                    setSelectedBook(null); // Reset book selection
                }}
            />

            <ReturnBookModal
                open={!!returnRecord}
                onOpenChange={(open) => !open && setReturnRecord(null)}
                record={returnRecord}
                onSuccess={() => {
                    fetchUserLoans();
                    fetchAllActiveLoans();
                    loadBooks();
                    setReturnRecord(null);
                }}
            />
        </div>
    );
};

export default Loans;
