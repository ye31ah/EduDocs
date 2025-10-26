import React from 'react';

const AboutCard: React.FC<{ title: string; children: React.ReactNode; className?: string}> = ({ title, children, className }) => (
    <div className={`bg-white p-6 border border-slate-200 rounded-2xl shadow-sm ${className}`}>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
        <div className="text-slate-600 space-y-4">
            {children}
        </div>
    </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl">
       <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-800">О проекте EduDocs</h1>
            <p className="text-slate-500 mt-2">
                Демонстрационное приложение для демонстрации возможностей современных веб-технологий.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
            <AboutCard title="Цель проекта" className="md:col-span-2">
                <p>
                    Наша главная цель — создать полнофункциональную, интуитивно понятную платформу, которая устраняет необходимость в подаче бумажных документов и личных визитах в деканат. Используя простой, симулированный бэкенд и интегрированного ИИ-помощника, мы стремимся сделать академическое администрирование более эффективным, прозрачным и доступным для всех участников.
                </p>
            </AboutCard>

            <AboutCard title="Контакты">
                 <p>
                    Это демонстрационный проект. По любым вопросам и отзывам, пожалуйста, свяжитесь с нами.
                </p>
                <div>
                    <a href="mailto:support@edudocs.example.com" className="font-semibold text-sky-600 hover:underline">
                        support@edudocs.example.com
                    </a>
                </div>
            </AboutCard>
            
             <AboutCard title="Ключевые технологии" className="md:col-span-3">
                <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <li className="bg-slate-100 p-4 rounded-lg">
                        <strong className="font-semibold text-slate-800">React & TypeScript</strong>
                        <p className="text-sm">Для надежной и современной архитектуры фронтенда.</p>
                    </li>
                     <li className="bg-slate-100 p-4 rounded-lg">
                        <strong className="font-semibold text-slate-800">Tailwind CSS</strong>
                        <p className="text-sm">Для быстрой, утилитарной стилизации и адаптивного дизайна.</p>
                    </li>
                    <li className="bg-slate-100 p-4 rounded-lg">
                        <strong className="font-semibold text-slate-800">Gemini API</strong>
                        <p className="text-sm">Обеспечивает работу нашего интеллектуального ИИ-помощника.</p>
                    </li>
                    <li className="bg-slate-100 p-4 rounded-lg">
                        <strong className="font-semibold text-slate-800">Симуляция DB</strong>
                        <p className="text-sm">Внутренняя "база данных" для интерактивности без бэкенда.</p>
                    </li>
                </ul>
            </AboutCard>
        </div>
    </div>
  );
};

export default AboutPage;