package com.bookmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is required")
    @Column(nullable = false)
    private String author;

    @Column(length = 2000)
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    private String isbn;

    @Min(value = 1000, message = "Invalid publication year")
    private Integer publicationYear;

    private String publisher;

    private String coverImageUrl;

    @Column(length = 50000)
    private String content; // Content or URL/Path to content

    @Min(value = 1, message = "Page count must be positive")
    private Integer pageCount;

    private String language;

    @Column(nullable = false)
    private Boolean isAvailable = true;

    private Integer viewCount = 0;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
