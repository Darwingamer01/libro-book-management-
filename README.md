# OOPJ ESE Lab Book Management CRUD App

A full-stack Book Management application built with Spring Boot and React.

## Technology Stack
- **Backend**: Java 17, Spring Boot 3, Spring Data JPA, H2 Database
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Tools**: Maven, NPM, Git

## Features
- Create, Read, Update, Delete Books
- Search and Filter (Grid View)
- Responsive Design
- Form Validation with Error Handling

## Setup Instructions

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The server will start on `http://localhost:8080`.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

## Student Details
- **Name**: [Your Name]
- **Roll Number**: [Your Roll Number]
- **Email**: utkarsh11980@gmail.com

## API Endpoints
- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book
- `GET /api/books/{id}` - Get book by ID
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book
