# Phase 1: Foundation & Authentication

Welcome to Phase 1! The goal here is to set up the skeleton of our application, connect our databases, and secure it with authentication. 

Since you want to learn this inside out and truly own it, **I will give you the exact steps and you must try to execute them yourself first.** If an interviewer asks you how you started, you'll know exactly what these commands do!

Whenever you get stuck, hit an error, or just want me to take over, simply tell me: *"Run Step X for me"* or *"Complete Phase 1 for me"*.

---

## 🛠️ Day 1: Project Initialization & Modern UI Setup

### Step 1: Initialize the Next.js App
We are using Next.js with the App Router, TypeScript, and Tailwind CSS. This is the industry standard stack right now.

Open your terminal, navigate to the `akshay_interview` folder, and run:

```bash
npx create-next-app@latest interview-app
```

**When the installer asks you questions, select these answers:**
- Would you like to use TypeScript? **Yes** *(Interviews love TypeScript for bug prevention!)*
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes** *(For rapid, modern styling)*
- Would you like to use `src/` directory? **Yes** *(Keeps our code organized)*
- Would you like to use App Router? (recommended) **Yes**
- Would you like to customize the default import alias (@/*)? **No**

### Step 2: Install UI Components (Shadcn/UI)
`shadcn/ui` is a collection of beautifully designed, accessible components that you copy and paste into your apps (instead of importing an opaque package).

Navigate into your newly created project folder:
```bash
cd interview-app
```

Then initialize shadcn/ui:
```bash
npx shadcn@latest init
```

**When prompted, choose:**
- Style: **New York**
- Base color: **Slate**
- CSS variables: **Yes**

### Step 3: Test Everything
Let's make sure your blank canvas is working! Run the development server:

```bash
npm run dev
```
Now, open your browser and go to `http://localhost:3000`. You should see the default Next.js starter page.

---

✅ **Day 1 Completed!** Great job getting the Next.js and Tailwind foundation set up.

---

## �️ Day 2: Layouts & Routing Basics

### Step 1: Clean Up the Default Page
Next.js gives us a boilerplate page with lots of styling we don't need. Let's start fresh.
Open `src/app/page.tsx` (or `app/page.tsx` depending on your setup choices) and replace everything with this simple structure:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold tracking-tight">
        Welcome to InterviewX
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Your AI-powered interview practice platform.
      </p>
    </main>
  );
}
```

### Step 2: Create a Basic Navbar
In Next.js, components used across multiple pages go in the `components` folder. Let's create a Navbar.

Create a new file `components/navbar.tsx` (or `src/components/navbar.tsx`) and paste this code:

```tsx
import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">InterviewX</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Button variant="default">Sign In</Button>
        </nav>
      </div>
    </header>
  );
}
```
*Note: We are using the `Button` component here! We need to install it from shadcn first.*

### Step 3: Install the Button Component
Since we used `Button` in our Navbar, we need to add it via shadcn. 
Open your terminal inside the `interview-app` directory and run:

```bash
npx shadcn@latest add button
```

### Step 4: Add Navbar to the Root Layout
In Next.js App Router, `app/layout.tsx` is the wrapper for all your pages. We want the Navbar visible everywhere!

Open `app/layout.tsx` and update the component to include the Navbar inside the `<body>`:

```tsx
import { Navbar } from "@/components/navbar";
// ... keep other imports as they are ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```
*(Make sure to import `Navbar` at the top! Note: Your font variables might differ slightly based on Next.js template updates, just wrap `Navbar` inside your `body` tag alongside `{children}`!)*

### Step 5: Test Your Changes
Run your app again if it's not already running:
```bash
npm run dev
```
Visit `http://localhost:3000`. You should see the nice new Navbar and a clean welcome text!

---

### 🛑 YOUR MISSION!
Your task right now is to open your editor or IDE and complete **Step 1 through 5** for Day 2.

Once you see your new home page with the Navbar running at `localhost:3000`, come back and tell me:
**"Day 2 is done!"**

*(Or, if you prefer that I do it all for you automatically, just say: **"Execute Day 2 for me"**)*
