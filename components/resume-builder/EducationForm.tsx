'use client';

import React from 'react';
import { useResumeContext, Education } from '@/context/ResumeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

export function EducationForm() {
  const { resumeData, updateField } = useResumeContext();

  const handleAdd = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: ''
    };
    updateField('educations', [...resumeData.educations, newEdu]);
  };

  const handleRemove = (id: string) => {
    updateField('educations', resumeData.educations.filter(edu => edu.id !== id));
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    const updated = resumeData.educations.map(edu => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    updateField('educations', updated);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Education</CardTitle>
          <CardDescription>Add your academic background.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.educations.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-md relative space-y-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-destructive"
              onClick={() => handleRemove(edu.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree/Program</Label>
                <Input value={edu.degree} onChange={(e) => handleChange(edu.id, 'degree', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input value={edu.institution} onChange={(e) => handleChange(edu.id, 'institution', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="month" value={edu.startDate} onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="month" value={edu.endDate} onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full gap-2" onClick={handleAdd}>
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
