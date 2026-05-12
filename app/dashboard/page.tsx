import { checkUser } from "@/lib/actions/user.actions";
import Link from "next/link";
import { FileText, Mic, BarChart, Settings, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const dbUser = await checkUser();

  const features = [
    {
      title: "AI Resume Builder",
      description: "Create ATS-friendly resumes optimized by AI for your target roles.",
      icon: FileText,
      href: "/dashboard/resume",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Voice AI Interview",
      description: "Practice behavioral and technical rounds with an AI interviewer.",
      icon: Mic,
      href: "/dashboard/interview",
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Analytics & Insights",
      description: "Track your progress, view feedback and industry market insights.",
      icon: BarChart,
      href: "/dashboard/analytics",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Profile Settings",
      description: "Manage your onboarding details, skills, and account preferences.",
      icon: Settings,
      href: "/dashboard/settings",
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
          Welcome back, {dbUser?.name?.split(' ')[0]}!
        </h1>
        <p className="text-lg text-muted-foreground w-full max-w-2xl">
          Your personalized career development environment. What would you like to focus on today?
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 border-slate-200/60 overflow-hidden relative">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className={`p-3 rounded-2xl ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold leading-none tracking-tight text-lg group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200/60 rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-lg">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">PostgreSQL ID</span>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded truncate max-w-[200px]">
                  {dbUser?.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">MongoDB Bridge</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Active
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="font-bold text-xl mb-2">Upgrade to Premium</h3>
              <p className="text-white/80 text-sm max-w-[80%]">
                Unlock unlimited AI mock interviews, advanced analytics, and priority resume generation.
              </p>
            </div>
            <button className="mt-6 bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg text-sm self-start hover:bg-white/90 transition-colors shadow-sm">
              Upgrade Now
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
