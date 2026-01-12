package com.bookmanagement.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BorrowRequest {
    private Long userId; // Optional if guest
    private String guestName; // Optional if user is registered
    private Long bookId;
    private LocalDate dueDate; // Optional, defaults to standard period
    private String guestEmail;
    private String guestPhone;
}
