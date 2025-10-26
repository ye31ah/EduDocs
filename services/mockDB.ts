import { Role, DocumentStatus, DocumentType } from '../types';
import type { User, Document, NewDocument } from '../types';

let users: User[] = [
  { id: 'user-1', name: 'Алиса Иванова', role: Role.Student },
  { id: 'user-2', name: 'Борис Петров', role: Role.Student },
  { id: 'user-3', name: 'Д-р Елена Сидорова', role: Role.Teacher },
];

let documents: Document[] = [
  {
    id: 'doc-1',
    studentId: 'user-1',
    studentName: 'Алиса Иванова',
    fileName: 'zapros-transkripta.pdf',
    fileUrl: '#',
    description: 'Запрашиваю официальный транскрипт для подачи в магистратуру.',
    documentType: DocumentType.Transcript,
    status: DocumentStatus.Submitted,
    submittedAt: new Date('2023-10-25T10:00:00Z'),
    updatedAt: new Date('2023-10-25T10:00:00Z'),
  },
  {
    id: 'doc-2',
    studentId: 'user-2',
    studentName: 'Борис Петров',
    fileName: 'tema-diploma-v2.docx',
    fileUrl: '#',
    description: 'Финальное предложение по теме дипломной работы о применении квантовых вычислений.',
    documentType: DocumentType.Thesis,
    status: DocumentStatus.Checked,
    submittedAt: new Date('2023-10-22T14:30:00Z'),
    updatedAt: new Date('2023-10-24T11:00:00Z'),
  },
  {
    id: 'doc-3',
    studentId: 'user-1',
    studentName: 'Алиса Иванова',
    fileName: 'zayavlenie-na-otpusk.pdf',
    fileUrl: '#',
    description: 'Заявление на учебный отпуск по медицинским показаниям на следующей неделе.',
    documentType: DocumentType.Leave,
    status: DocumentStatus.Signed,
    submittedAt: new Date('2023-09-15T09:00:00Z'),
    updatedAt: new Date('2023-09-16T16:45:00Z'),
  },
];

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const db = {
  getUsers: async (): Promise<User[]> => {
    await delay(100);
    return [...users];
  },
  getUserById: async (id: string): Promise<User | undefined> => {
    await delay(100);
    return users.find(u => u.id === id);
  },
  addUser: async (name: string, role: Role): Promise<User> => {
    await delay(200);
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      role,
    };
    users.push(newUser);
    return newUser;
  },
  getDocuments: async (): Promise<Document[]> => {
    await delay(200);
    return [...documents].sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  },
  getDocumentsByStudentId: async (studentId: string): Promise<Document[]> => {
    await delay(200);
    return documents.filter(d => d.studentId === studentId).sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  },
  addDocument: async (doc: NewDocument, file: File): Promise<Document> => {
    await delay(300);
    const newDoc: Document = {
      ...doc,
      id: `doc-${Date.now()}`,
      status: DocumentStatus.Submitted,
      submittedAt: new Date(),
      updatedAt: new Date(),
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    };
    documents.unshift(newDoc);
    return newDoc;
  },
  updateDocumentStatus: async (docId: string, status: DocumentStatus): Promise<Document | undefined> => {
    await delay(300);
    const docIndex = documents.findIndex(d => d.id === docId);
    if (docIndex > -1) {
      documents[docIndex] = { ...documents[docIndex], status, updatedAt: new Date() };
      return documents[docIndex];
    }
    return undefined;
  },
};