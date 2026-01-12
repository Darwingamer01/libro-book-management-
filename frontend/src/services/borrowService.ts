import api from './api';
import type { BorrowingRecord } from '@/types/BorrowingRecord';

export const borrowBook = async (bookId: number, userId: number): Promise<BorrowingRecord> => {
    const response = await api.post<BorrowingRecord>(`/borrow/${bookId}`, null, {
        params: { userId }
    });
    return response.data;
};

export const returnBook = async (recordId: number): Promise<BorrowingRecord> => {
    const response = await api.post<BorrowingRecord>(`/borrow/return/${recordId}`);
    return response.data;
};

export const getUserHistory = async (userId: number): Promise<BorrowingRecord[]> => {
    const response = await api.get<BorrowingRecord[]>(`/borrow/history/${userId}`);
    return response.data;
};
