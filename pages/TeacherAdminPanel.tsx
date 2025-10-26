import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import StatusBadge from '../components/StatusBadge';
import { DocumentStatus, DocumentType } from '../types';

const StatCard: React.FC<{ title: string; value: number; className?: string }> = ({ title, value, className }) => (
    <div className={`p-4 rounded-2xl ${className}`}>
        <h3 className="text-sm font-semibold opacity-80">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

const TeacherAdminPanel: React.FC = () => {
  const { documents, updateDocumentStatus, isLoading } = useAppContext();
  const [filterStudent, setFilterStudent] = useState('');
  const [filterType, setFilterType] = useState<DocumentType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | 'all'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  const uniqueStudentNames = useMemo(() => {
    const names = new Set(documents.map(d => d.studentName));
    return Array.from(names).sort();
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const studentMatch = filterStudent === '' || doc.studentName === filterStudent;
      const typeMatch = filterType === 'all' || doc.documentType === filterType;
      const statusMatch = filterStatus === 'all' || doc.status === filterStatus;
      return studentMatch && typeMatch && statusMatch;
    });
  }, [documents, filterStudent, filterType, filterStatus]);
  
  const summaryStats = useMemo(() => {
    return documents.reduce((acc, doc) => {
        acc.total++;
        if(doc.status === DocumentStatus.Submitted) acc.submitted++;
        if(doc.status === DocumentStatus.Checked) acc.checked++;
        if(doc.status === DocumentStatus.Signed) acc.signed++;
        return acc;
    }, { total: 0, submitted: 0, checked: 0, signed: 0 });
  }, [documents]);

  const handleStatusChange = async (docId: string, newStatus: DocumentStatus) => {
    setUpdatingId(docId);
    try {
        await updateDocumentStatus(docId, newStatus);
    } catch(e) {
        console.error("Failed to update status", e);
    } finally {
        setUpdatingId(null);
    }
  };

  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Панель администратора</h1>
        <p className="text-slate-500">Обзор и управление документами студентов</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-white">
          <StatCard title="Всего документов" value={summaryStats.total} className="bg-slate-800" />
          <StatCard title="Ожидают проверки" value={summaryStats.submitted} className="bg-slate-500" />
          <StatCard title="Проверено" value={summaryStats.checked} className="bg-sky-500" />
          <StatCard title="Подписано" value={summaryStats.signed} className="bg-teal-500" />
      </div>

      <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200">
          <div>
            <label htmlFor="studentFilter" className="block text-sm font-medium text-slate-700">Фильтр по студенту</label>
            <select id="studentFilter" value={filterStudent} onChange={e => setFilterStudent(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-50 border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-lg">
              <option value="">Все студенты</option>
              {uniqueStudentNames.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="typeFilter" className="block text-sm font-medium text-slate-700">Фильтр по типу</label>
            <select id="typeFilter" value={filterType} onChange={e => setFilterType(e.target.value as any)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-50 border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-lg">
              <option value="all">Все типы</option>
              {Object.values(DocumentType).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-700">Фильтр по статусу</label>
            <select id="statusFilter" value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-50 border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-lg">
              <option value="all">Все статусы</option>
              {Object.values(DocumentStatus).map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4">
           {isLoading && documents.length === 0 ? (
               <div className="text-center py-8">
                   <div className="mx-auto w-8 h-8 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
                   <p className="text-slate-500 mt-2">Загрузка документов...</p>
               </div>
           ) : filteredDocuments.length > 0 ? (
               filteredDocuments.map(doc => (
                   <div key={doc.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50/50 hover:shadow-sm transition-all">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                           <div className="md:col-span-2">
                               <p className="font-semibold text-slate-800">{doc.studentName}</p>
                               <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-600 hover:underline break-all">
                                   {doc.fileName}
                               </a>
                               <p className="text-xs text-slate-500">{doc.documentType}</p>
                           </div>
                           <div className="flex items-center space-x-2">
                               <StatusBadge status={doc.status} />
                               <p className="text-xs text-slate-400">
                                   {new Date(doc.submittedAt).toLocaleDateString()}
                               </p>
                           </div>
                           <div>
                               <select
                                 value={doc.status}
                                 onChange={(e) => handleStatusChange(doc.id, e.target.value as DocumentStatus)}
                                 disabled={updatingId === doc.id}
                                 className="w-full text-sm bg-slate-100 border-slate-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50"
                               >
                                 {Object.values(DocumentStatus).map(s => <option key={s} value={s}>{s}</option>)}
                               </select>
                           </div>
                       </div>
                   </div>
               ))
           ) : (
                <p className="text-slate-500 py-8 text-center">Документы, соответствующие фильтрам, не найдены.</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAdminPanel;