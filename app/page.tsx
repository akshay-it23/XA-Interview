"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Target, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now in Public Beta
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Nail Your Next Interview with <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Precision</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-2xl text-balance mb-10"
          >
            Practice behavioral and technical rounds with an advanced voice AI. Generate ATS-beating resumes and track your performance to land your dream job faster.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/auth/signin">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-lg hover:-translate-y-1 transition-transform">
                Start Practicing Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full hover:bg-slate-100">
                See How It Works
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative blur elements */}
        <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="absolute top-[30%] right-[-10%] w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-slate-600">The complete toolkit for modern tech recruitment.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mock AI Interviews",
                description: "Realistic voice conversations with AI personas acting as HR or Senior Engineers.",
                icon: Bot,
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
              {
                title: "Smart Resume Builder",
                description: "AI analyzes your background and tailors your resume perfectly for ATS systems.",
                icon: FileText,
                color: "text-emerald-500",
                bg: "bg-emerald-50",
              },
              {
                title: "Skill Assessments",
                description: "Take personalized quizzes and get instant analytics on your weak points.",
                icon: Target,
                color: "text-purple-500",
                bg: "bg-purple-50",
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
                <div className={`${feature.bg} ${feature.color} inline-flex p-4 rounded-2xl mb-6`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((_, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-700">
                      <CheckCircle2 className={`h-4 w-4 mr-2 ${feature.color}`} />
                      Feature highlight {idx + 1}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
