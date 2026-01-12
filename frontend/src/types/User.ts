export interface User {
    id: number;
    username: string;
    email: string;
    name: string;
    role?: 'USER' | 'ADMIN' | 'LIBRARIAN';
    createdAt?: string;
}
