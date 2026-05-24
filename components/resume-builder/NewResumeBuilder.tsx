'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ResumeProvider, useResumeContext } from '@/context/ResumeContext';
import { PersonalDetailsForm } from './PersonalDetailsForm';
import { ProfessionalSummaryForm } from './ProfessionalSummaryForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { LivePreview } from './LivePreview';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';
import { saveResume } from '@/lib/actions/resume.actions';
import { toast } from 'sonner';

function BuilderContent({ user }: { user: any }) {
  const { resumeData } = useResumeContext();
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Debounce saving
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSave(true);
    }, 2000); // auto-save after 2 seconds of inactivity
    
    return () => clearTimeout(timer);
  }, [resumeData]);

  const handleSave = async (isAutoSave = false) => {
    if (!isAutoSave) setIsSaving(true);
    
    const result = await saveResume(resumeId, resumeData);
    
    if (!isAutoSave) setIsSaving(false);
    
    if (result.success && result.resumeId) {
      if (!resumeId) setResumeId(result.resumeId);
      if (!isAutoSave) toast.success("Resume saved successfully!");
    } else {
      if (!isAutoSave) toast.error("Failed to save resume");
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Create AI Resume</h1>
          <p className="text-muted-foreground mt-1">
            Build a new ATS-optimized resume tailored to your target roles.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.location.href = '/dashboard/resume'}>Cancel</Button>
          <Button className="gap-2" onClick={() => handleSave(false)} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 
            Save Resume
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          <PersonalDetailsForm />
          <ProfessionalSummaryForm />
          <ExperienceForm />
          <EducationForm />
          <SkillsForm />
        </div>

        <div className="h-[80vh] overflow-y-auto sticky top-4">
          <LivePreview />
        </div>
      </div>
    </div>
  );
}

export function NewResumeBuilder({ user }: { user: any }) {
  // Pre-fill context with user data
  const initialData = {
    firstName: user.name?.split(" ")[0] || '',
    lastName: user.name?.split(" ")[1] || '',
    email: user.email || '',
    summary: user.bio || '',
    skills: user.skills?.map((s: string) => ({ id: crypto.randomUUID(), name: s })) || []
  };

  return (
    <ResumeProvider initialData={initialData}>
      <BuilderContent user={user} />
    </ResumeProvider>
  );
}
