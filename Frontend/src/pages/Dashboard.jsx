import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Target,
  ArrowRight,
  Code2,
  BookOpen,
  TrendingUp,
  Sparkles,
  Layers,
  Calendar,
  Zap,
  ArrowUpRight,
  GraduationCap
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
  const [patterns, setPatterns] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);

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
          heatmap.value.forEach((i) => {
            if (i.date) hm[i.date] = i.count || 1;
          });
        } else if (heatmap.status === 'fulfilled' && typeof heatmap.value === 'object' && heatmap.value) {
          Object.assign(hm, heatmap.value);
        }
        setHeatmapData(hm);
        setPatterns(pats.status === 'fulfilled' ? pats.value || [] : []);
        setSheets(shs.status === 'fulfilled' ? shs.value || [] : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const progress = totalSolved > 0 ? Math.round((totalSolved / 150) * 100) : 0;
  const isLoading = loading || statsLoading;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Workspace Header / Welcome Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user?.fullName?.split(' ')[0] || user?.username || 'Developer'}
            </h1>
            <span className="text-xl animate-float">👋</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your pattern roadmaps, daily streaks, and prepare for interviews.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/patterns"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Target className="w-4 h-4" /> Continue Roadmap
          </Link>
          <Link
            to="/placement"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200/80 dark:border-slate-700 transition-all"
          >
            <GraduationCap className="w-4 h-4 text-purple-500" /> 10x10 Placement
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Solved */}
        <div className="workspace-card p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Solved
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          {isLoading ? (
            <div className="h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalSolved}</span>
              <span className="text-xs text-slate-400 font-medium">/ 150 problems</span>
            </div>
          )}
          <Progress value={progress} className="h-1.5 bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-emerald-500" />
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Current Streak */}
        <div className="workspace-card p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Day Streak
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          {isLoading ? (
            <div className="h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{streak}</span>
              <span className="text-xs text-slate-400 font-medium">Consecutive Days</span>
            </div>
          )}
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5 pt-2">
            <Zap className="w-3.5 h-3.5" />
            {streak > 0 ? `${streak} days active! Keep it rolling.` : 'Solve today to start a streak'}
          </p>
        </div>

        {/* Solved Today */}
        <div className="workspace-card p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Solved Today
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/40">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          {isLoading ? (
            <div className="h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{solvedToday}</span>
              <span className="text-xs text-slate-400 font-medium">Problems completed</span>
            </div>
          )}
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5 pt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            {solvedToday > 0 ? 'Daily goal in progress!' : 'No submissions yet today'}
          </p>
        </div>

        {/* Global Ranking */}
        <div className="workspace-card p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Global Rank
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/40">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          {isLoading ? (
            <div className="h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {globalRank ? `#${globalRank}` : '—'}
              </span>
              <span className="text-xs text-slate-400 font-medium">Leaderboard</span>
            </div>
          )}
          <Link
            to="/rankings"
            className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1 pt-2"
          >
            <span>View full leaderboard</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Activity Heatmap Panel */}
      <div className="workspace-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Coding Activity History</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daily consistency and practice cadence across the last 12 months
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            365 Days
          </span>
        </div>
        <ActivityHeatmap heatmapData={heatmapData} loading={loading} />
      </div>

      {/* Two Column Section: Pattern Roadmap Preview & Curated Sheets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core DSA Patterns Roadmap */}
        <div className="workspace-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">DSA Patterns Roadmap</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">15 sequential core patterns</p>
              </div>
            </div>
            <Link
              to="/patterns"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              All Patterns <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5 pt-2">
            {(loading ? [1, 2, 3, 4] : patterns.slice(0, 4)).map((p, i) =>
              loading ? (
                <div key={i} className="h-14 rounded-xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
              ) : (
                <Link
                  key={p.id}
                  to={`/patterns/${p.slug}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 code-font shrink-0">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{p.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 shrink-0">
                    {p.difficulty} →
                  </span>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Curated SDE Sheets */}
        <div className="workspace-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Curated SDE Sheets</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Striver, NeetCode, Blind 75</p>
              </div>
            </div>
            <Link
              to="/sheets"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              All Sheets <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5 pt-2">
            {(loading ? [1, 2, 3, 4] : sheets.slice(0, 4)).map((s, i) =>
              loading ? (
                <div key={i} className="h-14 rounded-xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
              ) : (
                <Link
                  key={s.id}
                  to={`/sheets/${s.id}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                        {s.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{s.author || 'Curated'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 code-font">
                    {s.problemCount || '—'} Qs
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}