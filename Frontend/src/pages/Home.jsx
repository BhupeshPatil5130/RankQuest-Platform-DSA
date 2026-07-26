import { Link } from 'react-router-dom';
import { ArrowRight, Target, BookOpen, Code2, Trophy, Zap, Layers, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

const features = [
  { icon: Target,   color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50 dark:bg-violet-950/40', border: 'border-violet-200 dark:border-violet-800/60',
    title: '15 Sequential Steps', desc: 'Proven roadmap from Two Pointers to Dynamic Programming — follow the right order.' },
  { icon: BookOpen, color: 'from-emerald-500 to-teal-600',  bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800/60',
    title: '150 Curated Problems', desc: '10 handpicked problems per pattern, linked directly to LeetCode & GFG.' },
  { icon: Trophy,   color: 'from-amber-500 to-orange-600',  bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200 dark:border-amber-800/60',
    title: 'College Rankings',    desc: 'Daily activity heatmaps, streak tracking, and college-wise leaderboards.' },
  { icon: Code2,    color: 'from-pink-500 to-rose-600',     bg: 'bg-pink-50 dark:bg-pink-950/40', border: 'border-pink-200 dark:border-pink-800/60',
    title: 'Code Playground',     desc: 'Run Python, Java, C++ and JavaScript directly in your browser.' },
];

const stats = [
  { label: '15', sub: 'DSA Patterns' },
  { label: '150+', sub: 'Problems' },
  { label: '4', sub: 'SDE Sheets' },
  { label: '∞', sub: 'Rankings' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 subtle-grid transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        {/* Hero */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            Pattern-Wise Learning Platform
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Master DSA{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pattern by Pattern
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop grinding 1000 random problems. Learn the <strong className="text-slate-800 dark:text-slate-200">15 core algorithmic patterns</strong> in a proven
            sequential roadmap — beginner foundations all the way to advanced mastery.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/patterns"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all">
              Start Roadmap <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/sheets"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-sm hover:border-emerald-400 dark:hover:border-emerald-600 hover:scale-105 transition-all shadow-sm">
              <BookOpen className="w-4 h-4" /> SDE Sheets
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 pt-4">
            {stats.map(({ label, sub }) => (
              <div key={sub} className="text-center">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, color, bg, border, title, desc }) => (
            <div key={title} className={`group ${bg} ${border} border-2 rounded-2xl p-6 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">How RankQuest Works</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Three simple steps to accelerate your DSA mastery</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', color: 'from-indigo-500 to-purple-600', title: 'Pick a Pattern', desc: 'Start with Step 01 (Arrays & Two Pointers) and follow the sequential 15-step roadmap.' },
              { step: '02', color: 'from-emerald-500 to-teal-600',  title: 'Solve Problems', desc: 'Work through 10 curated problems per pattern on LeetCode, GFG, or the in-app Playground.' },
              { step: '03', color: 'from-amber-500 to-orange-600',  title: 'Climb the Ranks', desc: 'Track your daily streak, activity heatmap, and compete on your college leaderboard.' },
            ].map(({ step, color, title, desc }) => (
              <div key={step} className="relative bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                  <span className="text-white font-extrabold text-sm code-font">{step}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-center space-y-5 shadow-2xl shadow-indigo-500/25">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <Sparkles className="w-10 h-10 text-white/80 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to start your DSA journey?</h2>
          <p className="text-sm text-indigo-100 max-w-md mx-auto">Create a free account in seconds and start tracking your daily practice today.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/register"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-indigo-600 font-extrabold text-sm hover:bg-indigo-50 shadow-lg transition-all hover:scale-105">
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border-2 border-white/40 text-white font-bold text-sm hover:bg-white/10 transition-all">
              Sign In
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}