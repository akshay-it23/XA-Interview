"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, LayoutDashboard, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-slate-900 transition-colors hover:text-primary">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <span className="hidden sm:inline-block bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">InterviewX</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isLoading && (
            <>
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-slate-600 font-medium">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Button>
                  </Link>
                  <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex flex-col items-end">
                       <span className="text-sm font-semibold text-slate-900">{session.user?.name}</span>
                       <span className="text-xs text-muted-foreground">{session.user?.email}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2 border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4 text-slate-500" />
                      <span className="hidden sm:inline">Sign Out</span>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="font-semibold text-slate-600 hover:text-slate-900">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button className="font-semibold shadow-sm hover:shadow-md transition-all gap-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6">
                      Get Started <Sparkles className="h-4 w-4 text-yellow-300" />
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
