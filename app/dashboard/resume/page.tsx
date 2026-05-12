import React from "react";
import { checkUser } from "@/lib/actions/user.actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Download, Edit } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ResumeBuilderPage() {
  const user = await checkUser();
  if (!user) return null;

  const resumes = await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Resume Builder</h1>
          <p className="text-muted-foreground mt-1">
            Create, manage, and AI-optimize your professional resumes.
          </p>
        </div>
        <Link href="/dashboard/resume/new">
          <Button className="gap-2 shrink-0 shadow-md">
            <PlusCircle className="h-4 w-4" />
            Create New Resume
          </Button>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <Card className="border-dashed border-2 bg-slate-50/50 flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
            <FileText className="h-10 w-10" />
          </div>
          <CardTitle className="text-xl mb-2">No resumes yet</CardTitle>
          <CardDescription className="max-w-sm mb-6">
            You haven't created any resumes. Start building your perfect ATS-friendly resume to land your dream job!
          </CardDescription>
          <Link href="/dashboard/resume/new">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Start Building Now
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden group hover:shadow-lg transition-all border-slate-200">
              <div className="aspect-[1/1.4] bg-slate-100 flex flex-col items-center justify-center text-slate-400 border-b relative">
                {/* Preview Thumbnail Placeholder */}
                <FileText className="h-16 w-16 opacity-50" />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <Link href={`/dashboard/resume/${resume.id}`}>
                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 bg-white">
                <h3 className="font-semibold text-lg line-clamp-1">{resume.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Last updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
