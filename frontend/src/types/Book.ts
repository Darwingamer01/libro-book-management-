export const BookFormat = {
    EPUB: 'EPUB',
    PDF: 'PDF',
    HTML: 'HTML',
    PHYSICAL_ONLY: 'PHYSICAL_ONLY'
} as const;

export type BookFormat = (typeof BookFormat)[keyof typeof BookFormat];

export const BookSource = {
    PUBLIC_DOMAIN: 'PUBLIC_DOMAIN',
    AUTHOR_PUBLISHED: 'AUTHOR_PUBLISHED',
    PURCHASED: 'PURCHASED',
    LIBRARY_ASSET: 'LIBRARY_ASSET'
} as const;

export type BookSource = (typeof BookSource)[keyof typeof BookSource];

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

    // --- Hybrid Platform Fields ---
    isPhysical?: boolean;
    isDigital?: boolean;
    availableCopies?: number;
    totalCopies?: number;
    shelfLocation?: string;
    contentUrl?: string;
    format?: BookFormat;
    source?: BookSource;
    authorId?: number;

    createdAt?: string;
    updatedAt?: string;
}
