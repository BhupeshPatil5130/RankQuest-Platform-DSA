import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Flame, CheckCircle, Target, ArrowRight, Code2, BookOpen, 
  TrendingUp, Activity, Sparkles, Award, Layers
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { getSolvedProblems, getActivityHeatmap, getAllPatterns, getSheets } from '../services/apiService';
import ActivityHeatmap from '../components/features/ActivityHeatmap';

const Dashboard = () => {
  const { user } = useAuth();
  const [solvedCount, setSolvedCount] = useState(0);
  const [heatmapData, setHeatmapData] = useState({});
  const [patterns, setPatterns] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [solvedIds, heatmap, patternList, sheetList] = await Promise.all([
          getSolvedProblems().catch(() => []),
          getActivityHeatmap().catch(() => []),
          getAllPatterns().catch(() => []),
          getSheets().catch(() => [])
        ]);

        setSolvedCount(solvedIds?.length || 0);

        // Convert heatmap list or object into date map
        const heatMapObj = {};
        if (Array.isArray(heatmap)) {
          heatmap.forEach(item => {
            if (item.date) heatMapObj[item.date] = item.count || 1;
          });
        } else if (typeof heatmap === 'object') {
          Object.assign(heatMapObj, heatmap);
        }
        setHeatmapData(heatMapObj);

        setPatterns(patternList || []);
        setSheets(sheetList || []);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalProblems = 150;
  const overallProgress = Math.round((solvedCount / totalProblems) * 100);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 subtle-grid transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* User Welcome Banner */}
        <div className="border border-zinc-200 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900/60 p-6 md:p-8 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm dark:shadow-none">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome back, {user?.fullName || user?.username || 'Developer'}!
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Ready to solve today's DSA pattern?
            </h1>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
              Track your pattern-wise problem solving streak and compete on college leaderboards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/patterns">
              <button className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2 border-0">
                <Target className="w-4 h-4" /> Practice Patterns
              </button>
            </Link>
            <Link to="/playground">
              <button className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold text-xs transition-all flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Playground
              </button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 p-5 rounded-xl space-y-3 shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <span>Total Solved</span>
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-white">{solvedCount} <span className="text-xs text-zinc-500 font-normal">/ {totalProblems}</span></div>
            <Progress value={overallProgress} className="h-1.5 bg-zinc-100 dark:bg-zinc-950" />
          </Card>

          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 p-5 rounded-xl space-y-3 shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <span>Day Streak</span>
              <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-white">7 <span className="text-xs text-zinc-500 font-normal">Days</span></div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Active streak</p>
          </Card>

          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 p-5 rounded-xl space-y-3 shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <span>Pattern Progress</span>
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-white">{patterns.length} <span className="text-xs text-zinc-500 font-normal">Patterns</span></div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">15 Sequential Steps</p>
          </Card>

          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 p-5 rounded-xl space-y-3 shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <span>Global Rank</span>
              <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-white">#12 <span className="text-xs text-zinc-500 font-normal">in College</span></div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">Top 5% Developers</p>
          </Card>
        </div>

        {/* Activity Heatmap Container */}
        <ActivityHeatmap heatmapData={heatmapData} loading={loading} />

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pattern Roadmap Summary */}
          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">Sequential Pattern Roadmap</h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Beginner to Advanced DSA steps</p>
              </div>
              <Link to="/patterns" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {patterns.slice(0, 4).map((p, idx) => (
                <Link key={p.id} to={`/patterns/${p.slug}`}>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">Step 0{idx + 1}</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{p.name}</span>
                    </div>
                    <span className="text-zinc-500">{p.difficulty}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Curated SDE Sheets */}
          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl space-y-4 shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">Curated SDE Sheets</h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Striver SDE, NeetCode 150 & Blind 75</p>
              </div>
              <Link to="/sheets" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {sheets.slice(0, 4).map((sheet) => (
                <Link key={sheet.id} to={`/sheets/${sheet.id}`}>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{sheet.title}</span>
                    </div>
                    <span className="text-zinc-500">{sheet.problemCount} Qs</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;