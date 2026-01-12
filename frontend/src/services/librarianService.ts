import api from './api';
import type { BorrowingRecord } from '@/types/BorrowingRecord';
import type { User } from '@/types/User';


export const searchUsers = async (query: string): Promise<User[]> => {
    const response = await api.get<User[]>('/librarian/users/search', {
        params: { query }
    });
    return response.data;
};

export const getUserLoans = async (userId: number): Promise<BorrowingRecord[]> => {
    const response = await api.get<BorrowingRecord[]>(`/librarian/users/${userId}/loans`);
    return response.data;
};

export const getAllActiveLoans = async (): Promise<BorrowingRecord[]> => {
    const response = await api.get<BorrowingRecord[]>('/librarian/loans/active');
    return response.data;
};

export const getStats = async () => {
    const response = await api.get('/librarian/stats');
    return response.data;
};

export const issueBookToUser = async (data: any): Promise<BorrowingRecord> => {
    const response = await api.post<BorrowingRecord>('/librarian/issue', data);
    return response.data;
};

export const processReturn = async (recordId: number, data: any): Promise<BorrowingRecord> => {
    const response = await api.post<BorrowingRecord>(`/librarian/return/${recordId}`, data);
    return response.data;
};

export const createBook = async (data: any) => {
    const response = await api.post('/librarian/books', data);
    return response.data;
};

export const updateBook = async (id: number, data: any) => {
    const response = await api.put(`/librarian/books/${id}`, data);
    return response.data;
};

export const deleteBook = async (id: number) => {
    const response = await api.delete(`/librarian/books/${id}`);
    return response.data;
};
