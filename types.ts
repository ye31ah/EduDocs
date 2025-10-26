export enum Role {
  Student = 'Студент',
  Teacher = 'Преподаватель',
}

export enum DocumentStatus {
  Submitted = 'Отправлен',
  Checked = 'Проверен',
  Signed = 'Подписан',
  Rejected = 'Отклонен',
}

export enum DocumentType {
    Transcript = 'Запрос транскрипта',
    Leave = 'Заявление на отпуск',
    Thesis = 'Тема дипломной работы',
    Recommendation = 'Запрос рекомендации',
}

export type NewDocument = {
  studentId: string;
  studentName: string;
  description: string;
  documentType: DocumentType;
};

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface Document {
  id: string;
  studentId: string;
  studentName: string;
  fileName: string;
  fileUrl: string;
  description: string;
  documentType: DocumentType;
  status: DocumentStatus;
  submittedAt: Date;
  updatedAt: Date;
}

export type Page = 'home' | 'submit' | 'admin' | 'ai-assistant' | 'about';

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}