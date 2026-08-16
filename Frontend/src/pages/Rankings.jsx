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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-10 page-enter">

        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-amber-500/20 space-y-5">
          {/* Floating decorations */}
          <div className="absolute top-6 right-12 w-20 h-20 rounded-full bg-white/10 animate-float pointer-events-none" />
          <div className="absolute bottom-8 left-20 w-14 h-14 rounded-full bg-white/10 animate-float-reverse pointer-events-none" />

          <div className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-extrabold uppercase tracking-widest">
            <Trophy className="w-4 h-4" /> Competitive Leaderboards
          </div>
          <h1 className="relative text-4xl md:text-5xl font-extrabold text-white tracking-tight">Developer Rankings</h1>
          <p className="relative text-amber-100 text-base max-w-xl leading-relaxed">
            See where you stand among developers solving DSA patterns daily. Compete with your college peers.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex gap-2">
            <button onClick={() => setTab('global')}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300
                ${tab === 'global' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
              🌍 Global Leaderboard
            </button>
            <button onClick={() => setTab('college')}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300
                ${tab === 'college' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
              🏫 College Leaderboard
            </button>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search developer…" value={search} onChange={e => setSearch(e.target.value)}
              className="pl-10 h-11 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl" />
          </div>
        </div>

        {/* Podium Top 3 */}
        {!loading && !error && filtered.length >= 3 && (
          <div className="flex flex-col sm:flex-row items-end justify-center gap-4 py-4">
            {[
              { pos: 1, height: 'h-36', grad: 'from-slate-400 to-slate-500', emoji: '🥈' },
              { pos: 0, height: 'h-44', grad: 'from-amber-400 to-yellow-500', emoji: '🥇' },
              { pos: 2, height: 'h-28', grad: 'from-amber-700 to-orange-700', emoji: '🥉' },
            ].map(spot => {
              const r = filtered[spot.pos];
              if (!r) return null;
              return (
                <div key={spot.pos} className="flex flex-col items-center gap-3">
                  <div className="text-center animate-float-slow">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-xl flex items-center justify-center shadow-xl mx-auto">
                      {(r.fullName || r.username || 'D').charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-2 max-w-[100px] truncate">{r.fullName || r.username}</p>
                    <p className="text-xs text-slate-500">{r.problemsSolved ?? r.totalSolved ?? 0} solved</p>
                  </div>
                  <div className={`w-28 ${spot.height} rounded-t-2xl bg-gradient-to-b ${spot.grad} flex items-start justify-center pt-4 shadow-lg`}>
                    <span className="text-3xl">{spot.emoji}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table */}
        {error ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-3xl text-center space-y-4 shadow-sm">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <p className="text-base text-slate-700 dark:text-slate-300">{error}</p>
            <Link to="/settings" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Update Profile →</Link>
          </div>
        ) : loading ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl h-80 animate-pulse" />
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-center">Rank</th>
                    <th className="px-6 py-4">Developer</th>
                    <th className="px-6 py-4 hidden md:table-cell">College</th>
                    <th className="px-6 py-4 text-center">Streak</th>
                    <th className="px-6 py-4 text-center">Solved</th>
                    <th className="px-6 py-4 text-right">Points</th>
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
                        <td className="px-6 py-4 text-center">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl ${rs.bg} ${rs.text} font-extrabold text-xs`}>
                            {rs.icon} #{n}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-sm shrink-0">
                              {(row.fullName || row.username || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                {row.fullName || row.username}
                                {isMe && <Badge className="bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 text-[10px] border-indigo-200 dark:border-indigo-800">You</Badge>}
                              </p>
                              <p className="text-xs text-slate-400">@{row.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            {row.college ? <><School className="w-4 h-4 text-slate-400" />{row.college}</> : <span className="text-slate-400">—</span>}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 font-bold text-xs border border-amber-200 dark:border-amber-800">
                            <Flame className="w-3.5 h-3.5" /> {streakCount}d
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-extrabold text-emerald-600 dark:text-emerald-400">
                          {solvedCount}
                        </td>
                        <td className="px-6 py-4 text-right font-extrabold text-slate-900 dark:text-white">
                          {pointsCount} <span className="text-slate-400 font-normal text-xs">pts</span>
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