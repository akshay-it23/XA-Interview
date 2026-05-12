# 🚀 InterviewX: 1-Month "Build from Scratch" Master Plan

Welcome to your personalized 1-month learning and building journey for **InterviewX**! 

The goal is to build this entire AI-powered interview practice and career development platform **from absolute scratch**. By following this phase-by-phase breakdown, you will understand *every single line of code* and the rationale behind the tech stack choices. If an interviewer asks you anything about this project, it will genuinely be yours because you built it step-by-step.

We will use this `README.md` as our central connection point. Whenever you are ready to start or continue, simply tell me: *"Let's start Phase X, Day Y"* and I will guide you with the necessary concepts, codes, and explanations.

---

## 🏗️ Technology Stack (What you are going to learn)
- **Frontend & Framework:** Next.js 16 (App Router), TypeScript, React 19, Tailwind CSS 4, Framer Motion.
- **UI Components:** Shadcn/UI, Radix UI, Recharts (for dashboards), React Hook Form + Zod.
- **Authentication:** NextAuth v4 (Email/Password, Google OAuth, GitHub OAuth).
- **Databases:** Dual-database architecture using **MongoDB** (for Auth) and **PostgreSQL** (for App Data).
- **ORMs:** Mongoose (for MongoDB), Prisma (for PostgreSQL/Neon).
- **AI & Integrations:** VAPI (for Voice AI Interviewing), Inngest Agent Kit (for Background jobs & Agent Workflows), Groq / OpenAI API.
- **Monetization:** Stripe Integration.

---

## 📅 The 4-Week Breakdown

### 🟢 Phase 1: Foundation & Authentication (Days 1 - 7)
*Goal: Setup the blank canvas, connect our dual-database architecture, and secure the app with NextAuth.*

- [ ] **Day 1: Project Initialization & Modern UI Setup**
  - Setup Next.js App Router with TypeScript and Tailwind CSS 4.
  - Understand the file structure (`src/app`, `src/components`, `src/lib`, etc.).
  - Setup and configure Shadcn UI (the best modern component library).
- [ ] **Day 2: Layouts & Routing Basics**
  - Creating the marketing landing page structure.
  - Understanding Next.js layout patterns (`layout.tsx`, `page.tsx`).
  - Creating a basic navbar and footer.
- [x] **Day 3: The Dual-Database Concept & Prisma Setup** ✅
  - Why MongoDB + PostgreSQL? (Understanding the architecture).
  - Setup PostgreSQL (e.g., via Neon DB).
  - Initialize Prisma ORM, create your first schema for the App Data.
- [x] **Day 4: MongoDB & NextAuth Integration** ✅
  - Setup MongoDB Atlas.
  - Install NextAuth and the `@auth/mongodb-adapter`.
  - Configure Email & Password (Credentials) provider with `bcrypt`.
- [x] **Day 5: OAuth Providers (Google & GitHub)** ✅
  - Setup Google Cloud Console for OAuth.
  - Setup GitHub Developer Apps.
  - Integrate them into NextAuth.
- [ ] **Day 6: Database Bridging (`checkUser`)** 🚀 *[Currently Active]*
  - Implementing the logic to sync our newly created MongoDB Auth user into our PostgreSQL App database.
  - Writing the `checkUser` helper function.
- [ ] **Day 7: Middleware & Protected Routes**
  - Securing routes using Next.js Middleware.
  - Building the authenticated Dashboard layout.

---

### 🟡 Phase 2: Core User Features & Resume Builder (Days 8 - 14)
*Goal: Build the onboarding, profile management, and the complex Resume Builder.*

- [ ] **Day 8: User Onboarding Flow**
  - Building `OnboardingForm.tsx` using React Hook Form + Zod.
  - Capturing user industry, target roles, and initial skills and saving them to PostgreSQL.
- [ ] **Day 9: Resume Builder Part 1 - Database & UI Architecture**
  - Expanding Prisma schema for `Resume`, `Experience`, `Education`, and `Skill`.
  - Creating the Resume Editor layout with interactive tabs.
- [ ] **Day 10: Resume Builder Part 2 - Personal Details & Summary**
  - Building the Personal Detail Form.
  - Hooking up a rich text editor (`@uiw/react-md-editor`) for the Summary.
- [ ] **Day 11: Resume Builder Part 3 - Experience & Education**
  - Handling dynamic form fields (adding multiple work experiences / educations).
  - Implementing the `Skills` form with a UI rating system.
- [ ] **Day 12: Resume Live Preview**
  - Building the side-by-side Live Preview component.
  - Passing form state to the preview component in real-time.
- [ ] **Day 13: AI Resume Enhancements**
  - Using Groq/OpenAI to add "AI Improve Summary" or "AI Improve Experience" buttons.
  - Learning how to prompt LLMs for reliable JSON or text output.
- [ ] **Day 14: Document Generation (PDF & DOCX) & Multiple Resumes**
  - How to export HTML to PDF using browser print APIs.
  - How to generate DOCX using `docx` and `file-saver`.
  - Managing multiple resumes per user.

---

### 🟠 Phase 3: AI Integrations, Interview Agent & Background Jobs (Days 15 - 21)
*Goal: Bring the app to life with Voice AI, background jobs, and automated assessments.*

- [ ] **Day 15: Introduction to VAPI (Voice AI)**
  - Setting up the VAPI account and securing API keys.
  - Creating an assistant in the VAPI dashboard.
- [ ] **Day 16: Building the AI Interview Interface**
  - Creating the `Agent.tsx` component.
  - Hooking up `@vapi-ai/web` for real-time speech start/stop events.
- [ ] **Day 17: Interview Post-Processing & Feedback**
  - Saving the interview transcript.
  - Generating AI feedback regarding communication and technical accuracy. 
- [ ] **Day 18: Inngest Background Jobs Basics**
  - Why Inngest? (Handling long-running serverless tasks).
  - Setup Inngest server locally and write our first background event.
- [ ] **Day 19: AI Career Chat Agent (Inngest Agent Kit)**
  - Designing a conversational agent that retains context about the user's resume and goals.
  - Storing chat histories in PostgreSQL.
- [ ] **Day 20: Technical Assessments Engine**
  - Generating dynamic quizzes based on user skills.
  - Building the `Quiz.tsx` interactive component.
- [ ] **Day 21: Assessment Analytics**
  - Grading user quizzes.
  - Storing the score history and providing AI-generated improvement tips.

---

### 🔴 Phase 4: Analytics, Monetization, & Polish (Days 22 - 28)
*Goal: Make the product look professional, add payment gateways, and launch.*

- [ ] **Day 22: Dashboard & Recharts**
  - Building the main Dashboard View.
  - Plotting assessment progress metrics using Recharts.
- [ ] **Day 23: Industry Insights Feature**
  - Fetching or simulating real-time salary insights and market growth data.
  - Creating a cohesive stats card UI.
- [ ] **Day 24: Stripe Integration (Payments)**
  - Setup Stripe products (Free vs. Premium).
  - Implement checkout sessions using Next.js API routes.
- [ ] **Day 25: Stripe Webhooks**
  - Receiving webhook events securely.
  - Updating the user's subscription status in PostgreSQL.
- [ ] **Day 26: Animations & Framer Motion**
  - Adding subtle page transitions.
  - Animating buttons and cards for a premium, dynamic feel.
- [ ] **Day 27: Comprehensive Testing & Linting**
  - Running ESLint and TypeScript checks.
  - Fixing UI bugs and edge cases.
- [ ] **Day 28: Vercel Deployment & Interview Readiness**
  - Final Environment Variables configuration.
  - Deploying the app on Vercel.
  - **Mock Interview with me**: I will ask you architectural questions about your newly built app to prepare you!

---

## 🛠️ How to use this guide

1. **Review this README:** Ensure the pacing and topics feel comfortable to you.
2. **Ping me:** When you are ready, say: *"Let's start Phase 1, Day 1."*
3. **Write the code yourself:** I'll explain the concept, provide the code blocks, and instruct you on where to place them. You will execute it, test it locally, and resolve any immediate errors.
4. **Learn the "Why":** I won't just give you code; I will explain *why* we prefer `const` over `let`, *why* we use Next.js App Router here, or *why* we chose dual databases.

**Ready when you are! What do you think of this month-long plan? Let me know if you want to adjust anything or if you're ready for Day 1!**
