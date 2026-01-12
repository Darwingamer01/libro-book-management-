import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { processReturn } from '@/services/librarianService';
import { toast } from 'sonner';
import type { BorrowingRecord } from '@/types/BorrowingRecord';

interface ReturnBookModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    record: BorrowingRecord | null;
    onSuccess: () => void;
}

const ReturnBookModal: React.FC<ReturnBookModalProps> = ({ open, onOpenChange, record, onSuccess }) => {
    const [condition, setCondition] = useState('Good');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReturn = async () => {
        if (!record) return;
        setLoading(true);
        try {
            await processReturn(record.id, {
                condition,
                notes
            });
            toast.success("Book returned successfully");
            onOpenChange(false);
            onSuccess();
            setNotes('');
            setCondition('Good');
        } catch (error) {
            toast.error("Failed to return book");
        } finally {
            setLoading(false);
        }
    };

    if (!record) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Return Book</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="p-3 bg-slate-50 rounded mb-4">
                        <div className="font-medium">{record.book.title}</div>
                        <div className="text-sm text-slate-500">
                            Borrowed by: {record.user ? record.user.name : record.guestBorrowerName}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <select
                            id="condition"
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                        >
                            <option value="Good">Good</option>
                            <option value="Damaged">Damaged</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Any damage details or late fee remarks..."
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button onClick={handleReturn} disabled={loading}>{loading ? 'Processing...' : 'Confirm Return'}</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReturnBookModal;
