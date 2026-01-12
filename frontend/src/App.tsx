import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import BookList from '@/components/books/BookList';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { LandingPage } from '@/pages/LandingPage';
import UserDashboard from '@/pages/UserDashboard';
import BookDetail from '@/pages/BookDetail';
import BookReader from '@/pages/BookReader';
import AdminDashboard from '@/pages/AdminDashboard';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import Features from '@/pages/Features';
import FAQ from '@/pages/FAQ';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import LearnMore from '@/pages/LearnMore';
import MyBooks from '@/pages/MyBooks';
import LibrarianDashboard from '@/pages/librarian/Dashboard';
import Inventory from '@/pages/librarian/Inventory';
import Loans from '@/pages/librarian/Loans';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

import ScrollToTop from '@/components/utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/features" element={<Features />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/my-books" element={<MyBooks />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/read/:id" element={<BookReader />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/books" element={<BookList />} />
            </Route>

            {/* Protected Librarian Routes */}
            <Route element={<ProtectedRoute allowedRoles={['LIBRARIAN', 'ADMIN']} />}>
              <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
              <Route path="/librarian/inventory" element={<Inventory />} />
              <Route path="/librarian/loans" element={<Loans />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
