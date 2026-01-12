package com.bookmanagement.controller;

import com.bookmanagement.entity.BorrowingRecord;
import com.bookmanagement.entity.User;
import com.bookmanagement.repository.UserRepository;
import com.bookmanagement.service.BorrowingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/librarian")
public class LibrarianController {

    private final UserRepository userRepository;
    private final BorrowingService borrowingService;
    private final com.bookmanagement.service.BookService bookService;
    private final com.bookmanagement.repository.BookRepository bookRepository;
    private final com.bookmanagement.repository.BorrowingRecordRepository borrowingRecordRepository;

    public LibrarianController(UserRepository userRepository,
            BorrowingService borrowingService,
            com.bookmanagement.service.BookService bookService,
            com.bookmanagement.repository.BookRepository bookRepository,
            com.bookmanagement.repository.BorrowingRecordRepository borrowingRecordRepository) {
        this.userRepository = userRepository;
        this.borrowingService = borrowingService;
        this.bookService = bookService;
        this.bookRepository = bookRepository;
        this.borrowingRecordRepository = borrowingRecordRepository;
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String query) {
        return ResponseEntity.ok(userRepository.findByFullNameContainingIgnoreCase(query));
    }

    @GetMapping("/users/{userId}/loans")
    public ResponseEntity<List<BorrowingRecord>> getUserLoans(@PathVariable Long userId) {
        return ResponseEntity.ok(borrowingService.getUserBorrowingHistory(userId));
    }

    @GetMapping("/loans/active")
    public ResponseEntity<List<BorrowingRecord>> getAllActiveLoans() {
        return ResponseEntity.ok(borrowingService.getAllActiveLoans());
    }

    @PostMapping("/issue")
    public ResponseEntity<BorrowingRecord> issueBook(@RequestBody com.bookmanagement.dto.BorrowRequest request) {
        return ResponseEntity.ok(borrowingService.borrowBook(request));
    }

    @PostMapping("/return/{recordId}")
    public ResponseEntity<BorrowingRecord> returnBook(@PathVariable Long recordId,
            @RequestBody com.bookmanagement.dto.ReturnRequest request) {
        return ResponseEntity.ok(borrowingService.returnBook(recordId, request));
    }

    // --- Inventory Management ---

    @PostMapping("/books")
    public ResponseEntity<?> createBook(@RequestBody com.bookmanagement.dto.BookPayload payload) {
        com.bookmanagement.entity.Book book = new com.bookmanagement.entity.Book();
        mapPayloadToBook(book, payload);
        return ResponseEntity.ok(bookService.createBook(book));
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id,
            @RequestBody com.bookmanagement.dto.BookPayload payload) {
        com.bookmanagement.entity.Book book = bookService.getBookById(id); // Validate exists
        com.bookmanagement.entity.Book details = new com.bookmanagement.entity.Book();
        mapPayloadToBook(details, payload);
        return ResponseEntity.ok(bookService.updateBook(id, details));
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }

    // --- Dashboard Stats ---

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        long totalBooks = bookRepository.count();
        long activeLoans = borrowingRecordRepository.findByStatus(com.bookmanagement.entity.BorrowingStatus.BORROWED)
                .size();
        long overdueBooks = borrowingRecordRepository.findByStatus(com.bookmanagement.entity.BorrowingStatus.OVERDUE)
                .size();

        // This is inefficient for large datasets but fine for MVP
        double totalFines = borrowingRecordRepository.findAll().stream()
                .filter(r -> r.getLateFee() != null)
                .mapToDouble(com.bookmanagement.entity.BorrowingRecord::getLateFee)
                .sum();

        return ResponseEntity.ok(new DashboardStats(totalBooks, activeLoans, overdueBooks, totalFines));
    }

    private void mapPayloadToBook(com.bookmanagement.entity.Book book, com.bookmanagement.dto.BookPayload payload) {
        book.setTitle(payload.getTitle());
        book.setAuthor(payload.getAuthor());
        book.setCategory(payload.getCategory());
        book.setIsbn(payload.getIsbn());
        book.setPublicationYear(payload.getPublicationYear());
        book.setPublisher(payload.getPublisher());
        book.setPageCount(payload.getPageCount());
        book.setLanguage(payload.getLanguage());
        book.setDescription(payload.getDescription());
        book.setCoverImageUrl(payload.getCoverImageUrl());
        book.setTotalCopies(payload.getTotalCopies());
        book.setAvailableCopies(payload.getAvailableCopies());
        book.setShelfLocation(payload.getShelfLocation());
        book.setIsPhysical(true); // Default for librarian created
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    static class DashboardStats {
        private long totalBooks;
        private long activeLoans;
        private long overdueBooks;
        private double totalFines;
    }
}
