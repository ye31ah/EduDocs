import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherAdminPanel from './pages/TeacherAdminPanel';
import AiAssistantPage from './pages/AiAssistantPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import { useAppContext } from './hooks/useAppContext';
import type { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (!user) {
      return <LoginPage onLogin={() => setCurrentPage('home')} />;
    }
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'submit':
        return <StudentDashboard />;
      case 'admin':
        return <TeacherAdminPanel />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isLoggedIn={!!user} 
        userRole={user?.role}
        onLogout={handleLogout} 
      />
      <main className="p-4 sm:p-6 md:p-8 lg:p-10">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;