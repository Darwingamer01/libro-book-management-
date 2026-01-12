package com.bookmanagement.repository;

import com.bookmanagement.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByUserId(Long userId);

    Optional<Author> findByPenName(String penName);
}
