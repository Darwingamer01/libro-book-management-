package com.bookmanagement.repository;

import com.bookmanagement.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findTop5ByOrderByCreatedAtDesc();

    @Query("SELECT b.category as category, COUNT(b) as count FROM Book b GROUP BY b.category")
    List<Map<String, Object>> countByCategory(); // Note: Map projection might need interface or DTO in strict JPA, but
                                                 // Map<String,Object> often works with alias.
    // Better to use an interface projection if Map fails, but let's try strict DTO
    // later if needed.
    // Actually, for H2/Hibernate 6, List<Object[]> or interface is safer.
    // Let's use List<Object[]> and map it in service.

    @Query("SELECT b.category, COUNT(b) FROM Book b GROUP BY b.category")
    List<Object[]> countBooksByCategory();

    @Query("SELECT SUM(b.viewCount) FROM Book b")
    Long sumAllViewCounts();

    @Query("SELECT COUNT(b) FROM Book b WHERE b.createdAt >= CURRENT_DATE")
    Long countBooksCreatedToday();
}
