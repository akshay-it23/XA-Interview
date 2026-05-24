'use client';

import React, { useState } from 'react';
import { useResumeContext, Skill } from '@/context/ResumeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

export function SkillsForm() {
  const { resumeData, updateField } = useResumeContext();
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      const newSkill: Skill = {
        id: crypto.randomUUID(),
        name: inputValue.trim()
      };
      updateField('skills', [...resumeData.skills, newSkill]);
      setInputValue('');
    }
  };

  const handleRemove = (id: string) => {
    updateField('skills', resumeData.skills.filter(s => s.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Add relevant skills (press Enter to add).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input 
          placeholder="e.g. React, Python, Project Management" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAdd}
        />
        
        <div className="flex flex-wrap gap-2 pt-2">
          {resumeData.skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
              <span>{skill.name}</span>
              <button 
                type="button" 
                onClick={() => handleRemove(skill.id)}
                className="text-muted-foreground hover:text-foreground focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {resumeData.skills.length === 0 && (
            <p className="text-sm text-muted-foreground">No skills added yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
