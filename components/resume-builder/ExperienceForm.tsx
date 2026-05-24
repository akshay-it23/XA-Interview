'use client';

import React from 'react';
import { useResumeContext, Experience } from '@/context/ResumeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

export function ExperienceForm() {
  const { resumeData, updateField } = useResumeContext();

  const handleAdd = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    updateField('experiences', [...resumeData.experiences, newExp]);
  };

  const handleRemove = (id: string) => {
    updateField('experiences', resumeData.experiences.filter(exp => exp.id !== id));
  };

  const handleChange = (id: string, field: keyof Experience, value: string) => {
    const updated = resumeData.experiences.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    updateField('experiences', updated);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Add your relevant professional experience.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.experiences.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-md relative space-y-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-destructive"
              onClick={() => handleRemove(exp.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input value={exp.jobTitle} onChange={(e) => handleChange(exp.id, 'jobTitle', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={exp.company} onChange={(e) => handleChange(exp.id, 'company', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="month" value={exp.startDate} onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="month" value={exp.endDate} onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="w-full min-h-[100px] p-3 text-sm rounded-md border border-input bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describe your responsibilities and achievements..."
                value={exp.description}
                onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full gap-2" onClick={handleAdd}>
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </CardContent>
    </Card>
  );
}
