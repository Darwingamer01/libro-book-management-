package com.bookmanagement.service;

import com.bookmanagement.entity.Book;
import java.util.List;

public interface BookService {
    Book createBook(Book book);

    List<Book> getAllBooks();

    Book getBookById(Long id);

    Book updateBook(Long id, Book bookDetails);

    void deleteBook(Long id);
}
