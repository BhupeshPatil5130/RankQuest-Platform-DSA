import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, ExternalLink, Code2, Sparkles, ChevronRight } from 'lucide-react';
import { getPatternBySlug, getProblemsByPattern, toggleSolveStatus, getSolvedProblems } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Progress } from '../components/ui/progress';

const stepGradients = [
  'from-indigo-500 to-purple-600','from-purple-500 to-violet-600','from-violet-500 to-fuchsia-600','from-fuchsia-500 to-pink-600',
  'from-pink-500 to-rose-600','from-rose-500 to-red-600','from-orange-500 to-amber-600','from-amber-500 to-yellow-500',
  'from-yellow-500 to-lime-500','from-lime-500 to-green-500','from-green-500 to-emerald-600','from-emerald-500 to-teal-600',
  'from-teal-500 to-cyan-600','from-cyan-500 to-blue-600','from-blue-500 to-indigo-600',
];

export default function PatternDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [pattern,   setPattern]  = useState(null);
  const [problems,  setProblems] = useState([]);
  const [solvedIds, setSolved]   = useState(new Set());
  const [loading,   setLoading]  = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [pat, probs] = await Promise.all([getPatternBySlug(slug), getProblemsByPattern(slug)]);
        setPattern(pat);
        setProblems(probs || []);
        if (user) {
          const s = await getSolvedProblems().catch(() => []);
          setSolved(new Set(s || []));
        }
      } finally { setLoading(false); }
    })();
  }, [slug, user]);

  const handleToggle = async (id) => {
    if (!user) return toast({ title: 'Sign in required', description: 'Please sign in to track progress.' });
    const newState = !solvedIds.has(id);
    await toggleSolveStatus(id, newState).catch(() => {});
    setSolved(prev => { const n = new Set(prev); newState ? n.add(id) : n.delete(id); return n; });
    toast({ title: newState ? '✅ Marked solved!' : 'Unmarked', variant: 'default' });
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 max-w-5xl mx-auto space-y-5">
      <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
    </div>
  );

  if (!pattern) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-4">
      <p className="text-slate-700 dark:text-slate-300 font-semibold">Pattern not found.</p>
      <Link to="/patterns" className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Patterns
      </Link>
    </div>
  );

  const gradient   = stepGradients[(pattern.sequenceOrder - 1) % stepGradients.length];
  const solved     = problems.filter(p => solvedIds.has(p.id)).length;
  const total      = problems.length;
  const pct        = total ? Math.round((solved / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">

        <Link to="/patterns" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Patterns Roadmap
        </Link>

        {/* Pattern Header */}
        <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-7 md:p-9 space-y-5 shadow-xl`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-extrabold code-font uppercase">
                Step {String(pattern.sequenceOrder).padStart(2,'0')} · {pattern.difficulty}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{pattern.name}</h1>
              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">{pattern.description}</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-4 min-w-[200px] space-y-2 shrink-0">
              <div className="flex justify-between text-xs font-semibold text-white">
                <span>Solved</span>
                <span>{solved} / {total}</span>
              </div>
              <Progress value={pct} className="h-2 bg-white/20 [&>div]:bg-white" />
              <p className="text-xs text-white/60 text-right">{pct}% done</p>
            </div>
          </div>
          {pattern.strategyPattern && (
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-200">
                <Sparkles className="w-4 h-4" /> Strategy & Recognition Formula
              </div>
              <p className="text-sm text-white/90 leading-relaxed">{pattern.strategyPattern}</p>
              {pattern.keyIdentifiers && (
                <p className="text-xs text-white/60"><span className="font-semibold text-white/80">Key Triggers:</span> {pattern.keyIdentifiers}</p>
              )}
            </div>
          )}
        </div>

        {/* Problem list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-extrabold text-slate-900 dark:text-white">Curated Problem Set</h2>
            <p className="text-xs text-slate-500 mt-0.5">10 handpicked problems — solve on LeetCode, GFG, or the in-app Playground</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {problems.map((problem, idx) => {
              const done = solvedIds.has(problem.id);
              const diffCls = problem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                            : problem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border-rose-200 dark:border-rose-800';
              return (
                <div key={problem.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleToggle(problem.id)} className="shrink-0">
                      {done
                        ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        : <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-emerald-400 transition-colors" />}
                    </button>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 code-font shrink-0">#{idx+1}</span>
                    <span className={`text-sm font-semibold transition-colors ${done ? 'line-through text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100'}`}>
                      {problem.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffCls} hidden sm:inline`}>{problem.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-8 sm:ml-0">
                    {problem.leetcodeUrl && (
                      <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-[11px] font-bold hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors">
                        LeetCode <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {problem.gfgUrl && (
                      <a href={problem.gfgUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-colors">
                        GFG <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <Link to={`/playground?problem=${problem.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-[11px] font-bold hover:bg-indigo-100 dark:hover:bg-indigo-950/60 transition-colors">
                      <Code2 className="w-3 h-3" /> Solve
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
