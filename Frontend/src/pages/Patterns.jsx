import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Zap,
  Activity,
  Layers,
  RotateCcw,
  GitCompare,
  Share2,
  GitFork,
  Scale,
  Box,
  Search,
  Award,
  GitMerge,
  Briefcase,
  Network,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { getAllPatterns, getSolvedProblems, getProblemsByPattern } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const iconMap = {
  Target,
  Zap,
  Activity,
  Layers,
  RotateCcw,
  GitCompare,
  Share2,
  GitFork,
  Scale,
  Box,
  Search,
  Award,
  GitMerge,
  Briefcase,
  Network,
};

const categoryFilters = [
  { id: 'All', label: 'All Patterns' },
  { id: 'Beginner Foundations', label: '🌱 Beginner' },
  { id: 'Intermediate Techniques', label: '⚡ Intermediate' },
  { id: 'Advanced Algorithmic Mastery', label: '🔥 Advanced' },
];

export default function Patterns() {
  const { user } = useAuth();
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [patternSolveMap, setPatternSolveMap] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllPatterns();
        if (!data?.length) return;
        setPatterns(data);
        if (user) {
          const solvedIds = await getSolvedProblems().catch(() => []);
          const solvedSet = new Set(solvedIds || []);
          const map = {};
          for (const p of data) {
            const problems = await getProblemsByPattern(p.slug).catch(() => []);
            if (problems?.length) map[p.slug] = problems.filter((x) => solvedSet.has(x.id)).length;
          }
          setPatternSolveMap(map);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const filtered = patterns.filter((p) => {
    const s = (search || '').toLowerCase();
    return (
      ((p.name || '').toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s)) &&
      (category === 'All' || p.category === category)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Heading & Search Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            15 Sequential DSA Patterns
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Master the core interview algorithmic patterns in structured sequence from Step 01 to 15.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search patterns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categoryFilters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              category === id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid of Pattern Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((pattern) => {
            const Icon = iconMap[pattern.icon] || Target;
            const solved = patternSolveMap[pattern.slug] || 0;
            const total = pattern.totalProblems || 10;
            const pct = Math.round((solved / total) * 100);

            const diffBadge =
              pattern.difficulty === 'Easy'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                : pattern.difficulty === 'Medium'
                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/60'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800/60';

            return (
              <div
                key={pattern.id}
                className="workspace-card-hover p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 code-font">
                      Step {String(pattern.sequenceOrder).padStart(2, '0')}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${diffBadge}`}>
                      {pattern.difficulty}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {pattern.name}
                      </h2>
                      <p className="text-xs text-slate-400 truncate">{pattern.category}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {pattern.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>Progress</span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {solved} / {total} ({pct}%)
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-indigo-600" />
                  <Link to={`/patterns/${pattern.slug}`}>
                    <button className="w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 text-slate-700 dark:text-slate-300 hover:text-white text-xs font-bold transition-all duration-200 border border-slate-200 dark:border-slate-700/80 hover:border-transparent">
                      Solve Problems <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
