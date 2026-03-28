import { checkUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Trigger bridge if not cached
  const user = await checkUser();

  // Redirect if user check failed
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/30">
      <Navbar />
      
      <main className="container mx-auto flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
