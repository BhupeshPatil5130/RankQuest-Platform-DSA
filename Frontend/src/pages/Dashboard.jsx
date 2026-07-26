import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Flame, CheckCircle2, Target, ArrowRight, Code2, BookOpen, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { getSolvedProblems, getActivityHeatmap, getAllPatterns, getSheets } from '../services/apiService';
import ActivityHeatmap from '../components/features/ActivityHeatmap';

const StatCard = ({ value, label, sub, icon: Icon, gradient, iconColor }) => (
  <div className={`bg-white dark:bg-slate-900 border-2 ${gradient} rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all`}>
    <div className="flex justify-between items-center">
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>
      <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
    </div>
    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{value} <span className="text-xs text-slate-400 font-normal">{sub}</span></div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [solvedCount, setSolvedCount] = useState(0);
  const [heatmapData, setHeatmapData] = useState({});
  const [patterns,    setPatterns]    = useState([]);
  const [sheets,      setSheets]      = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [solved, heatmap, pats, shs] = await Promise.all([
          getSolvedProblems().catch(() => []),
          getActivityHeatmap().catch(() => []),
          getAllPatterns().catch(() => []),
          getSheets().catch(() => []),
        ]);
        setSolvedCount(solved?.length || 0);
        const hm = {};
        if (Array.isArray(heatmap)) heatmap.forEach(i => { if (i.date) hm[i.date] = i.count || 1; });
        else if (typeof heatmap === 'object') Object.assign(hm, heatmap);
        setHeatmapData(hm);
        setPatterns(pats || []);
        setSheets(shs || []);
      } finally { setLoading(false); }
    })();
  }, []);

  const progress = Math.round((solvedCount / 150) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-7 md:p-9 shadow-xl shadow-indigo-500/20">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Welcome back, {user?.fullName?.split(' ')[0] || user?.username || 'Developer'}!
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Ready to grind today's DSA pattern?</h1>
              <p className="text-indigo-100 text-sm">Track your streaks, climb the leaderboard, and master 15 core patterns.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link to="/patterns"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-extrabold text-xs shadow-lg hover:scale-105 transition-all">
                <Target className="w-4 h-4" /> Practice Now
              </Link>
              <Link to="/playground"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 border border-white/30 text-white font-bold text-xs hover:bg-white/25 transition-all">
                <Code2 className="w-4 h-4" /> Playground
              </Link>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Total Solved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{solvedCount} <span className="text-xs text-slate-400 font-normal">/ 150</span></div>
            <Progress value={progress} className="h-1.5 bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-teal-500" />
          </div>
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Day Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">7 <span className="text-xs text-slate-400 font-normal">Days</span></div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Active streak</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Patterns</span>
              <Layers className="w-4 h-4 text-violet-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{patterns.length} <span className="text-xs text-slate-400 font-normal">Loaded</span></div>
            <p className="text-xs text-slate-500 dark:text-slate-400">15 Sequential Steps</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Global Rank</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">#12 <span className="text-xs text-slate-400 font-normal">College</span></div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Top 5% developers</p>
          </div>
        </div>

        {/* Activity Heatmap */}
        <ActivityHeatmap heatmapData={heatmapData} loading={loading} />

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patterns */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white">Pattern Roadmap</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">15 sequential DSA patterns</p>
              </div>
              <Link to="/patterns" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2">
              {(loading ? [1,2,3,4] : patterns.slice(0, 4)).map((p, i) => (
                loading
                  ? <div key={i} className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                  : (
                  <Link key={p.id} to={`/patterns/${p.slug}`}>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 code-font">Step {String(i+1).padStart(2,'0')}</span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{p.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">{p.difficulty}</span>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Sheets */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white">SDE Sheets</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Striver, NeetCode, Blind 75</p>
              </div>
              <Link to="/sheets" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2">
              {(loading ? [1,2,3,4] : sheets.slice(0, 4)).map((s, i) => (
                loading
                  ? <div key={i} className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                  : (
                  <Link key={s.id} to={`/sheets/${s.id}`}>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{s.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">{s.problemCount || '—'} Qs</span>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}