import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { issueBookToUser, searchUsers } from '@/services/librarianService';
import { toast } from 'sonner';
import type { User } from '@/types/User';
import type { Book } from '@/types/Book';
import { Search, User as UserIcon } from 'lucide-react';
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
                dueDate: dueDate ? new Date(dueDate) : null
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
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Issue Book</DialogTitle>
                </DialogHeader>

                <div className="py-2">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded mb-4">
                        <div className="font-medium text-slate-900">{book.title}</div>
                        <div className="text-sm text-slate-500">by {book.author}</div>
                        <div className="text-xs mt-1 text-emerald-600 font-medium">{book.availableCopies} copies available</div>
                    </div>

                    <form onSubmit={handleIssue} className="space-y-4">
                        {/* Mode Toggle */}
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button
                                type="button"
                                className={`flex-1 py-1.5 text-sm rounded-md font-medium transition-all ${!isGuestMode ? 'bg-white shadow text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setIsGuestMode(false)}
                            >
                                Registered Member
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-1.5 text-sm rounded-md font-medium transition-all ${isGuestMode ? 'bg-white shadow text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setIsGuestMode(true)}
                            >
                                Unregistered Guest
                            </button>
                        </div>

                        {!isGuestMode ? (
                            <div className="space-y-2">
                                <Label>Select Member</Label>
                                {!selectedUser ? (
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            placeholder="Search name or email..."
                                            className="pl-9"
                                            value={userQuery}
                                            onChange={(e) => setUserQuery(e.target.value)}
                                        />

                                        {/* User Dropdown */}
                                        {(userQuery.length > 0 || foundUsers.length > 0) && (
                                            <div className="mt-1 border rounded-md max-h-48 overflow-y-auto bg-white shadow-sm absolute w-full z-10">
                                                {foundUsers.map(user => (
                                                    <div
                                                        key={user.id}
                                                        className="p-2.5 hover:bg-slate-50 cursor-pointer text-sm flex justify-between items-center"
                                                        onClick={() => setSelectedUser(user)}
                                                    >
                                                        <span className="font-medium text-slate-700">{user.name}</span>
                                                        <span className="text-xs text-slate-400">{user.email}</span>
                                                    </div>
                                                ))}
                                                {foundUsers.length === 0 && !searching && (
                                                    <div className="p-3 text-xs text-slate-500 text-center">No members found</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-emerald-100 p-2 rounded-full">
                                                <UserIcon className="w-4 h-4 text-emerald-700" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-emerald-800">{selectedUser.name}</div>
                                                <div className="text-xs text-emerald-600">{selectedUser.email}</div>
                                            </div>
                                        </div>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedUser(null)} className="h-8 text-xs hover:text-emerald-700">Change</Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3 p-3 border border-slate-100 rounded-lg bg-slate-50/50">
                                <div className="space-y-1">
                                    <Label htmlFor="guestName" className="text-xs">Guest Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="guestName"
                                        value={guestDetails.name}
                                        onChange={e => setGuestDetails({ ...guestDetails, name: e.target.value })}
                                        placeholder="Full Name"
                                        className="h-9 bg-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label htmlFor="guestEmail" className="text-xs">Email</Label>
                                        <Input
                                            id="guestEmail"
                                            value={guestDetails.email}
                                            onChange={e => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                            placeholder="Email"
                                            className="h-9 bg-white"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="guestPhone" className="text-xs">Phone</Label>
                                        <Input
                                            id="guestPhone"
                                            value={guestDetails.phone}
                                            onChange={e => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                                            placeholder="Phone"
                                            className="h-9 bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 pt-2 border-t">
                            <Label htmlFor="dueDate">Due Date (Optional)</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                min={format(new Date(), 'yyyy-MM-dd')}
                            />
                            <div className="text-xs text-slate-400">Default is 14 days from today</div>
                        </div>

                        <DialogFooter className="mt-4">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button type="submit" disabled={loading} className="bg-slate-900 hover:bg-slate-800">
                                {loading ? 'Processing...' : 'Confirm Issue'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default IssueBookModal;
