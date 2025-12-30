package com.bookmanagement.service;

import com.bookmanagement.dto.DashboardStats;
import com.bookmanagement.repository.BookRepository;
import com.bookmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public DashboardStats getStats() {
        Long totalBooks = bookRepository.count();
        Long totalUsers = userRepository.count();
        Long booksAddedToday = bookRepository.countBooksCreatedToday(); // This might return null if no books
        Long totalViews = bookRepository.sumAllViewCounts();

        List<Object[]> categoryCounts = bookRepository.countBooksByCategory();
        Map<String, Long> booksByCategory = new HashMap<>();
        for (Object[] result : categoryCounts) {
            String category = (String) result[0];
            Long count = (Long) result[1];
            booksByCategory.put(category, count);
        }

        return DashboardStats.builder()
                .totalBooks(totalBooks)
                .totalUsers(totalUsers)
                .booksAddedToday(booksAddedToday != null ? booksAddedToday : 0)
                .totalViews(totalViews != null ? totalViews : 0)
                .booksByCategory(booksByCategory)
                .recentBooks(bookRepository.findTop5ByOrderByCreatedAtDesc())
                .build();
    }
}
