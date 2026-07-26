import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Medal, Crown, Zap, Search, Shield, Star, Sparkles, AlertCircle, 
  Flame, CheckCircle, School
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { getGlobalRankings, getCollegeRankings } from '../services/apiService';

const Rankings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('global');
  const [rankings, setRankings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      setError('');
      try {
        let data = [];
        if (activeTab === 'global') {
          data = await getGlobalRankings();
        } else if (activeTab === 'college') {
          if (user?.college) {
            data = await getCollegeRankings(user.college);
          } else {
            setError("Please update your College in Profile settings to view College Rankings.");
            setRankings([]);
            setLoading(false);
            return;
          }
        }
        setRankings(data || []);
      } catch (err) {
        console.error("Rankings error:", err);
        setError("Failed to load rankings.");
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [activeTab, user]);

  const filteredRankings = rankings.filter(r => 
    r.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.college?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 subtle-grid">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border border-zinc-800/80 rounded-2xl bg-zinc-900/60 p-6 md:p-8 backdrop-blur-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            Competitive Leaderboards
          </div>
          
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Developer Rankings
            </h1>
            <p className="text-xs md:text-sm text-zinc-400">
              See where you stand among thousands of developers solving DSA patterns.
            </p>
          </div>
        </div>

        {/* Tab & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/80">
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'global'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Global Leaderboard
            </button>

            <button
              onClick={() => setActiveTab('college')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'college'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              College Leaderboard {user?.college && `(${user.college})`}
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search developer or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-zinc-950 border-zinc-800 text-xs h-9 rounded-lg"
            />
          </div>
        </div>

        {/* Leaderboard Table Container */}
        {error ? (
          <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="text-xs text-zinc-300">{error}</p>
            <Link to="/profile" className="inline-block text-xs font-semibold text-indigo-400 hover:underline">
              Update Profile Settings →
            </Link>
          </div>
        ) : loading ? (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl h-80 animate-pulse"></div>
        ) : (
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950 border-b border-zinc-800/80 text-zinc-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 text-center">Rank</th>
                    <th className="py-3.5 px-4">Developer</th>
                    <th className="py-3.5 px-4">College</th>
                    <th className="py-3.5 px-4 text-center">Streak</th>
                    <th className="py-3.5 px-4 text-center">Problems Solved</th>
                    <th className="py-3.5 px-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {filteredRankings.map((row, index) => {
                    const isCurrentUser = user && (user.username === row.username || user.email === row.email);
                    const rankNum = index + 1;

                    return (
                      <tr 
                        key={row.username || index}
                        className={`hover:bg-zinc-900/80 transition-colors ${
                          isCurrentUser ? 'bg-indigo-500/10 font-semibold border-l-2 border-indigo-500' : ''
                        }`}
                      >
                        {/* Rank Badge */}
                        <td className="py-3.5 px-4 text-center font-bold text-sm">
                          {rankNum === 1 ? (
                            <span className="inline-flex items-center gap-1 text-amber-400">
                              <Crown className="w-4 h-4 fill-amber-400/20" /> #1
                            </span>
                          ) : rankNum === 2 ? (
                            <span className="inline-flex items-center gap-1 text-zinc-300">
                              <Medal className="w-4 h-4 text-zinc-300" /> #2
                            </span>
                          ) : rankNum === 3 ? (
                            <span className="inline-flex items-center gap-1 text-amber-600">
                              <Medal className="w-4 h-4 text-amber-600" /> #3
                            </span>
                          ) : (
                            <span className="text-zinc-500">#{rankNum}</span>
                          )}
                        </td>

                        {/* Developer Info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-800 text-indigo-400 font-bold flex items-center justify-center text-xs">
                              {(row.fullName || row.username || 'D').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-zinc-100 flex items-center gap-1.5">
                                {row.fullName || row.username}
                                {isCurrentUser && <Badge className="bg-indigo-500/20 text-indigo-400 text-[9px] border-indigo-500/30">You</Badge>}
                              </p>
                              <p className="text-[11px] text-zinc-500">@{row.username}</p>
                            </div>
                          </div>
                        </td>

                        {/* College */}
                        <td className="py-3.5 px-4 text-zinc-400">
                          {row.college ? (
                            <span className="flex items-center gap-1 text-zinc-300">
                              <School className="w-3.5 h-3.5 text-zinc-500" /> {row.college}
                            </span>
                          ) : (
                            <span className="text-zinc-600">-</span>
                          )}
                        </td>

                        {/* Streak */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            <Flame className="w-3 h-3 fill-amber-400" /> {row.streakDays || row.streak || 0}d
                          </span>
                        </td>

                        {/* Problems Solved */}
                        <td className="py-3.5 px-4 text-center font-semibold text-emerald-400">
                          {row.problemsSolved || row.solvedCount || 0}
                        </td>

                        {/* Points */}
                        <td className="py-3.5 px-4 text-right font-extrabold text-white">
                          {(row.problemsSolved || row.solvedCount || 0) * 10} pts
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
};

export default Rankings;