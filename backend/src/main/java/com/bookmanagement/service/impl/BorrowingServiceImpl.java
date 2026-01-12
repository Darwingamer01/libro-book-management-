package com.bookmanagement.service.impl;

import com.bookmanagement.entity.Book;
import com.bookmanagement.entity.BorrowingRecord;
import com.bookmanagement.entity.BorrowingStatus;
import com.bookmanagement.entity.User;
import com.bookmanagement.repository.BookRepository;
import com.bookmanagement.repository.BorrowingRecordRepository;
import com.bookmanagement.repository.UserRepository;
import com.bookmanagement.service.BorrowingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BorrowingServiceImpl implements BorrowingService {

    private final BorrowingRecordRepository borrowingRecordRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public BorrowingServiceImpl(BorrowingRecordRepository borrowingRecordRepository,
            BookRepository bookRepository,
            UserRepository userRepository) {
        this.borrowingRecordRepository = borrowingRecordRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public BorrowingRecord borrowBook(com.bookmanagement.dto.BorrowRequest request) {
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + request.getBookId()));

        // Verification logic
        if (!Boolean.TRUE.equals(book.getIsPhysical())) {
            throw new RuntimeException("This book is not a physical copy available for borrowing.");
        }

        if (book.getAvailableCopies() <= 0) {
            throw new RuntimeException("No copies available for borrowing.");
        }

        User user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));
        } else if (request.getGuestName() == null || request.getGuestName().trim().isEmpty()) {
            throw new RuntimeException("Either a registered User ID or a Guest Name is required.");
        }

        // Decrement available copies
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        // Create borrowing record
        BorrowingRecord record = new BorrowingRecord();
        record.setUser(user);
        record.setGuestBorrowerName(request.getGuestName()); // Set guest name
        record.setGuestEmail(request.getGuestEmail());
        record.setGuestPhone(request.getGuestPhone());
        record.setBook(book);
        record.setBorrowDate(LocalDateTime.now());

        // Custom Due Date or Default 14 days
        if (request.getDueDate() != null) {
            record.setDueDate(request.getDueDate().atStartOfDay());
        } else {
            record.setDueDate(LocalDateTime.now().plusDays(14));
        }

        record.setStatus(BorrowingStatus.BORROWED);

        return borrowingRecordRepository.save(record);
    }

    @Override
    @Transactional
    public BorrowingRecord returnBook(Long borrowingRecordId, com.bookmanagement.dto.ReturnRequest request) {
        BorrowingRecord record = borrowingRecordRepository.findById(borrowingRecordId)
                .orElseThrow(() -> new RuntimeException("Borrowing record not found"));

        if (record.getStatus() == BorrowingStatus.RETURNED) {
            throw new RuntimeException("Book is already returning.");
        }

        // Update record
        record.setReturnDate(LocalDateTime.now());
        record.setStatus(BorrowingStatus.RETURNED);
        record.setReturnCondition(request.getCondition());
        record.setNotes(request.getNotes());

        // Calculate fine (simple logic for now)
        if (record.getReturnDate().isAfter(record.getDueDate())) {
            record.setLateFee(5.0); // Flat fee for simplicty MVP
        } else {
            record.setLateFee(0.0);
        }

        // Increment available copies
        Book book = record.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        return borrowingRecordRepository.save(record);
    }

    @Override
    public List<BorrowingRecord> getUserBorrowingHistory(Long userId) {
        return borrowingRecordRepository.findByUserId(userId);
    }

    @Override
    public List<BorrowingRecord> getOverdueBooks() {
        return borrowingRecordRepository.findByStatus(BorrowingStatus.OVERDUE);
    }

    @Override
    public List<BorrowingRecord> getAllActiveLoans() {
        return borrowingRecordRepository.findByStatusIn(List.of(BorrowingStatus.BORROWED, BorrowingStatus.OVERDUE));
    }
}
