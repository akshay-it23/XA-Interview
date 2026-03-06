import Link from "next/link";
// We will use Shadcn buttons later, for now, standard Tailwind button.

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        
        {/* Logo Section */}
        <div className="mr-4 flex px-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-xl">
              XA-Interprep
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 items-center justify-end space-x-4 px-4">
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm cursor-pointer border border-transparent">
            Get Started
          </div>
        </div>
      </div>
    </nav>
  );
}
