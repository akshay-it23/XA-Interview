'use client';

import React from 'react';
import { useResumeContext } from '@/context/ResumeContext';

export function LivePreview() {
  const { resumeData } = useResumeContext();

  return (
    <div className="w-full h-full min-h-[800px] bg-white text-black shadow-lg rounded-sm overflow-hidden" style={{ aspectRatio: '1 / 1.414' }}>
      <div className="p-8 h-full flex flex-col gap-6" style={{ fontFamily: 'sans-serif' }}>
        
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
            {resumeData.firstName || 'First Name'} {resumeData.lastName || 'Last Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {resumeData.email && <span>{resumeData.email}</span>}
            {resumeData.phone && <span>{resumeData.phone}</span>}
            {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-gray-800">Professional Summary</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experiences.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-gray-800">Experience</h2>
            <div className="space-y-4">
              {resumeData.experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.jobTitle || 'Job Title'}</h3>
                    <span className="text-xs text-gray-600 font-medium">
                      {exp.startDate || 'Start'} - {exp.endDate || 'End'}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">{exp.company || 'Company'}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.educations.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-gray-800">Education</h2>
            <div className="space-y-3">
              {resumeData.educations.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                    <div className="text-sm text-gray-700">{edu.institution || 'Institution'}</div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    {edu.startDate || 'Start'} - {edu.endDate || 'End'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-gray-800">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
              {resumeData.skills.map(skill => (
                <span key={skill.id}>• {skill.name}</span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
