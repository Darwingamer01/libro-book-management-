package com.bookmanagement.dto;

import com.bookmanagement.entity.Book;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardStats {
    private Long totalBooks;
    private Long totalUsers;
    private Long booksAddedToday;
    private Long totalViews;
    private Map<String, Long> booksByCategory;
    private List<Book> recentBooks;
}
