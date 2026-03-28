"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, Rocket } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Rocket className="h-6 w-6 text-primary" />
          <span>InterviewX</span>
        </div>

        {/* The logout logic is encapsulated in the Sign Out button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-muted-foreground hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </nav>
  );
}
