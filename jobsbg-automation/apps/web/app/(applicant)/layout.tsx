'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JobMatchingContextType {
  jobs: { job_id: string; best_similarity: number }[];
  setJobs: (jobs: { job_id: string; best_similarity: number }[]) => void;
}

const JobMatchingContext = createContext<JobMatchingContextType | undefined>(undefined);

export const JobMatchingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<{ job_id: string; best_similarity: number }[]>([]);

  return (
    <JobMatchingContext.Provider value={{ jobs, setJobs }}>
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

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JobMatchingProvider>
      {children}
    </JobMatchingProvider>
  );
}