import type { User } from './User';
import type { Book } from './Book';

export const BorrowingStatus = {
    BORROWED: 'BORROWED',
    RETURNED: 'RETURNED',
    OVERDUE: 'OVERDUE'
} as const;

export type BorrowingStatus = (typeof BorrowingStatus)[keyof typeof BorrowingStatus];

export interface BorrowingRecord {
    id: number;
    user: User;
    userId?: number; // legacy or for request payload
    book: Book;
    borrowDate: string;
    dueDate: string;
    returnDate?: string;
    status: BorrowingStatus;
    lateFee?: number;
    guestBorrowerName?: string;
    returnCondition?: string;
    notes?: string;
}
