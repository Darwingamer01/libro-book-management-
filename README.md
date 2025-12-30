# 📚 Libro - Personal Library Reimagined

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> **Libro** is a modern, full-stack book management system designed to transform how you track and discover books. It features a stunning 3D landing page, secure authentication, role-based dashboards, and a distraction-free reading environment.

---

## 🚀 Features

### 🎨 **Immersive User Experience**
-   **3D Landing Page**: A fully interactive 3D book model built with **Three.js** and **React Three Fiber**. It features realistic physics, dynamic shadows, and particle effects.
-   **Premium UI/UX**: Designed with **Tailwind CSS** and **Framer Motion** for smooth transitions, glassmorphism effects, and a clean, professional aesthetic.
-   **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

### 🔐 **Secure & Robust Backend**
-   **Authentication**: Secure user registration and login using **JWT (JSON Web Tokens)**.
-   **Role-Based Access**: Distinct dashboards for **Users** (personal library) and **Admins** (system management).
-   **In-Memory Database**: Powered by **H2 Database** for fast, zero-configuration setup during development.

### 📊 **Smart Dashboards**
-   **User Dashboard**: Track recently read books, view reading statistics (pages read, streaks), and get recommendations.
-   **Admin Dashboard**: comprehensive CRUD (Create, Read, Update, Delete) operations for managing the global book collection.

---

## 🛠️ Tech Stack

### **Frontend**
-   **Framework**: [React](https://reactjs.org/) (v18) + [Vite](https://vitejs.dev/)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmndrs/drei)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **State Management**: React Context API

### **Backend**
-   **Framework**: [Spring Boot](https://spring.io/projects/spring-boot) (v3.x)
-   **Language**: Java (JDK 17+)
-   **Database**: H2 (In-Memory SQL)
-   **Security**: Spring Security + JWT
-   **Build Tool**: Maven

---

## 📂 Project Structure

### **Frontend (`/frontend`)**
```
frontend/
├── src/
│   ├── components/
│   │   ├── 3d/           # Three.js scenes (Scene3D.tsx, FloatingBook.tsx)
│   │   ├── auth/         # Login/Register forms & ProtectedRoute
│   │   ├── books/        # Book display components
│   │   ├── layout/       # Headers, Footers, Main Layout
│   │   └── ui/           # Reusable UI components (Buttons, Cards, Inputs)
│   ├── context/          # AuthContext for global user state
│   ├── pages/            # Main page views (Landing, Dashboard, Login)
│   ├── services/         # API integration (Axios)
│   └── App.tsx           # Main application routing
└── package.json          # Dependencies and scripts
```

### **Backend (`/backend`)**
```
backend/
├── src/main/java/com/bookmanagement/
│   ├── config/           # App & Security configurations
│   ├── controller/       # REST API Endpoints (AuthController, BookController)
│   ├── entity/           # JPA Entities (User, Book, Role)
│   ├── repository/       # Data Access Layer (JPA Repositories)
│   ├── security/         # JWT Filters & Utilities
│   └── service/          # Business Logic Layer
└── pom.xml               # Maven dependencies
```

---

## ⚡ Getting Started

Follow these steps to set up the project locally.

### **Prerequisites**
-   **Node.js** (v18 or higher)
-   **Java JDK** (17 or higher)
-   **Maven** (Apache Maven)
-   **Git**

### **1. Clone the Repository**
```bash
git clone https://github.com/Darwingamer01/libro-book-management-.git
cd libro-book-management-
```

### **2. Setup Backend**
The backend runs on port `8080`.
```bash
cd backend
# Run with key
mvn spring-boot:run
```
*The database will initialize with sample data automatically.*

### **3. Setup Frontend**
The frontend runs on port `5173`.
Open a new terminal window:
```bash
cd frontend
# Install dependencies
npm install
# Start development server
npm run dev
```

### **4. Access the App**
Open your browser and navigate to:
**`http://localhost:5173`**

---

## 🔑 Default Credentials

The system initializes with these default accounts for testing:

| Role | Username | Password |
|------|----------|----------|
| **Admin** | `admin` | `admin123` |
| **User** | `user` | `user123` |

---

## 🧪 API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login & get JWT | Public |
| `GET` | `/api/books` | Get all books | User/Admin |
| `GET` | `/api/books/{id}` | Get book details | User/Admin |
| `POST` | `/api/books` | Add a new book | Admin |
| `PUT` | `/api/books/{id}` | Update a book | Admin |
| `DELETE` | `/api/books/{id}` | Delete a book | Admin |

---

## 🐞 Troubleshooting

**1. "Connection Refused" on Frontend**
-   Ensure the Backend is running on port `8080`.
-   Check `frontend/src/services/api.ts` to confirm the `API_URL` matches your backend.

**2. 3D Book Not Showing**
-   Ensure hardware acceleration is enabled in your browser.
-   Check console for Three.js errors.

**3. Database Resetting**
-   The H2 database is **in-memory**, meaning data is lost when the backend stops. To persist data, configure a file-based H2 path or use MySQL/PostgreSQL in `application.properties`.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
