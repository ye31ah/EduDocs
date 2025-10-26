import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Role } from '../types';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { users, login, register, isLoading } = useAppContext();
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>(Role.Student);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (userId: string) => {
    login(userId);
    onLogin();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsRegistering(true);
    try {
        await register(name, role);
        onLogin();
    } catch (error) {
        console.error("Registration failed", error);
    } finally {
        setIsRegistering(false);
    }
  };

  if (isLoading && !users.length) {
    return (
        <div className="flex justify-center items-center h-64">
             <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-800">Добро пожаловать в EduDocs</h1>
            <p className="text-slate-500 mt-2">Войдите в свой профиль или создайте новый, чтобы начать работу.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Registration Form */}
            <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Регистрация</h2>
                    <p className="text-slate-500">Создайте свой профиль за минуту</p>
                </div>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Ваше имя</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Например, Иван Петров"
                            className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-slate-700">Ваша роль</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as Role)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 bg-slate-50 text-base border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-lg"
                        >
                            <option value={Role.Student}>Студент</option>
                            <option value={Role.Teacher}>Преподаватель</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400"
                    >
                        {isRegistering ? 'Регистрация...' : 'Зарегистрироваться и войти'}
                    </button>
                </form>
            </div>

            {/* Existing Users Login */}
            <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Вход</h2>
                    <p className="text-slate-500">Выберите свой профиль для входа</p>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 -mr-2">
                    {users.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => handleLogin(user.id)}
                        className="w-full flex items-center p-3 text-left bg-slate-50 hover:bg-sky-100 border border-slate-200 rounded-lg transition-colors duration-200 hover:border-sky-200"
                    >
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sky-500 text-white flex items-center justify-center text-lg font-bold">
                        {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                        <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.role}</div>
                        </div>
                    </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;