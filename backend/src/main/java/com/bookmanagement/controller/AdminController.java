package com.bookmanagement.controller;

import com.bookmanagement.dto.DashboardStats;
import com.bookmanagement.entity.User;
import com.bookmanagement.repository.UserRepository;
import com.bookmanagement.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
// @PreAuthorize("hasRole('ADMIN')") // We'll enforce this via SecurityConfig or
// annotation
public class AdminController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/users/{id}/enable")
    public ResponseEntity<User> toggleUserEnabled(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            user.setEnabled(!user.isEnabled());
            return ResponseEntity.ok(userRepository.save(user));
        }).orElse(ResponseEntity.notFound().build());
    }
}
