import React from 'react';
import { Header } from './Header';
import { Toaster } from 'sonner';
import { useLocation } from 'react-router-dom';
import { AdminHeader } from './AdminHeader';
import { UserHeader } from './UserHeader';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const { user } = useAuth();
    const isFullWidthPage = ['/', '/login', '/register', '/privacy', '/terms'].includes(location.pathname);
    const shouldHideHeader = ['/login', '/register'].includes(location.pathname);
    const isAdminPage = location.pathname.startsWith('/admin');
    const isLandingPage = location.pathname === '/';

    let headerContent;
    if (shouldHideHeader) {
        headerContent = null;
    } else if (isAdminPage) {
        headerContent = <AdminHeader />;
    } else if (user && !isLandingPage) {
        headerContent = <UserHeader />;
    } else {
        headerContent = <Header />; // Public/Landing Header
    }

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            {headerContent}
            <main className={isFullWidthPage ? "" : "container py-6"}>
                {children}
            </main>
            <Toaster />
        </div>
    );
};

export default Layout;
