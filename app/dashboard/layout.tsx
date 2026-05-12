import { checkUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkUser();

  // 1. If not logged in at all, go to Sign-In
  if (!user) {
    redirect("/auth/signin");
  }

  // 2. CORE LOGIC: If logged in but NO industry set, go to Onboarding
  if (!user.industry) {
    redirect("/onboarding");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50/50">
      <main className="container mx-auto flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
