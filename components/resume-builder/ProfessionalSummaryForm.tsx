'use client';

import React from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function ProfessionalSummaryForm() {
  const { resumeData, updateField } = useResumeContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateField('summary', e.target.value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>A brief overview of your background.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-purple-600 gap-2 bg-purple-50 hover:bg-purple-100">
          <Sparkles className="h-4 w-4" /> AI Enhance
        </Button>
      </CardHeader>
      <CardContent>
        <textarea
          className="w-full min-h-[150px] p-3 text-sm rounded-md border border-input bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Write your summary here..."
          value={resumeData.summary}
          onChange={handleChange}
        />
      </CardContent>
    </Card>
  );
}
