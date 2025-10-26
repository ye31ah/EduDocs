import React from 'react';
import { Role } from '../types';
import type { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isLoggedIn: boolean;
  userRole?: Role;
  onLogout: () => void;
}

const NavLink: React.FC<{
  label: string;
  page: Page;
  currentPage: Page;
  onClick: (page: Page) => void;
}> = ({ label, page, currentPage, onClick }) => (
  <button
    onClick={() => onClick(page)}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      currentPage === page
        ? 'bg-slate-900 text-white'
        : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
);

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, isLoggedIn, userRole, onLogout }) => {
  return (
    <header className="bg-slate-50/80 sticky top-0 z-50 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div onClick={() => setCurrentPage('home')} className="cursor-pointer flex items-center space-x-2">
                <div className="bg-slate-900 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <span className="text-xl font-bold text-slate-800 hidden sm:inline">EduDocs</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2 bg-slate-200/50 p-1 rounded-full">
                <NavLink label="Главная" page="home" currentPage={currentPage} onClick={setCurrentPage} />
                {isLoggedIn && userRole === Role.Student && (
                   <NavLink label="Подать документ" page="submit" currentPage={currentPage} onClick={setCurrentPage} />
                )}
                 {isLoggedIn && userRole === Role.Teacher && (
                   <NavLink label="Админ панель" page="admin" currentPage={currentPage} onClick={setCurrentPage} />
                )}
                 {isLoggedIn && (
                   <NavLink label="ИИ-помощник" page="ai-assistant" currentPage={currentPage} onClick={setCurrentPage} />
                )}
                 <NavLink label="О проекте" page="about" currentPage={currentPage} onClick={setCurrentPage} />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-700 transition-colors duration-300">
                Выйти
              </button>
            ) : (
                <div className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-200 rounded-full">Пожалуйста, войдите</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;