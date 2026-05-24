# Phase 2: Core User Features & The Dynamic Resume Builder

Welcome to Phase 2 of InterviewX! Now that our authentication and dual-database bridge is completely finished, we can finally build the core features that our authenticated users will interact with.

This phase is all about mastering complex forms in React, handling deeply nested database relations, and generating rich documents.

*Target Timeframe: 7 Days (Days 8–14)*

---

## 🎯 Phase 2 Objectives
1. **The Onboarding Flow:** Capture users' career goals to personalize the app (Industry, Role, Skills).
2. **Resume Architecture:** Design and implement a massive form for creating resumes (Personal Info, Summary, Experience, Education, Skills).
3. **Real-time Previews:** Build a live, side-by-side split screen where typing instantly updates a visual document.
4. **AI Assistants:** Connect Groq LLM to "Rewrite," "Enhance," or "Spellcheck" specific text-areas in the form.
5. **PDF Export:** Turn our web-view into a downloadable PDF that bypasses typical browser print flaws.

---

## 📅 The 7-Day Curriculum

### Day 8: User Onboarding Flow
**Goal:** Build a multi-step form to capture `industry`, `experience`, and `skills` and save to PostgreSQL.
- Setting up **React Hook Form** + **Zod** schema validation.
- Creating an `actions/onboarding.ts` Server Action.
- Display in UI using Shadcn/UI selection components (Combobox/Select).

### Day 9: Resume Database Architecture & Editor Layout
**Goal:** Expand our Prisma schema to handle massive resume relations.
- Write the schema for `Resume`, `Experience`, `Education`, and `Skill`.
- Build the physical shell: A two-column page layout (`[Layout] -> [Form Side] | [Preview Side]`).
- Design the Shadcn Tabs component to navigate between "Personal Info", "Experience", etc., without losing state.

### Day 10: Building the Complex Form (Part 1 - Personal & Summary)
**Goal:** Build the first half of the data-entry form.
- Use `useFormContext` to prevent "prop drilling" across our tabs.
- Build the Personal Details inputs (Name, Email, Phone, LinkedIn).
- Integrate `@uiw/react-md-editor` (or simply a `Textarea`) for the professional summary.

### Day 11: Building the Complex Form (Part 2 - Nested Experiences/Educations)
**Goal:** Handle arrays of data (the hardest part of React forms).
- Learn and implement `useFieldArray` from React Hook Form.
- Allow users to dynamically "`+ Add Experience`" and "`+ Add Education`."
- Adding drag-and-drop reordering (Bonus for UI architecture).

### Day 12: Building the Live Visual Preview
**Goal:** Display the resume elegantly as the user types.
- Create a `ResumePreview.tsx` component designed like a standard A4 piece of paper using CSS (`w-[21cm] min-h-[29.7cm]`).
- Pass the real-time form `watch()` state from the left column into the right column.
- *Interview Point:* Implementing debouncing so your app doesn't slow down on every keystroke.

### Day 13: The "AI Assist" Integration
**Goal:** Connect an LLM to write the resume for the user.
- Setup the Groq SDK (`groq-sdk`).
- Create an API route `POST /api/ai/enhance-text`.
- Add a magic "🌟 AI Enhance" button next to inputs (Summary, Experience Duties) that fetches a better, professional rewrite of whatever the user typed.

### Day 14: Finalizing, Saving, and PDF Export
**Goal:** Save the massive database object and allow users to download it.
- Write a giant Prisma `create` / `update` transaction to safely save the nested `Resume` + `Experiences` + `Educations` in PostgreSQL.
- Setup `react-to-print` (or HTML2Canvas/jsPDF) to trigger a perfect, styled print dialog to save the resume as a PDF.
- Build a generic `/resumes` dashboard grid to list all user resumes.

---

## 🛑 How to Use This Document
This is your map for the next 7 days. Once you are ready to begin, tell me:

> **"Let's start Day 8!"**

I will provide the necessary instructions, the code snippets to type out, and the "why" behind every architectural choice.
