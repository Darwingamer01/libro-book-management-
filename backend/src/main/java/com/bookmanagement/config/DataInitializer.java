package com.bookmanagement.config;

import com.bookmanagement.entity.Book;
import com.bookmanagement.entity.Role;
import com.bookmanagement.entity.User;
import com.bookmanagement.repository.BookRepository;
import com.bookmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed Users
        if (userRepository.count() == 0) {
            // Admin
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@library.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Admin User");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);

            // User
            User user = new User();
            user.setUsername("john");
            user.setEmail("john@example.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setFullName("John Doe");
            user.setRole(Role.USER);
            userRepository.save(user);
        }

        // Seed Books
        if (bookRepository.count() == 0) {
            createBook("The Alchemist", "Paulo Coelho", "A magical tale about following your dreams.", "Fiction",
                    "978-0062315007", 1988, "HarperOne", 208, "English", true, 120);

            createBook("Clean Code", "Robert C. Martin", "A Handbook of Agile Software Craftsmanship.", "Technology",
                    "978-0132350884", 2008, "Prentice Hall", 464, "English", true, 85);

            createBook("Sapiens: A Brief History of Humankind", "Yuval Noah Harari",
                    "Explore the history of our species.", "History",
                    "978-0062316097", 2011, "Harper", 443, "English", true, 250);

            createBook("1984", "George Orwell", "A dystopian social science fiction novel.", "Fiction",
                    "978-0451524935", 1949, "Signet Classic", 328, "English", true, 300);

            createBook("The Pragmatic Programmer", "Andrew Hunt", "Your journey to mastery.", "Technology",
                    "978-0201616224", 1999, "Addison-Wesley", 352, "English", true, 95);

            createBook("Cosmos", "Carl Sagan", "The story of cosmic evolution.", "Science",
                    "978-0345331309", 1980, "Ballantine Books", 365, "English", true, 150);
        }
    }

    private void createBook(String title, String author, String description, String category,
            String isbn, Integer year, String publisher, Integer pages, String language, Boolean available,
            Integer views) {
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setDescription(description);
        book.setCategory(category);
        book.setIsbn(isbn);
        book.setPublicationYear(year);
        book.setPublisher(publisher);
        book.setPageCount(pages);
        book.setLanguage(language);
        book.setIsAvailable(available);
        book.setViewCount(views);
        // Cover image placeholder (using diverse colors/texts if we had a real service,
        // but generic for now)
        book.setCoverImageUrl("https://placehold.co/400x600?text=" + title.replace(" ", "+"));
        // Sample content
        book.setContent("This is the sample reading content for " + title + ". \n\nLorem ipsum dolor sit amet...");

        bookRepository.save(book);
    }
}
