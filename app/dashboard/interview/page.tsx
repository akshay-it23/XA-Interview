import React from "react";
import { checkUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, BarChart, Settings, PlayCircle } from "lucide-react";
import Link from "next/link";

export default async function InterviewPrepPage() {
  const user = await checkUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Voice AI Interviewer</h1>
          <p className="text-muted-foreground mt-1">
            Simulate real tech interviews with our conversational AI agent.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-emerald-500/20 bg-emerald-50/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                <Mic className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Technical Mock Interview</CardTitle>
                <CardDescription>Algorithms, System Design, and Language specific.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <p className="text-sm text-slate-600">
               Our AI will act as a Senior Engineer and ask you technical questions tailored to your profile. It will evaluate your thought process and final answers.
             </p>
             <div className="p-3 rounded-lg bg-white border divide-y text-sm">
               <div className="flex justify-between py-2">
                 <span className="text-muted-foreground">Focus</span>
                 <span className="font-medium text-slate-700">Role-specific</span>
               </div>
               <div className="flex justify-between py-2">
                 <span className="text-muted-foreground">Duration</span>
                 <span className="font-medium text-slate-700">~15 Minutes</span>
               </div>
             </div>
             <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
               <PlayCircle className="h-5 w-5" /> Start Technical Round
             </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-50/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Behavioral Interview</CardTitle>
                <CardDescription>Leadership, Conflict, and Cultural Fit.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <p className="text-sm text-slate-600">
               Practice the "STAR" method. Our AI HR Manager will ask behavioral questions to test your soft skills and check if you are a cultural fit.
             </p>
             <div className="p-3 rounded-lg bg-white border divide-y text-sm">
               <div className="flex justify-between py-2">
                 <span className="text-muted-foreground">Focus</span>
                 <span className="font-medium text-slate-700">Soft Skills</span>
               </div>
               <div className="flex justify-between py-2">
                 <span className="text-muted-foreground">Duration</span>
                 <span className="font-medium text-slate-700">~10 Minutes</span>
               </div>
             </div>
             <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
               <PlayCircle className="h-5 w-5" /> Start Behavioral Round
             </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <BarChart className="h-5 w-5 text-purple-500" /> Past Performance
           </CardTitle>
           <CardDescription>Review transcripts and AI feedback for your past interviews.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <Mic className="h-12 w-12 opacity-20 mb-4" />
              <p>You haven't completed any mock interviews yet.</p>
           </div>
        </CardContent>
      </Card>

    </div>
  );
}
