package com.bookmanagement.service;

import com.bookmanagement.dto.BorrowRequest;
import com.bookmanagement.dto.ReturnRequest;
import com.bookmanagement.entity.BorrowingRecord;
import java.util.List;

public interface BorrowingService {
    BorrowingRecord borrowBook(BorrowRequest request);

    BorrowingRecord returnBook(Long borrowingRecordId, ReturnRequest request);

    List<BorrowingRecord> getUserBorrowingHistory(Long userId);

    List<BorrowingRecord> getOverdueBooks();

    List<BorrowingRecord> getAllActiveLoans();
}
