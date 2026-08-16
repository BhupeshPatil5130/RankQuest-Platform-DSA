import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Trophy,
  Target,
  Flame,
  School,
  CheckCircle2,
  Settings as SettingsIcon,
  BookOpen,
  ArrowRight,
  Layers,
  TrendingUp,
  Calendar,
  Zap,
  GraduationCap
} from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useDailySolved } from '../hooks/useDailySolved';
import { getActivityHeatmap, getAllPatterns, getSolvedProblems } from '../services/apiService';
import ActivityHeatmap from '../components/features/ActivityHeatmap';

export default function Profile() {
  const { user } = useAuth();
  const { streak, totalSolved, globalRank, solvedToday, loading: statsLoading } = useDailySolved();

  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState({});
  const [patternsDone, setPatternsDone] = useState(0);
  const [totalPatterns, setTotalPatterns] = useState(15);

  useEffect(() => {
    (async () => {
      try {
        const [heatmap, pats, solved] = await Promise.allSettled([
          getActivityHeatmap(),
          getAllPatterns(),
          getSolvedProblems(),
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

        if (pats.status === 'fulfilled' && pats.value?.length && solved.status === 'fulfilled') {
          setTotalPatterns(pats.value.length || 15);
          const approxDone = Math.min(Math.floor((solved.value?.length || 0) / 10), pats.value.length);
          setPatternsDone(approxDone);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const name = user?.fullName || user?.username || 'Developer';
  const initial = name.charAt(0).toUpperCase();
  const pct = totalSolved > 0 ? Math.round((totalSolved / 150) * 100) : 0;
  const patPct = totalPatterns > 0 ? Math.round((patternsDone / totalPatterns) * 100) : 0;
  const isLoading = loading || statsLoading;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Profile Header Card */}
      <div className="workspace-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            {initial}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 uppercase">
                Pro Member
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {user?.email}
            </p>
            {user?.college && (
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-indigo-500" /> {user.college} {user.branch && `• ${user.branch}`}
              </p>
            )}
          </div>
        </div>

        <Link
          to="/settings"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200/80 dark:border-slate-700 transition-all self-stretch sm:self-auto justify-center"
        >
          <SettingsIcon className="w-4 h-4" /> Edit Profile Settings
        </Link>
      </div>

      {/* Stats Overview Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Problems Solved */}
        <div className="workspace-card p-5 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Problems Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalSolved} <span className="text-xs text-slate-400 font-normal">/ 150</span></div>
          <Progress value={pct} className="h-1.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-emerald-500" />
        </div>

        {/* Day Streak */}
        <div className="workspace-card p-5 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Day Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{streak} <span className="text-xs text-slate-400 font-normal">Days</span></div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{streak > 0 ? 'Streak is active!' : 'Start your streak today'}</p>
        </div>

        {/* Global Rank */}
        <div className="workspace-card p-5 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Global Rank</span>
            <Trophy className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{globalRank ? `#${globalRank}` : '—'}</div>
          <p className="text-[11px] text-slate-400">Solve daily to rank up</p>
        </div>

        {/* Patterns Mastered */}
        <div className="workspace-card p-5 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Patterns Done</span>
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{patternsDone} <span className="text-xs text-slate-400 font-normal">/ {totalPatterns}</span></div>
          <Progress value={patPct} className="h-1.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-indigo-600" />
        </div>
      </div>

      {/* Heatmap Card */}
      <div className="workspace-card p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Submission History</h2>
        <ActivityHeatmap heatmapData={heatmapData} loading={loading} />
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/patterns" className="workspace-card-hover p-5 space-y-2">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Practice Patterns</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Follow 15 sequential steps</p>
        </Link>
        <Link to="/sheets" className="workspace-card-hover p-5 space-y-2">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Curated Sheets</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Striver, NeetCode & Blind 75</p>
        </Link>
        <Link to="/placement" className="workspace-card-hover p-5 space-y-2">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 w-fit">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">10x10 Placement Prep</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Easy, Medium, Hard topic sets</p>
        </Link>
      </div>
    </div>
  );
}