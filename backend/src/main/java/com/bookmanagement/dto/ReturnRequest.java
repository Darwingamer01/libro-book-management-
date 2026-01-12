package com.bookmanagement.dto;

import lombok.Data;

@Data
public class ReturnRequest {
    private String condition; // "Good", "Damaged", "Lost"
    private String notes; // Details about damage or late fee
}
