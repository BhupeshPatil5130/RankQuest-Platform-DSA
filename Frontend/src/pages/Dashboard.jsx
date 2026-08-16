import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Flame, CheckCircle2, Target, ArrowRight, Code2,
  BookOpen, TrendingUp, Sparkles, Layers, Calendar, Zap
} from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useDailySolved } from '../hooks/useDailySolved';
import { getActivityHeatmap, getAllPatterns, getSheets } from '../services/apiService';
import ActivityHeatmap from '../components/features/ActivityHeatmap';

export default function Dashboard() {
  const { user } = useAuth();
  const { solvedToday, streak, totalSolved, globalRank, loading: statsLoading } = useDailySolved();

  const [heatmapData, setHeatmapData] = useState({});
  const [patterns,    setPatterns]    = useState([]);
  const [sheets,      setSheets]      = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [heatmap, pats, shs] = await Promise.allSettled([
          getActivityHeatmap(),
          getAllPatterns(),
          getSheets(),
        ]);
        const hm = {};
        if (heatmap.status === 'fulfilled' && Array.isArray(heatmap.value)) {
          heatmap.value.forEach(i => { if (i.date) hm[i.date] = i.count || 1; });
        } else if (heatmap.status === 'fulfilled' && typeof heatmap.value === 'object' && heatmap.value) {
          Object.assign(hm, heatmap.value);
        }
        setHeatmapData(hm);
        setPatterns(pats.status === 'fulfilled' ? (pats.value || []) : []);
        setSheets(shs.status === 'fulfilled' ? (shs.value || []) : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const progress = totalSolved > 0 ? Math.round((totalSolved / 150) * 100) : 0;
  const isLoading = loading || statsLoading;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10 page-enter">

        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl shadow-indigo-500/20">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
          {/* Floating decorations */}
          <div className="absolute top-6 right-10 w-24 h-24 rounded-full bg-white/10 animate-float pointer-events-none" />
          <div className="absolute bottom-4 left-16 w-16 h-16 rounded-full bg-white/10 animate-float-reverse pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                Welcome back, {user?.fullName?.split(' ')[0] || user?.username || 'Developer'}!
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Ready to grind today's DSA pattern?
              </h1>
              <p className="text-indigo-100 text-base max-w-lg">
                Track your streaks, climb the leaderboard, and master 15 core patterns.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/patterns"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white text-indigo-700 font-extrabold text-sm shadow-lg hover:scale-105 transition-all duration-300">
                <Target className="w-4 h-4" /> Practice Now
              </Link>
              <Link to="/playground"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/15 border border-white/30 text-white font-bold text-sm hover:bg-white/25 transition-all duration-300">
                <Code2 className="w-4 h-4" /> Playground
              </Link>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 animate-stagger-in">

          {/* Total Solved */}
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 space-y-4 shadow-sm card-hover-lift">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Solved</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            {isLoading
              ? <div className="h-10 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
              : <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {totalSolved} <span className="text-sm text-slate-400 font-normal">/ 150</span>
                </div>
            }
            <Progress value={progress} className="h-2 bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-teal-500" />
          </div>

          {/* Day Streak */}
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-3xl p-6 space-y-4 shadow-sm card-hover-lift">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Day Streak</span>
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading
              ? <div className="h-10 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
              : <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {streak} <span className="text-sm text-slate-400 font-normal">Days</span>
                </div>
            }
            <p className={`text-sm font-semibold flex items-center gap-1.5 ${streak > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
              <TrendingUp className="w-3.5 h-3.5" />
              {streak > 0 ? `${streak}-day active streak!` : 'Start your streak today'}
            </p>
          </div>

          {/* Solved Today */}
          <div className="bg-white dark:bg-slate-900 border-2 border-cyan-200 dark:border-cyan-800/60 rounded-3xl p-6 space-y-4 shadow-sm card-hover-lift">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Solved Today</span>
              <Calendar className="w-5 h-5 text-cyan-500" />
            </div>
            {isLoading
              ? <div className="h-10 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
              : <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {solvedToday} <span className="text-sm text-slate-400 font-normal">Problems</span>
                </div>
            }
            <p className={`text-sm font-semibold flex items-center gap-1.5 ${solvedToday > 0 ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`}>
              <Zap className="w-3.5 h-3.5" />
              {solvedToday > 0 ? `Great work today!` : 'No problems yet today'}
            </p>
          </div>

          {/* Global Rank */}
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-3xl p-6 space-y-4 shadow-sm card-hover-lift">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Global Rank</span>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading
              ? <div className="h-10 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
              : <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {globalRank ? `#${globalRank}` : '—'}
                  <span className="text-sm text-slate-400 font-normal ml-1">Global</span>
                </div>
            }
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {globalRank && globalRank <= 10 ? '🔥 Top 10 globally!' : 'Solve more to rank up'}
            </p>
          </div>
        </div>

        {/* Activity Heatmap */}
        <ActivityHeatmap heatmapData={heatmapData} loading={loading} />

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patterns */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-5 shadow-sm card-hover-lift">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">Pattern Roadmap</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">15 sequential DSA patterns</p>
              </div>
              <Link to="/patterns" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {(loading ? [1,2,3,4] : patterns.slice(0, 4)).map((p, i) =>
                loading
                  ? <div key={i} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                  : (
                    <Link key={p.id} to={`/patterns/${p.slug}`}>
                      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 code-font">
                            Step {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{p.name}</span>
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{p.difficulty}</span>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>

          {/* Sheets */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-5 shadow-sm card-hover-lift">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">SDE Sheets</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Striver, NeetCode, Blind 75</p>
              </div>
              <Link to="/sheets" className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {(loading ? [1,2,3,4] : sheets.slice(0, 4)).map((s, i) =>
                loading
                  ? <div key={i} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                  : (
                    <Link key={s.id} to={`/sheets/${s.id}`}>
                      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.title}</span>
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{s.problemCount || '—'} Qs</span>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}