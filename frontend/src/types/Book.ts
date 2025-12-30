export interface Book {
    id: number;
    title: string;
    author: string;
    description?: string;
    category: string;
    isbn?: string;
    publicationYear?: number;
    publisher?: string;
    coverImageUrl?: string;
    content?: string;
    pageCount?: number;
    language?: string;
    isAvailable: boolean;
    viewCount: number;
    createdAt?: string;
    updatedAt?: string;
}
