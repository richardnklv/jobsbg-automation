'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JobMatchingContextType {
  jobIds: string[];
  setJobIds: (ids: string[]) => void;
}

const JobMatchingContext = createContext<JobMatchingContextType | undefined>(undefined);

export const JobMatchingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobIds, setJobIds] = useState<string[]>([]);

  return (
    <JobMatchingContext.Provider value={{ jobIds, setJobIds }}>
      {children}
    </JobMatchingContext.Provider>
  );
};

export const useJobMatching = () => {
  const context = useContext(JobMatchingContext);
  if (!context) {
    throw new Error('useJobMatching must be used within a JobMatchingProvider');
  }
  return context;
};