import api from './api';
import type { User } from '../context/AuthContext';

export interface DashboardStats {
    totalBooks: number;
    totalUsers: number;
    booksAddedToday: number;
    totalViews: number;
    booksByCategory: Record<string, number>;
    recentBooks: any[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get('/admin/dashboard');
    return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
};
