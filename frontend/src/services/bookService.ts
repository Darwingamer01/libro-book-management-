import api from './api';
import type { Book } from '../types/Book';

export const getBooks = async () => {
    const response = await api.get<Book[]>('/books');
    return response.data;
};

export const getBookById = async (id: number) => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
};

export const createBook = async (book: Book) => {
    const response = await api.post<Book>('/books', book);
    return response.data;
};

export const updateBook = async (id: number, book: Book) => {
    const response = await api.put<Book>(`/books/${id}`, book);
    return response.data;
};

export const deleteBook = async (id: number) => {
    await api.delete(`/books/${id}`);
};
