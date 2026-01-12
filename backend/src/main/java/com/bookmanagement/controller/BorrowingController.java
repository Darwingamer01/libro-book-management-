package com.bookmanagement.controller;

import com.bookmanagement.entity.BorrowingRecord;
import com.bookmanagement.service.BorrowingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
public class BorrowingController {

    private final BorrowingService borrowingService;

    public BorrowingController(BorrowingService borrowingService) {
        this.borrowingService = borrowingService;
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<BorrowingRecord> borrowBook(@PathVariable Long bookId, @RequestParam Long userId) {
        com.bookmanagement.dto.BorrowRequest request = new com.bookmanagement.dto.BorrowRequest();
        request.setBookId(bookId);
        request.setUserId(userId);
        // Default due date handled in service
        return ResponseEntity.ok(borrowingService.borrowBook(request));
    }

    @PostMapping("/return/{recordId}")
    public ResponseEntity<BorrowingRecord> returnBook(@PathVariable Long recordId) {
        com.bookmanagement.dto.ReturnRequest request = new com.bookmanagement.dto.ReturnRequest();
        request.setCondition("Good"); // Default condition
        return ResponseEntity.ok(borrowingService.returnBook(recordId, request));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<BorrowingRecord>> getUserHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(borrowingService.getUserBorrowingHistory(userId));
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<BorrowingRecord>> getOverdueBooks() {
        return ResponseEntity.ok(borrowingService.getOverdueBooks());
    }
}
