import React, { useState, useEffect } from 'react';
import { Search, User as UserIcon, BookOpen, Clock } from 'lucide-react';
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
        <motion.div
            className="container mx-auto py-8 px-4 mt-16 max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                        Circulation & Loans
                    </h1>
                    <p className="text-slate-500 mt-2">Issue books and process returns.</p>
                </div>
                <Button variant="outline" onClick={clearSelection} className="hover:bg-slate-100 dark:hover:bg-slate-800">
                    Reset Selection
                </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Member Selection Panel */}
                <motion.div variants={itemVariants} className="lg:col-span-4 space-y-4">
                    <Card className="border-none shadow-lg bg-white dark:bg-slate-900 h-full overflow-hidden">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <UserIcon className="w-5 h-5 text-emerald-600" />
                                Find Member
                            </CardTitle>
                            <CardDescription>Search to view active loans</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search member name..."
                                    className="pl-9 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    value={userQuery}
                                    onChange={(e) => setUserQuery(e.target.value)}
                                />
                            </div>

                            {/* User List */}
                            {userQuery.length > 0 && !selectedUser && (
                                <div className="border border-slate-200 dark:border-slate-800 rounded-md divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto shadow-sm">
                                    {foundUsers.map(user => (
                                        <div
                                            key={user.id}
                                            className="p-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 cursor-pointer flex justify-between transition-colors"
                                            onClick={() => { setSelectedUser(user); setUserQuery(""); }}
                                        >
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{user.name}</span>
                                            <span className="text-xs text-slate-400">{user.email}</span>
                                        </div>
                                    ))}
                                    {foundUsers.length === 0 && !searchingUsers && (
                                        <div className="p-3 text-sm text-slate-500 text-center">No users found</div>
                                    )}
                                </div>
                            )}

                            {selectedUser && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-lg flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full">
                                            <UserIcon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-emerald-900 dark:text-emerald-100">{selectedUser.name}</div>
                                            <div className="text-xs text-emerald-600 dark:text-emerald-400">@{selectedUser.username}</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)} className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100">
                                        Change
                                    </Button>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Circulation Operations Panel */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Issue Book Section */}
                    <motion.div variants={itemVariants}>
                        <Card className="border-none shadow-lg bg-white dark:bg-slate-900">
                            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <BookOpen className="w-5 h-5 text-emerald-600" />
                                    Issue Book
                                </CardTitle>
                                <CardDescription>Search for a book to issue to a member.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 p-6">
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            placeholder="Search book title or ISBN..."
                                            className="pl-9 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                            value={bookQuery}
                                            onChange={(e) => setBookQuery(e.target.value)}
                                        />

                                        {/* Book Results */}
                                        {bookQuery.length > 1 && !selectedBook && (
                                            <div className="border border-slate-200 dark:border-slate-800 rounded-lg divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto shadow-xl absolute top-full left-0 right-0 z-[100] bg-white dark:bg-slate-950 mt-2">
                                                {foundBooks.length > 0 ? (
                                                    foundBooks.map(book => (
                                                        <div
                                                            key={book.id}
                                                            className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer flex justify-between items-center transition-colors ${book.availableCopies! <= 0 ? 'opacity-50 pointer-events-none' : ''}`}
                                                            onClick={() => { setSelectedBook(book); setBookQuery(""); }}
                                                        >
                                                            <div className="font-medium text-slate-800 dark:text-slate-200">{book.title}</div>
                                                            <div className="text-xs">
                                                                {book.availableCopies! > 0 ?
                                                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">{book.availableCopies} Avail</span> :
                                                                    <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full font-medium">Out of Stock</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-sm text-slate-500 text-center italic">No books found matching this title</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectedBook && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50"
                                    >
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-slate-100">{selectedBook.title}</h4>
                                            <p className="text-sm text-slate-500">{selectedBook.author}</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="text-[10px] tracking-wide uppercase font-semibold bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400">ISBN: {selectedBook.isbn}</span>
                                                <span className="text-[10px] tracking-wide uppercase font-semibold bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400">Loc: {selectedBook.shelfLocation || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div className="flex bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                                            <Button variant="ghost" onClick={() => setSelectedBook(null)} className="rounded-none border-r border-slate-200 dark:border-slate-700 px-4">Change</Button>
                                            <Button onClick={handleIssueClick} className="rounded-none bg-emerald-600 hover:bg-emerald-700 text-white px-6">Issue This Book</Button>
                                        </div>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Active Loans Section */}
                    <motion.div variants={itemVariants}>
                        <Card className="border-none shadow-lg bg-white dark:bg-slate-900 overflow-hidden">
                            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-emerald-600" />
                                    {selectedUser ? `Active Loans for ${selectedUser.name}` : 'All Active Loans'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {(selectedUser ? userLoans : allActiveLoans).length === 0 ? (
                                    <div className="text-center py-12 text-slate-400">
                                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No active loans found.</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {(selectedUser ? userLoans : allActiveLoans)
                                            .filter(l => l.status === 'BORROWED' || l.status === 'OVERDUE')
                                            .map(loan => (
                                                <div key={loan.id} className="flex justify-between items-center p-6 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-1.5 h-12 rounded-full ${loan.status === 'OVERDUE' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'}`}></div>
                                                        <div>
                                                            <div className="font-bold text-slate-900 dark:text-slate-100 text-lg group-hover:text-emerald-700 transition-colors">{loan.book.title}</div>
                                                            <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                                                                <span className="font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
                                                                    {loan.user ? loan.user.name : (loan.guestBorrowerName ? `${loan.guestBorrowerName} (Guest)` : 'Unknown')}
                                                                </span>
                                                                <span className="text-slate-300">•</span>
                                                                <span>Due: <span className={loan.status === 'OVERDUE' ? 'text-red-600 font-semibold' : 'text-slate-600 font-medium'}>{new Date(loan.dueDate).toLocaleDateString()}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button size="sm" variant="outline" onClick={() => handleReturnClick(loan)} className="border-slate-200 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm">
                                                        Return
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
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
        </motion.div>
    );
};

export default Loans;
