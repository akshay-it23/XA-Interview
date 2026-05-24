'use server';

import { prisma } from '@/lib/prisma';
import { checkUser } from './user.actions';
import { ResumeData } from '@/context/ResumeContext';

export async function saveResume(resumeId: string | null, data: ResumeData) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    if (resumeId) {
      // Update existing resume
      // For simplicity, we can delete existing relations and recreate them
      await prisma.experience.deleteMany({ where: { resumeId } });
      await prisma.education.deleteMany({ where: { resumeId } });
      await prisma.skill.deleteMany({ where: { resumeId } });

      const updatedResume = await prisma.resume.update({
        where: { id: resumeId },
        data: {
          title: data.title,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin,
          summary: data.summary,
          experiences: {
            create: data.experiences.map(exp => ({
              jobTitle: exp.jobTitle,
              company: exp.company,
              startDate: exp.startDate,
              endDate: exp.endDate,
              description: exp.description
            }))
          },
          educations: {
            create: data.educations.map(edu => ({
              degree: edu.degree,
              institution: edu.institution,
              startDate: edu.startDate,
              endDate: edu.endDate
            }))
          },
          skills: {
            create: data.skills.map(skill => ({
              name: skill.name
            }))
          }
        }
      });
      return { success: true, resumeId: updatedResume.id };
    } else {
      // Create new resume
      const newResume = await prisma.resume.create({
        data: {
          userId: user.id,
          title: data.title,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin,
          summary: data.summary,
          experiences: {
            create: data.experiences.map(exp => ({
              jobTitle: exp.jobTitle,
              company: exp.company,
              startDate: exp.startDate,
              endDate: exp.endDate,
              description: exp.description
            }))
          },
          educations: {
            create: data.educations.map(edu => ({
              degree: edu.degree,
              institution: edu.institution,
              startDate: edu.startDate,
              endDate: edu.endDate
            }))
          },
          skills: {
            create: data.skills.map(skill => ({
              name: skill.name
            }))
          }
        }
      });
      return { success: true, resumeId: newResume.id };
    }
  } catch (error: any) {
    console.error('Error saving resume:', error);
    return { success: false, error: error.message };
  }
}
