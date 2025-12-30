package com.bookmanagement.service;

import com.bookmanagement.dto.AuthRequest;
import com.bookmanagement.dto.AuthResponse;
import com.bookmanagement.dto.RegisterRequest;
import com.bookmanagement.entity.Role;
import com.bookmanagement.entity.User;
import com.bookmanagement.repository.UserRepository;
import com.bookmanagement.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtil jwtUtil;
        private final AuthenticationManager authenticationManager;

        public AuthResponse register(RegisterRequest request) {
                var user = new User();
                user.setFullName(request.getFullName());
                user.setUsername(request.getUsername());
                user.setEmail(request.getEmail());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setRole(Role.USER); // Default to USER role

                userRepository.save(user);

                Map<String, Object> extraClaims = new HashMap<>();
                extraClaims.put("role", user.getRole().name());

                var jwtToken = jwtUtil.generateToken(extraClaims, user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .username(user.getUsername())
                                .role(user.getRole().name())
                                .build();
        }

        public AuthResponse authenticate(AuthRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getUsername(),
                                                request.getPassword()));
                var user = userRepository.findByUsername(request.getUsername())
                                .orElseThrow();

                Map<String, Object> extraClaims = new HashMap<>();
                extraClaims.put("role", user.getRole().name());

                var jwtToken = jwtUtil.generateToken(extraClaims, user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .username(user.getUsername())
                                .role(user.getRole().name())
                                .build();
        }
}
