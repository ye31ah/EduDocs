import React from 'react';

const BentoCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-white p-6 sm:p-8 border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 ${className}`}>
        {children}
    </div>
);

const HomePage: React.FC = () => {
    const teamMembers = [
        { name: 'Айгерим Султанова', role: 'Основатель и CEO', imgSrc: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&h=200&fit=crop&q=80' },
        { name: 'Тимур Ахметов', role: 'Технический директор (CTO)', imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80' },
        { name: 'Динара Исаева', role: 'Ведущий UX/UI дизайнер', imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80' },
        { name: 'Арман Жумабаев', role: 'Руководитель продукта', imgSrc: 'https://images.unsplash.com/photo-1522529599102-4b32b7c6b998?w=200&h=200&fit=crop&q=80' },
    ];
    
  return (
    <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Hero */}
            <BentoCard className="lg:col-span-3 text-center flex flex-col items-center justify-center bg-slate-900 text-white min-h-[300px]">
                <h1 className="text-4xl md:text-5xl font-extrabold">
                    EduDocs: <span className="bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">Будущее документооборота</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
                    Цифровизация академических процессов для нового поколения образования.
                </p>
            </BentoCard>

            {/* 2. Mission */}
            <BentoCard className="lg:col-span-1 bg-sky-500 text-white">
                <h2 className="text-2xl font-bold mb-3">Наша миссия</h2>
                <p className="opacity-90">
                    Сделать образование свободным от бумажной волокиты, предоставив мощные и простые цифровые инструменты для всех участников учебного процесса.
                </p>
            </BentoCard>

            {/* 3. About */}
            <BentoCard className="lg:col-span-2">
                 <h2 className="text-2xl font-bold text-slate-800 mb-3">О компании</h2>
                <p className="text-slate-600">
                    EduDocs была основана командой энтузиастов с одной целью: революционизировать устаревшие процессы в учебных заведениях. Мы создаем платформу, которая делает документооборот простым, прозрачным и полностью цифровым, позволяя сосредоточиться на самом важном — обучении и исследованиях.
                </p>
            </BentoCard>
            
            {/* 4. Values */}
            <BentoCard className="lg:col-span-3">
                 <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Наши ценности</h2>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <h3 className="font-semibold text-slate-800">Инновации</h3>
                    </div>
                     <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M12 10.5h.01M12 13.5h.01M12 16.5h.01M5 12a7 7 0 1114 0 7 7 0 01-14 0z" /></svg>
                        </div>
                        <h3 className="font-semibold text-slate-800">Простота</h3>
                    </div>
                     <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l4.318-3.047a12.016 12.016 0 004.225 1.03A11.955 11.955 0 0112 18.944a11.955 11.955 0 018.618-3.04A12.02 12.02 0 0021 4.583l-4.318 3.047a12.016 12.016 0 00-4.225-1.03z" /></svg>
                        </div>
                        <h3 className="font-semibold text-slate-800">Безопасность</h3>
                    </div>
                     <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <h3 className="font-semibold text-slate-800">Партнерство</h3>
                    </div>
                 </div>
            </BentoCard>

            {/* 5. Team */}
            <BentoCard className="lg:col-span-2">
                 <h2 className="text-2xl font-bold text-slate-800 mb-6">Наша команда</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {teamMembers.map(member => (
                        <div key={member.name} className="text-center">
                            <img className="w-20 h-20 rounded-full mx-auto mb-2 bg-slate-300 object-cover" src={member.imgSrc} alt={member.name} />
                            <h4 className="text-sm font-semibold text-slate-800">{member.name}</h4>
                            <p className="text-xs text-sky-600">{member.role}</p>
                        </div>
                    ))}
                 </div>
            </BentoCard>
            
            {/* 6. How we help */}
            <BentoCard className="lg:col-span-1">
                 <h2 className="text-2xl font-bold text-slate-800 mb-3">Как мы помогаем</h2>
                 <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start"><span className="text-sky-500 mr-2 mt-1">&#10003;</span> Сокращаем бюрократию</li>
                    <li className="flex items-start"><span className="text-sky-500 mr-2 mt-1">&#10003;</span> Экономим время</li>
                    <li className="flex items-start"><span className="text-sky-500 mr-2 mt-1">&#10003;</span> Повышаем прозрачность</li>
                 </ul>
            </BentoCard>

            {/* 7. Pricing */}
            <BentoCard className="lg:col-span-3">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Начните использовать EduDocs сегодня</h2>
                    <p className="mt-2 text-slate-600">Выберите план, который подходит вашему учебному заведению.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        { plan: 'Базовый', price: '15 000 ₸', features: ['До 100 студентов', 'Основной документооборот', 'ИИ-помощник', 'Техподдержка по email'], isFeatured: false },
                        { plan: 'Стандарт', price: '45 000 ₸', features: ['До 500 студентов', 'Все из Базового', 'Расширенная аналитика', 'Интеграция с LMS', 'Приоритетная поддержка'], isFeatured: true },
                        { plan: 'Премиум', price: '90 000 ₸', features: ['Безлимитные студенты', 'Все из Стандарта', 'Персональный менеджер', 'Обучение персонала'], isFeatured: false },
                    ].map(p => (
                        <div key={p.plan} className={`rounded-xl p-6 flex flex-col text-center ${p.isFeatured ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>
                            <h3 className="text-xl font-bold">{p.plan}</h3>
                            <p className="my-4 text-3xl font-extrabold">{p.price}<span className="text-base font-medium opacity-70">/мес</span></p>
                            <ul className="space-y-2 text-sm mb-6 flex-grow opacity-80">
                                {p.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                            <button className={`w-full py-2 px-4 rounded-full font-semibold transition-transform duration-200 ${p.isFeatured ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-700'}`}>
                                Выбрать
                            </button>
                        </div>
                    ))}
                </div>
            </BentoCard>
        </div>
    </div>
  );
};

export default HomePage;