import React from "react";
import { checkUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Save, FileText } from "lucide-react";
import Link from "next/link";

export default async function NewResumePage() {
  const user = await checkUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Create AI Resume</h1>
          <p className="text-muted-foreground mt-1">
            Build a new ATS-optimized resume tailored to your target roles.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/resume">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button className="gap-2">
            <Save className="h-4 w-4" /> Save Resume
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic detail that employers will see first.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user.name?.split(" ")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user.name?.split(" ")[1] || ""} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={user.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role</Label>
                <Input id="targetRole" placeholder="e.g. Senior Frontend Engineer" />
              </div>
            </CardContent>
          </Card>
          
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
                defaultValue={user.bio || ""}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" /> AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>Based on your onboarding profile, we recommend highlighting these skills:</p>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-white border rounded-md text-xs font-medium text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
              <Button variant="default" className="w-full mt-2">Auto-fill from Profile</Button>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
               <CardTitle className="text-lg flex items-center gap-2">
                 <FileText className="h-5 w-5 text-blue-500" /> Live Preview
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="aspect-[1/1.4] bg-slate-100 border rounded-md flex items-center justify-center">
                 <p className="text-muted-foreground text-xs">Preview will appear here</p>
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
