import React from 'react';
import { DocumentStatus } from '../types';

interface StatusBadgeProps {
  status: DocumentStatus;
}

const statusStyles: Record<DocumentStatus, { bg: string; text: string; ring: string; icon: React.ReactElement }> = {
  [DocumentStatus.Submitted]: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    ring: 'ring-slate-200',
    icon: <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V5z" clipRule="evenodd"></path></svg>,
  },
  [DocumentStatus.Checked]: {
    bg: 'bg-sky-100',
    text: 'text-sky-700',
    ring: 'ring-sky-200',
    icon: <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>,
  },
  [DocumentStatus.Signed]: {
    bg: 'bg-teal-100',
    text: 'text-teal-700',
    ring: 'ring-teal-200',
    icon: <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.362 3.292a1.5 1.5 0 00-2.724 0L4.532 8.43a1.5 1.5 0 00-.07 1.298l.004.008.014.026c.3.522.86.848 1.47.848H14.05c.61 0 1.17-.326 1.47-.848l.014-.026.004-.008a1.5 1.5 0 00-.07-1.298L10.362 3.292zM10 12.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path></svg>,
  },
  [DocumentStatus.Rejected]: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    ring: 'ring-rose-200',
    icon: <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd"></path></svg>,
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const style = statusStyles[status];
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}>
      {style.icon}
      {status}
    </span>
  );
};

export default StatusBadge;