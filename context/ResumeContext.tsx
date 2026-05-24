'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
};

export type Skill = {
  id: string;
  name: string;
};

export type ResumeData = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
};

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateField: (field: keyof ResumeData, value: any) => void;
};

const defaultState: ResumeData = {
  title: 'My Resume',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedin: '',
  summary: '',
  experiences: [],
  educations: [],
  skills: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children, initialData }: { children: ReactNode; initialData?: Partial<ResumeData> }) {
  const [resumeData, setResumeData] = useState<ResumeData>({ ...defaultState, ...initialData });

  const updateField = (field: keyof ResumeData, value: any) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, updateField }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
}
