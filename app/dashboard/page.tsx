import { checkUser } from "@/lib/actions/user.actions";

export default async function DashboardPage() {
  // Trigger bridge if not cached
  const dbUser = await checkUser();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {dbUser?.name}! 
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 pt-6">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-col space-y-1.5 mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Database Bridge Status</h3>
          </div>
          <div className="space-y-3 text-sm text-balance break-all">
            <p className="flex flex-col gap-1">
              <span className="font-bold text-xs uppercase text-muted-foreground">PostgreSQL ID:</span>
              <span className="font-mono text-secondary-foreground">{dbUser?.id}</span>
            </p>
            <p className="flex flex-col gap-1">
              <span className="font-bold text-xs uppercase text-muted-foreground">MongoDB (Auth) ID:</span>
              <span className="font-mono text-secondary-foreground">{dbUser?.authUserId}</span>
            </p>
            <div className="pt-4 mt-4 border-t border-dashed flex items-center gap-2 text-green-600 font-semibold">
               <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
               Bridge Successful ✅
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
