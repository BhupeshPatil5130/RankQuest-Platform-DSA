import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Crown, Medal, Flame, Search, AlertCircle, School, TrendingUp, Users } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { getGlobalRankings, getCollegeRankings } from '../services/apiService';
import { mockRankings } from '../services/mockData';

export default function Rankings() {
  const { user } = useAuth();
  const [tab,      setTab]      = useState('global');
  const [rankings, setRankings] = useState([]);
  const [search,   setSearch]   = useState('');
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true); setError('');
      try {
        let data = [];
        if (tab === 'global') {
          data = await getGlobalRankings();
          if (!data?.length) data = mockRankings.global; // rich fallback
        } else if (user?.college) {
          data = await getCollegeRankings(user.college);
          if (!data?.length) data = mockRankings.college; // rich fallback
        } else {
          setError('Please add your College in Profile settings to see College Rankings.');
          setRankings([]); setLoading(false); return;
        }
        setRankings(data || []);
      } catch {
        // Network error — use mock data
        setRankings(tab === 'global' ? mockRankings.global : mockRankings.college);
      } finally { setLoading(false); }
    })();
  }, [tab, user]);

  const filtered = rankings.filter(r =>
    (r?.username || '').toLowerCase().includes((search || '').toLowerCase()) ||
    (r?.fullName || '').toLowerCase().includes((search || '').toLowerCase()) ||
    (r?.college || '').toLowerCase().includes((search || '').toLowerCase())
  );

  const rankStyle = (n) => {
    if (n === 1) return { bg: 'bg-gradient-to-r from-amber-400 to-yellow-500', text: 'text-white', icon: <Crown className="w-4 h-4" /> };
    if (n === 2) return { bg: 'bg-gradient-to-r from-slate-400 to-slate-500', text: 'text-white', icon: <Medal className="w-4 h-4" /> };
    if (n === 3) return { bg: 'bg-gradient-to-r from-amber-700 to-orange-700', text: 'text-white', icon: <Medal className="w-4 h-4" /> };
    return { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', icon: null };
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Hero */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 rounded-2xl p-7 md:p-10 shadow-xl shadow-amber-500/20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" /> Competitive Leaderboards
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Developer Rankings</h1>
          <p className="text-amber-100 text-sm max-w-xl leading-relaxed">
            See where you stand among developers solving DSA patterns daily. Compete with your college peers.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm">
          <div className="flex gap-1.5">
            <button onClick={() => setTab('global')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all
                ${tab === 'global' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
              🌍 Global Leaderboard
            </button>
            <button onClick={() => setTab('college')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all
                ${tab === 'college' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
              🏫 College Leaderboard
            </button>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search developer…" value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg" />
          </div>
        </div>

        {/* Podium Top 3 */}
        {!loading && !error && filtered.length >= 3 && (
          <div className="flex flex-col sm:flex-row items-end justify-center gap-3 py-2">
            {[
              { pos: 1, height: 'h-32', grad: 'from-slate-400 to-slate-500', emoji: '🥈' },
              { pos: 0, height: 'h-40', grad: 'from-amber-400 to-yellow-500', emoji: '🥇' },
              { pos: 2, height: 'h-24', grad: 'from-amber-700 to-orange-700', emoji: '🥉' },
            ].map(spot => {
              const r = filtered[spot.pos];
              if (!r) return null;
              return (
                <div key={spot.pos} className="flex flex-col items-center gap-2">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-lg flex items-center justify-center shadow-lg mx-auto">
                      {(r.fullName || r.username || 'D').charAt(0).toUpperCase()}
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 max-w-[90px] truncate">{r.fullName || r.username}</p>
                    <p className="text-[10px] text-slate-500">{r.problemsSolved ?? r.totalSolved ?? 0} solved</p>
                  </div>
                  <div className={`w-24 ${spot.height} rounded-t-xl bg-gradient-to-b ${spot.grad} flex items-start justify-center pt-3`}>
                    <span className="text-2xl">{spot.emoji}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table */}
        {error ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-2xl text-center space-y-3 shadow-sm">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-sm text-slate-700 dark:text-slate-300">{error}</p>
            <Link to="/settings" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Update Profile →</Link>
          </div>
        ) : loading ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl h-72 animate-pulse" />
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5 text-center">Rank</th>
                    <th className="px-5 py-3.5">Developer</th>
                    <th className="px-5 py-3.5 hidden md:table-cell">College</th>
                    <th className="px-5 py-3.5 text-center">Streak</th>
                    <th className="px-5 py-3.5 text-center">Solved</th>
                    <th className="px-5 py-3.5 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filtered.map((row, i) => {
                    const isMe = user && (user.username === row.username || user.email === row.email);
                    const n    = i + 1;
                    const rs   = rankStyle(n);
                    const solvedCount = row.problemsSolved ?? row.totalSolved ?? row.solvedCount ?? 0;
                    const streakCount = row.streakDays ?? row.currentStreak ?? row.streak ?? 0;
                    const pointsCount = row.points ?? (solvedCount * 10);
                    return (
                      <tr key={row.username || i}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${isMe ? 'bg-indigo-50 dark:bg-indigo-950/30 font-semibold' : ''}`}>
                        <td className="px-5 py-3.5 text-center">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${rs.bg} ${rs.text} font-extrabold`}>
                            {rs.icon} #{n}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                              {(row.fullName || row.username || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                {row.fullName || row.username}
                                {isMe && <Badge className="bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 text-[9px] border-indigo-200 dark:border-indigo-800">You</Badge>}
                              </p>
                              <p className="text-[10px] text-slate-400">@{row.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                            {row.college ? <><School className="w-3.5 h-3.5 text-slate-400" />{row.college}</> : <span className="text-slate-400">—</span>}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-800">
                            <Flame className="w-3 h-3" /> {streakCount}d
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-center font-extrabold text-emerald-600 dark:text-emerald-400">
                          {solvedCount}
                        </td>
                        <td className="px-5 py-3.5 text-right font-extrabold text-slate-900 dark:text-white">
                          {pointsCount} <span className="text-slate-400 font-normal">pts</span>
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
    </div>
  );
}