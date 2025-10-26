import React, { createContext, useState, useEffect, useCallback } from 'react';
import { db } from '../services/mockDB';
import type { User, Document, DocumentStatus, Role, NewDocument } from '../types';

interface AppContextType {
  user: User | null;
  users: User[];
  documents: Document[];
  login: (userId: string) => Promise<void>;
  logout: () => void;
  register: (name: string, role: Role) => Promise<void>;
  addDocument: (doc: NewDocument, file: File) => Promise<void>;
  updateDocumentStatus: (docId: string, status: DocumentStatus) => Promise<void>;
  isLoading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [allUsers, allDocs] = await Promise.all([db.getUsers(), db.getDocuments()]);
      setUsers(allUsers);
      setDocuments(allDocs);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const login = async (userId: string) => {
    const userToLogin = await db.getUserById(userId);
    if (userToLogin) {
      setUser(userToLogin);
    } else {
        // Fallback for newly registered user that might not be in the list yet
        const allUsers = await db.getUsers();
        const freshUser = allUsers.find(u => u.id === userId);
        if (freshUser) setUser(freshUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, role: Role) => {
    const newUser = await db.addUser(name, role);
    await fetchAllData(); // Refresh user list
    await login(newUser.id);
  };


  const addDocument = async (doc: NewDocument, file: File) => {
    await db.addDocument(doc, file);
    fetchAllData(); // Re-fetch to get the latest data
  };

  const updateDocumentStatus = async (docId: string, status: DocumentStatus) => {
    await db.updateDocumentStatus(docId, status);
    fetchAllData(); // Re-fetch to get the latest data
  };
  
  const value = {
    user,
    users,
    documents,
    login,
    logout,
    register,
    addDocument,
    updateDocumentStatus,
    isLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};