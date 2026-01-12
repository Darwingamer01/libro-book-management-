package com.bookmanagement.repository;

import com.bookmanagement.entity.BorrowingRecord;
import com.bookmanagement.entity.BorrowingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowingRecordRepository extends JpaRepository<BorrowingRecord, Long> {
    List<BorrowingRecord> findByUserId(Long userId);

    List<BorrowingRecord> findByBookId(Long bookId);

    List<BorrowingRecord> findByStatus(BorrowingStatus status);

    List<BorrowingRecord> findByUserIdAndStatus(Long userId, BorrowingStatus status);

    List<BorrowingRecord> findByStatusIn(List<BorrowingStatus> statuses);
}
