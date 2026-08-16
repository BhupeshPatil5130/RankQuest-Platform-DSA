import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  BookOpen,
  Code2,
  Trophy,
  Zap,
  Layers,
  Compass,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Flame,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: '15 Sequential Patterns',
    desc: 'Structured step-by-step roadmap from Two Pointers to Dynamic Programming.',
    badge: 'Core Track',
  },
  {
    icon: GraduationCap,
    title: '10x10 Placement Prep',
    desc: '10 Easy, 10 Medium, and 10 Hard questions per Data Structure.',
    badge: 'Interview Ready',
  },
  {
    icon: BookOpen,
    title: 'Curated SDE Sheets',
    desc: 'Integrated with Striver SDE, NeetCode 150, Blind 75, and Love Babbar.',
    badge: 'Top Collections',
  },
  {
    icon: Trophy,
    title: 'Competitive Leaderboards',
    desc: 'College-level leaderboards, streak tracking, and daily heatmaps.',
    badge: 'Rank Up',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Landing Header */}
      <header className="sticky top-0 z-50 h-18 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              RankQuest
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition-all hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center space-y-8">
        {/* Floating background orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl animate-float pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl animate-float-slow pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Modern DSA & Competitive Programming Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          Master DSA with{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Pattern-Wise Clarity
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Stop blindly grinding hundreds of random questions. Follow our 15 sequential algorithmic patterns, track streaks, and land top software engineering roles.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:scale-105 transition-all"
          >
            Start Practicing Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/patterns"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 transition-all"
          >
            Explore Roadmap
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
          {[
            { num: '15', label: 'Sequential Patterns' },
            { num: '150+', label: 'Handpicked Problems' },
            { num: '10x10', label: 'Placement Master Sheets' },
            { num: '100%', label: 'Free & Open Learning' },
          ].map((s, idx) => (
            <div key={idx} className="workspace-card p-5 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 code-font">
                {s.num}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Everything you need to crack coding rounds
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A comprehensive workspace built specifically for interview preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="workspace-card-hover p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{f.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 py-12 px-4 text-center bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ready to master DSA interview patterns?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join thousands of developers leveling up their algorithmic problem-solving skills today.
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:scale-105 transition-all"
            >
              Get Started Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}