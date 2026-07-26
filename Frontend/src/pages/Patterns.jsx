import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, Activity, Layers, RotateCcw, GitCompare, Share2, GitFork, Scale, Box, Search, Award, GitMerge, Briefcase, Network, Compass, BookOpen, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { getAllPatterns, getSolvedProblems, getProblemsByPattern } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const iconMap = { Target, Zap, Activity, Layers, RotateCcw, GitCompare, Share2, GitFork, Scale, Box, Search, Award, GitMerge, Briefcase, Network };

const stepGradients = [
  'from-indigo-500 to-purple-600',
  'from-purple-500 to-violet-600',
  'from-violet-500 to-fuchsia-600',
  'from-fuchsia-500 to-pink-600',
  'from-pink-500 to-rose-600',
  'from-rose-500 to-red-600',
  'from-orange-500 to-amber-600',
  'from-amber-500 to-yellow-500',
  'from-yellow-500 to-lime-500',
  'from-lime-500 to-green-500',
  'from-green-500 to-emerald-600',
  'from-emerald-500 to-teal-600',
  'from-teal-500 to-cyan-600',
  'from-cyan-500 to-blue-600',
  'from-blue-500 to-indigo-600',
];

const categoryFilters = [
  { id: 'All', label: 'All Tiers' },
  { id: 'Beginner Foundations', label: '🌱 Beginner' },
  { id: 'Intermediate Techniques', label: '⚡ Intermediate' },
  { id: 'Advanced Algorithmic Mastery', label: '🔥 Advanced' },
];

export default function Patterns() {
  const { user } = useAuth();
  const [patterns,       setPatterns]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [search,         setSearch]         = useState('');
  const [category,       setCategory]       = useState('All');
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
            if (problems?.length) map[p.slug] = problems.filter(x => solvedSet.has(x.id)).length;
          }
          setPatternSolveMap(map);
        }
      } finally { setLoading(false); }
    })();
  }, [user]);

  const filtered = patterns.filter(p => {
    const s = search.toLowerCase();
    return (
      (p.name.toLowerCase().includes(s) || p.description?.toLowerCase().includes(s)) &&
      (category === 'All' || p.category === category)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl p-7 md:p-10 shadow-xl shadow-purple-500/20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" /> Sequential Learning Path (Steps 01 → 15)
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Pattern-Wise DSA Roadmap</h1>
          <p className="text-violet-100 text-sm max-w-2xl leading-relaxed">
            Learn the 15 core algorithmic patterns in a proven sequential order. Master each pattern with 10 handpicked problems linked to LeetCode & GFG.
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-xs text-white font-semibold">
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> 15 Sequential Steps
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg">
              <BookOpen className="w-4 h-4 text-cyan-300" /> 150 Handpicked Problems
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg">
              <Sparkles className="w-4 h-4 text-amber-300" /> LeetCode & GFG Links
            </div>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm">
          <div className="flex flex-wrap gap-1.5">
            {categoryFilters.map(({ id, label }) => (
              <button key={id} onClick={() => setCategory(id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all
                  ${category === id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search pattern…" value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg" />
          </div>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((pattern, idx) => {
              const Icon        = iconMap[pattern.icon] || Target;
              const solved      = patternSolveMap[pattern.slug] || 0;
              const total       = pattern.totalProblems || 10;
              const pct         = Math.round((solved / total) * 100);
              const gradientCls = stepGradients[(pattern.sequenceOrder - 1) % stepGradients.length] || 'from-indigo-500 to-purple-600';
              const diffColor   = pattern.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                : pattern.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border-rose-200 dark:border-rose-800';
              return (
                <div key={pattern.id}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-gradient-to-r ${gradientCls} text-white shadow-sm code-font`}>
                        Step {String(pattern.sequenceOrder).padStart(2, '0')}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffColor}`}>{pattern.difficulty}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradientCls} shadow-md shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{pattern.name}</h2>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{pattern.category}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">{pattern.description}</p>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{solved} / {total} ({pct}%)</span>
                    </div>
                    <Progress value={pct} className={`h-1.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:${gradientCls}`} />
                    <Link to={`/patterns/${pattern.slug}`}>
                      <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                        Practice Pattern <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
