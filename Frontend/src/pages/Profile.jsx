import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Trophy, Target, Zap, BookOpen, Key, Edit, Award, Flame, 
  School, CheckCircle, ShieldCheck, Settings, ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { getSolvedProblems, getGlobalRankings, getCollegeRankings, getActivityHeatmap } from '../services/apiService';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [solvedCount, setSolvedCount] = useState(0);
  const [ranks, setRanks] = useState({ global: '#12', college: '#4' });
  const [streak, setStreak] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const solved = await getSolvedProblems().catch(() => []);
        setSolvedCount(solved?.length || 0);
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDisplayName = () => user?.fullName || user?.username || 'User';
  const getInitial = () => getDisplayName().charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 subtle-grid">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Profile Card Header */}
        <div className="border border-zinc-800/80 rounded-2xl bg-zinc-900/60 p-6 md:p-8 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-extrabold text-2xl flex items-center justify-center shrink-0">
              {getInitial()}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold text-white">
                  {getDisplayName()}
                </h1>
                <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px]">
                  PRO
                </Badge>
              </div>

              <p className="text-xs text-zinc-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-500" /> {user?.email || 'user@example.com'}
              </p>

              {user?.college && (
                <p className="text-xs text-zinc-400 flex items-center gap-2 pt-0.5">
                  <School className="w-3.5 h-3.5 text-zinc-500" /> {user.college} {user?.branch && `• ${user.branch}`}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/settings">
              <button className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-xs transition-all flex items-center gap-2">
                <Settings className="w-3.5 h-3.5" /> Edit Settings
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-zinc-900/60 border-zinc-800/80 p-5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Problems Solved</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">{solvedCount} <span className="text-xs text-zinc-500 font-normal">/ 150</span></div>
            <Progress value={Math.round((solvedCount / 150) * 100)} className="h-1.5 bg-zinc-950" />
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800/80 p-5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Current Streak</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">7 <span className="text-xs text-zinc-500 font-normal">Days</span></div>
            <p className="text-[11px] text-emerald-400">Active Daily Practice</p>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800/80 p-5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Global Rank</span>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">#12</div>
            <p className="text-[11px] text-zinc-400">Top 5% Developers</p>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800/80 p-5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Patterns Completed</span>
              <Target className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">4 <span className="text-xs text-zinc-500 font-normal">/ 15</span></div>
            <p className="text-[11px] text-zinc-400">Roadmap Progress</p>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-white">Account Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <Link to="/patterns">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-1">
                <p className="font-semibold text-white">Practice Patterns →</p>
                <p className="text-zinc-400">15 sequential DSA steps</p>
              </div>
            </Link>

            <Link to="/sheets">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-1">
                <p className="font-semibold text-white">Explore SDE Sheets →</p>
                <p className="text-zinc-400">Striver, NeetCode & Blind 75</p>
              </div>
            </Link>

            <Link to="/rankings">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-1">
                <p className="font-semibold text-white">View Leaderboard →</p>
                <p className="text-zinc-400">Compare college ranks</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;