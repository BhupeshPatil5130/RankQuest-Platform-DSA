import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Trophy, Target, Flame, School, CheckCircle2, Settings, BookOpen, ArrowRight, Layers, TrendingUp } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { getSolvedProblems, getActivityHeatmap } from '../services/apiService';
import ActivityHeatmap from '../components/features/ActivityHeatmap';

export default function Profile() {
  const { user } = useAuth();
  const [loading,     setLoading]     = useState(true);
  const [solvedCount, setSolvedCount] = useState(0);
  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const [solved, heatmap] = await Promise.all([
          getSolvedProblems().catch(() => []),
          getActivityHeatmap().catch(() => []),
        ]);
        setSolvedCount(solved?.length || 0);
        const hm = {};
        if (Array.isArray(heatmap)) heatmap.forEach(i => { if (i.date) hm[i.date] = i.count || 1; });
        else if (typeof heatmap === 'object') Object.assign(hm, heatmap);
        setHeatmapData(hm);
      } finally { setLoading(false); }
    })();
  }, []);

  const name    = user?.fullName || user?.username || 'Developer';
  const initial = name.charAt(0).toUpperCase();
  const pct     = Math.round((solvedCount / 150) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Profile Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-7 md:p-9 shadow-xl shadow-indigo-500/20">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/25 backdrop-blur-sm border-2 border-white/30 text-white font-extrabold text-2xl md:text-3xl flex items-center justify-center shadow-xl shrink-0">
                {initial}
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                  PRO Member
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{name}</h1>
                <p className="text-sm text-indigo-100 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {user?.email}
                </p>
                {user?.college && (
                  <p className="text-xs text-indigo-100 flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5" /> {user.college} {user.branch && `· ${user.branch}`}
                  </p>
                )}
              </div>
            </div>
            <Link to="/settings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white font-bold text-xs hover:bg-white/30 transition-colors self-start md:self-auto">
              <Settings className="w-4 h-4" /> Edit Settings
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between"><span className="text-xs font-semibold text-slate-500">Problems Solved</span><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{solvedCount} <span className="text-xs text-slate-400 font-normal">/ 150</span></div>
            <Progress value={pct} className="h-1.5 bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-teal-500" />
          </div>
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between"><span className="text-xs font-semibold text-slate-500">Day Streak</span><Flame className="w-4 h-4 text-amber-500" /></div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">7 <span className="text-xs text-slate-400 font-normal">Days</span></div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Active daily</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between"><span className="text-xs font-semibold text-slate-500">Global Rank</span><Trophy className="w-4 h-4 text-amber-500" /></div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">#12</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Top 5%</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between"><span className="text-xs font-semibold text-slate-500">Patterns Done</span><Layers className="w-4 h-4 text-violet-500" /></div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">4 <span className="text-xs text-slate-400 font-normal">/ 15</span></div>
            <Progress value={26} className="h-1.5 bg-violet-100 dark:bg-violet-950 [&>div]:bg-gradient-to-r [&>div]:from-violet-400 [&>div]:to-fuchsia-500" />
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
          <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">Activity Overview</h2>
          <ActivityHeatmap heatmapData={heatmapData} loading={loading} />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/patterns">
            <div className="group bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-5 space-y-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                <Target className="w-5 h-5 text-white" />
              </div>
              <p className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm flex items-center gap-1">Practice Patterns <ArrowRight className="w-4 h-4" /></p>
              <p className="text-xs text-slate-500 dark:text-slate-400">15 sequential DSA steps</p>
            </div>
          </Link>
          <Link to="/sheets">
            <div className="group bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 space-y-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <p className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-sm flex items-center gap-1">SDE Sheets <ArrowRight className="w-4 h-4" /></p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Striver, NeetCode & Blind 75</p>
            </div>
          </Link>
          <Link to="/rankings">
            <div className="group bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 space-y-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <p className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors text-sm flex items-center gap-1">Leaderboard <ArrowRight className="w-4 h-4" /></p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Compare college ranks</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}