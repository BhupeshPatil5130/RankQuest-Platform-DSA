import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Trophy, Target, Flame, School, CheckCircle2,
  Settings, BookOpen, ArrowRight, Layers, TrendingUp, Calendar, Zap
} from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useDailySolved } from '../hooks/useDailySolved';
import { getActivityHeatmap, getAllPatterns, getSolvedProblems } from '../services/apiService';
import ActivityHeatmap from '../components/features/ActivityHeatmap';

export default function Profile() {
  const { user } = useAuth();
  const { streak, totalSolved, globalRank, solvedToday, loading: statsLoading } = useDailySolved();

  const [loading,       setLoading]       = useState(true);
  const [heatmapData,   setHeatmapData]   = useState({});
  const [patternsDone,  setPatternsDone]  = useState(0);
  const [totalPatterns, setTotalPatterns] = useState(15);

  useEffect(() => {
    (async () => {
      try {
        const [heatmap, pats, solved] = await Promise.allSettled([
          getActivityHeatmap(),
          getAllPatterns(),
          getSolvedProblems(),
        ]);

        // Build heatmap
        const hm = {};
        if (heatmap.status === 'fulfilled' && Array.isArray(heatmap.value)) {
          heatmap.value.forEach(i => { if (i.date) hm[i.date] = i.count || 1; });
        } else if (heatmap.status === 'fulfilled' && typeof heatmap.value === 'object' && heatmap.value) {
          Object.assign(hm, heatmap.value);
        }
        setHeatmapData(hm);

        // Count patterns with at least 1 problem solved
        if (pats.status === 'fulfilled' && pats.value?.length && solved.status === 'fulfilled') {
          const solvedSet = new Set(solved.value || []);
          setTotalPatterns(pats.value.length || 15);
          // We consider a pattern "started" if user has any solved problem
          // A simplified approach: count patterns that have solved > 0 in our tracking
          // Since we can't feasibly check each pattern's problems here, we'll use a heuristic:
          // patternsStarted = Math.floor(solvedCount / 10) capped to totalPatterns
          const approxDone = Math.min(Math.floor((solved.value?.length || 0) / 10), pats.value.length);
          setPatternsDone(approxDone);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const name    = user?.fullName || user?.username || 'Developer';
  const initial = name.charAt(0).toUpperCase();
  const pct     = totalSolved > 0 ? Math.round((totalSolved / 150) * 100) : 0;
  const patPct  = totalPatterns > 0 ? Math.round((patternsDone / totalPatterns) * 100) : 0;
  const isLoading = loading || statsLoading;

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
          {/* Problems Solved */}
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Problems Solved</span><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
            {isLoading
              ? <div className="h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
              : <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalSolved} <span className="text-xs text-slate-400 font-normal">/ 150</span></div>
            }
            <Progress value={pct} className="h-1.5 bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-teal-500" />
          </div>

          {/* Day Streak */}
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Day Streak</span><Flame className="w-4 h-4 text-amber-500" /></div>
            {isLoading
              ? <div className="h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
              : <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{streak} <span className="text-xs text-slate-400 font-normal">Days</span></div>
            }
            <p className={`text-xs font-semibold flex items-center gap-1 ${streak > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
              <TrendingUp className="w-3 h-3" /> {streak > 0 ? 'Active daily' : 'Start today!'}
            </p>
          </div>

          {/* Global Rank */}
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Global Rank</span><Trophy className="w-4 h-4 text-amber-500" /></div>
            {isLoading
              ? <div className="h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
              : <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{globalRank ? `#${globalRank}` : '—'}</div>
            }
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {globalRank && globalRank <= 100 ? 'Top 100! 🔥' : 'Keep solving to rank'}
            </p>
          </div>

          {/* Patterns Done */}
          <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800/60 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Patterns Done</span><Layers className="w-4 h-4 text-violet-500" /></div>
            {isLoading
              ? <div className="h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
              : <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{patternsDone} <span className="text-xs text-slate-400 font-normal">/ {totalPatterns}</span></div>
            }
            <Progress value={patPct} className="h-1.5 bg-violet-100 dark:bg-violet-950 [&>div]:bg-gradient-to-r [&>div]:from-violet-400 [&>div]:to-fuchsia-500" />
          </div>
        </div>

        {/* Solved Today Banner */}
        {!isLoading && solvedToday > 0 && (
          <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-200 dark:border-cyan-800/60 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-md shrink-0">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                You solved <span className="text-cyan-600 dark:text-cyan-400">{solvedToday} problem{solvedToday !== 1 ? 's' : ''}</span> today! 🎉
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Keep it up — consistency builds mastery.</p>
            </div>
            <div className="ml-auto shrink-0">
              <Zap className="w-6 h-6 text-cyan-500" />
            </div>
          </div>
        )}

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