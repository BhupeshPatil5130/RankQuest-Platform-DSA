import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Crown, Medal, Flame, Search, AlertCircle, School, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import { getGlobalRankings, getCollegeRankings } from '../services/apiService';
import { mockRankings } from '../services/mockData';

export default function Rankings() {
  const { user } = useAuth();
  const [tab, setTab] = useState('global');
  const [rankings, setRankings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        let data = [];
        if (tab === 'global') {
          data = await getGlobalRankings();
          if (!data?.length) data = mockRankings.global;
        } else if (user?.college) {
          data = await getCollegeRankings(user.college);
          if (!data?.length) data = mockRankings.college;
        } else {
          setError('Please add your College name in Settings to unlock the College Leaderboard.');
          setRankings([]);
          setLoading(false);
          return;
        }
        setRankings(data || []);
      } catch {
        setRankings(tab === 'global' ? mockRankings.global : mockRankings.college);
      } finally {
        setLoading(false);
      }
    })();
  }, [tab, user]);

  const filtered = rankings.filter(
    (r) =>
      (r?.username || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (r?.fullName || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (r?.college || '').toLowerCase().includes((search || '').toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Developer Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Compare streaks, solved counts, and points with global coders and college peers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold">
            <button
              onClick={() => setTab('global')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tab === 'global'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🌍 Global
            </button>
            <button
              onClick={() => setTab('college')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tab === 'college'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🏫 College
            </button>
          </div>

          <div className="relative w-48 sm:w-56 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-xs rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {!loading && !error && filtered.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { idx: 1, rank: '2nd Place', icon: Medal, medalColor: 'text-slate-400', bg: 'border-slate-300 dark:border-slate-700' },
            { idx: 0, rank: '1st Place 🏆', icon: Crown, medalColor: 'text-amber-400', bg: 'border-amber-300/80 dark:border-amber-600/50 bg-amber-500/5' },
            { idx: 2, rank: '3rd Place', icon: Medal, medalColor: 'text-amber-700', bg: 'border-orange-300 dark:border-orange-800' },
          ].map(({ idx, rank, icon: Icon, medalColor, bg }) => {
            const r = filtered[idx];
            if (!r) return null;
            const solved = r.problemsSolved ?? r.totalSolved ?? r.solvedCount ?? 0;
            const streakCount = r.streakDays ?? r.currentStreak ?? r.streak ?? 0;

            return (
              <div
                key={idx}
                className={`workspace-card p-5 border-2 ${bg} flex items-center gap-4 relative overflow-hidden group`}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-extrabold text-lg flex items-center justify-center shadow shrink-0">
                  {(r.fullName || r.username || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 ${medalColor}`} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {rank}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate mt-0.5">
                    {r.fullName || r.username}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{solved} Solved</span>
                    <span>•</span>
                    <span className="text-amber-500 font-semibold">{streakCount}d Streak</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Table */}
      {error ? (
        <div className="workspace-card p-8 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto">{error}</p>
          <Link
            to="/settings"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
          >
            Go to Profile Settings <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : loading ? (
        <div className="workspace-card h-80 animate-pulse bg-slate-200 dark:bg-slate-800" />
      ) : (
        <div className="workspace-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-700/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 text-center w-16">Rank</th>
                  <th className="px-5 py-3.5">Developer</th>
                  <th className="px-5 py-3.5 hidden md:table-cell">Institution</th>
                  <th className="px-5 py-3.5 text-center">Streak</th>
                  <th className="px-5 py-3.5 text-center">Solved</th>
                  <th className="px-5 py-3.5 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filtered.map((row, i) => {
                  const isMe = user && (user.username === row.username || user.email === row.email);
                  const n = i + 1;
                  const solvedCount = row.problemsSolved ?? row.totalSolved ?? row.solvedCount ?? 0;
                  const streakCount = row.streakDays ?? row.currentStreak ?? row.streak ?? 0;
                  const pointsCount = row.points ?? solvedCount * 10;

                  return (
                    <tr
                      key={row.username || i}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                        isMe ? 'bg-indigo-50/70 dark:bg-indigo-950/40 font-semibold' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5 text-center font-bold text-slate-500 dark:text-slate-400">
                        {n <= 3 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-black">
                            #{n}
                          </span>
                        ) : (
                          `#${n}`
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                            {(row.fullName || row.username || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              {row.fullName || row.username}
                              {isMe && (
                                <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                                  You
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400">@{row.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[200px]">{row.college || '—'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold text-[11px] border border-amber-200/60 dark:border-amber-800/40">
                          <Flame className="w-3 h-3 text-amber-500" />
                          {streakCount}d
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400">
                        {solvedCount}
                      </td>
                      <td className="px-5 py-3.5 text-right font-extrabold text-slate-900 dark:text-white code-font">
                        {pointsCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}