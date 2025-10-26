import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import StatusBadge from '../components/StatusBadge';
import { DocumentType } from '../types';

const StudentDashboard: React.FC = () => {
    const { user, documents, addDocument, isLoading } = useAppContext();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.Transcript);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const studentDocuments = useMemo(() => {
        return documents.filter(doc => doc.studentId === user?.id);
    }, [documents, user]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !selectedFile || !description) return;
        setIsSubmitting(true);
        try {
            await addDocument({
                studentId: user.id,
                studentName: user.name,
                description,
                documentType,
            }, selectedFile);
            setSelectedFile(null);
            setDescription('');
            setDocumentType(DocumentType.Transcript);
            e.currentTarget.reset();
        } catch (error) {
            console.error("Failed to submit document", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm sticky top-24">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Подать документ</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="documentType" className="block text-sm font-medium text-slate-700">Тип документа</label>
                            <select
                                id="documentType"
                                value={documentType}
                                onChange={(e) => setDocumentType(e.target.value as DocumentType)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-50 border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-lg"
                            >
                                {Object.values(DocumentType).map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700">Файл</label>
                            <input
                                id="file-upload"
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                                required
                            />
                             {selectedFile && <p className="text-xs text-slate-500 mt-1">Выбран файл: {selectedFile.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Описание</label>
                            <textarea
                                id="description"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Кратко опишите причину подачи этого документа."
                                className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || !selectedFile}
                            className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400"
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить документ'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="lg:col-span-2">
                <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">История ваших документов</h2>
                    {isLoading && studentDocuments.length === 0 ? (
                        <div className="text-center py-8">
                             <div className="mx-auto w-8 h-8 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
                             <p className="text-slate-500 mt-2">Загрузка документов...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {studentDocuments.length > 0 ? studentDocuments.map(doc => (
                                <div key={doc.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50/50 hover:shadow-sm transition-all">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div className="flex-1">
                                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-800 text-sky-600 hover:underline break-all">
                                                {doc.fileName}
                                            </a>
                                            <p className="text-sm text-slate-500">{doc.documentType}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0 ml-4">
                                            <StatusBadge status={doc.status} />
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-2 pt-2 border-t border-slate-100">{doc.description}</p>
                                    <p className="text-xs text-slate-400 mt-2 text-right">
                                        Обновлено: {new Date(doc.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            )) : <p className="text-slate-500 py-8 text-center">Вы еще не подавали никаких документов.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;