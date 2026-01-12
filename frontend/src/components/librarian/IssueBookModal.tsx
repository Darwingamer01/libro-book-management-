import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { issueBookToUser, searchUsers } from '@/services/librarianService';
import { toast } from 'sonner';
import type { User } from '@/types/User';
import type { Book } from '@/types/Book';
import { Search, User as UserIcon, Book as BookIcon, Calendar, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';

interface IssueBookModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book: Book | null;
    onSuccess: () => void;
}

const IssueBookModal: React.FC<IssueBookModalProps> = ({ open, onOpenChange, book, onSuccess }) => {
    // Mode State
    const [isGuestMode, setIsGuestMode] = useState(false);

    // Member State
    const [userQuery, setUserQuery] = useState("");
    const [foundUsers, setFoundUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searching, setSearching] = useState(false);

    // Guest State
    const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '' });

    // Common State
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);

    // Initial Load - Fetch all users
    useEffect(() => {
        if (open) {
            loadAllUsers();
        } else {
            // Reset state on close
            setIsGuestMode(false);
            setSelectedUser(null);
            setUserQuery("");
            setGuestDetails({ name: '', email: '', phone: '' });
            setDueDate('');
        }
    }, [open]);

    const loadAllUsers = async () => {
        try {
            const results = await searchUsers("");
            setFoundUsers(results);
        } catch (error) {
            console.error("Failed to load users", error);
        }
    };

    // User Search Effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setSearching(true);
            try {
                const results = await searchUsers(userQuery);
                setFoundUsers(results);
            } catch (error) {
                console.error(error);
            } finally {
                setSearching(false);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [userQuery]);


    const handleIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!book) return;

        setLoading(true);
        try {
            const payload: any = {
                bookId: book.id,
                dueDate: dueDate || null
            };

            if (isGuestMode) {
                if (!guestDetails.name.trim()) {
                    toast.error("Guest name is required");
                    setLoading(false);
                    return;
                }
                payload.guestName = guestDetails.name;
                payload.guestEmail = guestDetails.email;
                payload.guestPhone = guestDetails.phone;
            } else {
                if (!selectedUser) {
                    toast.error("Please select a registered member");
                    setLoading(false);
                    return;
                }
                payload.userId = selectedUser.id;
            }

            await issueBookToUser(payload);
            toast.success("Book issued successfully");
            onOpenChange(false);
            onSuccess();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to issue book");
        } finally {
            setLoading(false);
        }
    };

    if (!book) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <BookIcon className="w-5 h-5 text-emerald-600" />
                        Issue Book
                    </DialogTitle>
                </DialogHeader>

                <div className="py-2 space-y-5">
                    {/* Book Summary Card */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl flex gap-4 items-start">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                            <BookIcon className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-tight">{book.title}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">by {book.author}</div>
                            <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/30">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                {book.availableCopies} available
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleIssue} className="space-y-5">
                        {/* Mode Toggle */}
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                            <button
                                type="button"
                                className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${!isGuestMode ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                onClick={() => setIsGuestMode(false)}
                            >
                                Registered Member
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${isGuestMode ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                onClick={() => setIsGuestMode(true)}
                            >
                                Unregistered Guest
                            </button>
                        </div>

                        {!isGuestMode ? (
                            <div className="space-y-3">
                                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Select Member</Label>
                                {!selectedUser ? (
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            placeholder="Search by name or email..."
                                            className="pl-9 h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500"
                                            value={userQuery}
                                            onChange={(e) => setUserQuery(e.target.value)}
                                        />

                                        {/* User Dropdown - Relative Position to avoid clipping */}
                                        {(userQuery.length > 0 || foundUsers.length > 0) && (
                                            <div className="mt-2 border border-slate-100 dark:border-slate-800 rounded-xl max-h-52 overflow-y-auto bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black/5 z-20">
                                                {foundUsers.map(user => (
                                                    <div
                                                        key={user.id}
                                                        className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-3 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0"
                                                        onClick={() => setSelectedUser(user)}
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase">
                                                            {(user.name || user.username || '?').charAt(0)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-slate-700 dark:text-slate-200 text-sm">{user.name || user.username}</div>
                                                            <div className="text-xs text-slate-400">{user.email}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {foundUsers.length === 0 && !searching && (
                                                    <div className="p-4 text-sm text-slate-500 text-center italic">No members found</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                                                <UserIcon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-slate-100">{selectedUser.name || selectedUser.username}</div>
                                                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{selectedUser.email}</div>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedUser(null)}
                                            className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            Change
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="space-y-1.5">
                                    <Label htmlFor="guestName" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Guest Name <span className="text-red-500">*</span></Label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="guestName"
                                            value={guestDetails.name}
                                            onChange={e => setGuestDetails({ ...guestDetails, name: e.target.value })}
                                            placeholder="Full Name"
                                            className="pl-9 h-10 bg-white dark:bg-slate-900"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="guestEmail" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="guestEmail"
                                                value={guestDetails.email}
                                                onChange={e => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                                placeholder="Email"
                                                className="pl-9 h-10 bg-white dark:bg-slate-900"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="guestPhone" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="guestPhone"
                                                value={guestDetails.phone}
                                                onChange={e => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                                                placeholder="Phone"
                                                className="pl-9 h-10 bg-white dark:bg-slate-900"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 pt-2">
                            <Label htmlFor="dueDate" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Due Date (Optional)</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    id="dueDate"
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    min={format(new Date(), 'yyyy-MM-dd')}
                                    className="pl-9 h-10 bg-white dark:bg-slate-900"
                                />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-1">
                                <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                Default period is 14 days
                            </div>
                        </div>

                        <DialogFooter className="mt-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-10">Cancel</Button>
                            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white h-10 px-6 font-medium">
                                {loading ? 'Processing...' : 'Confirm and Issue'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default IssueBookModal;
