import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  User, Mail, Camera, Trophy, Target, Zap, 
  BookOpen, Key, Edit, Award, Flame
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, getSolvedProblems, getGlobalRankings, getCollegeRankings, getActivityHeatmap, getAllProblems, getAllSheets } from '../services/apiService';
import ActivityHeatmap from '../components/features/ActivityHeatmap';
import StreakDisplay from '../components/features/StreakDisplay';
import StatsDonutChart from '../components/features/StatsDonutChart';

const sheetColorMap = {
  'striver-sde': 'bg-gradient-to-r from-blue-500 to-indigo-600',
  'love-babbar-450': 'bg-gradient-to-r from-purple-500 to-pink-600',
  'neetcode-150': 'bg-gradient-to-r from-emerald-500 to-teal-600',
  'blind-75': 'bg-gradient-to-r from-red-500 to-orange-600',
  'gfg-must-do': 'bg-gradient-to-r from-orange-500 to-yellow-600',
  'apna-college': 'bg-gradient-to-r from-cyan-500 to-blue-600',
};

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); 
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ Easy: 0, Medium: 0, Hard: 0, Total: 0 });
  const [sheetsCompleted, setSheetsCompleted] = useState(0);
  const [totalSheets, setTotalSheets] = useState(0);
  const [ranks, setRanks] = useState({ global: '-', college: '-' });
  const [activityData, setActivityData] = useState({ currentStreak: 0, maxStreak: 0, totalActiveDays: 0, heatmapData: {} });
  const [sheetProgressData, setSheetProgressData] = useState([]);
  const [sheetIdsMap, setSheetIdsMap] = useState({});
  const [solvedSet, setSolvedSet] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const solvedIds = await getSolvedProblems();
          const allProblems = await getAllProblems();
          const allSheets = await getAllSheets();

          if (solvedIds && allProblems && allSheets) {
            const solved = new Set(solvedIds);
            setSolvedSet(solved);
            
            let easy = 0, med = 0, hard = 0;
            allProblems.forEach(p => {
              if (solved.has(p.id)) {
                if (p.difficulty === 'Easy') easy++;
                else if (p.difficulty === 'Medium') med++;
                else if (p.difficulty === 'Hard') hard++;
              }
            });
            setStats({ Easy: easy, Medium: med, Hard: hard, Total: solvedIds.length });

            const sheetMap = {};
            allProblems.forEach(p => {
                if (!sheetMap[p.sheetSlug]) sheetMap[p.sheetSlug] = [];
                sheetMap[p.sheetSlug].push(p.id);
            });

            let completedCount = 0;
            allSheets.forEach(sheet => {
                const ids = sheetMap[sheet.slug] || [];
                if (ids.length > 0 && ids.every(id => solved.has(id))) {
                    completedCount++;
                }
            });
            setTotalSheets(allSheets.length);
            setSheetsCompleted(completedCount);
            
            const progressData = allSheets.map(sheet => ({
              id: sheet.slug,
              name: sheet.name,
              total: sheet.totalProblems,
              color: sheetColorMap[sheet.slug] || 'bg-gradient-to-r from-primary to-purple-600'
            }));
            setSheetProgressData(progressData);
            setSheetIdsMap(sheetMap);
          }

          try {
            const globalData = await getGlobalRankings();
            if (globalData) {
               const myRank = globalData.findIndex(u => u.email === user.email) + 1;
               setRanks(prev => ({ ...prev, global: myRank > 0 ? `#${myRank}` : '-' }));
            }
          } catch (e) {}

          if (user.college) {
            try {
              const collegeData = await getCollegeRankings(user.college);
              if (collegeData) {
                 const myColRank = collegeData.findIndex(u => u.email === user.email) + 1;
                 setRanks(prev => ({ ...prev, college: myColRank > 0 ? `#${myColRank}` : '-' }));
              }
            } catch (e) {}
          }

          try {
            const activityResp = await getActivityHeatmap();
            if (activityResp && activityResp.success && activityResp.data) {
              setActivityData(activityResp.data);
            }
          } catch (e) {}

        } catch (error) {
          console.error("Failed to load profile data", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  const userLevel = Math.floor(stats.Total / 5) + 1;

  const getSheetSolved = (sheetId) => {
    return (sheetIdsMap[sheetId] || []).filter(id => solvedSet.has(id)).length;
  };

  if (loading) {
      return (
          <div className="min-h-screen bg-background pt-24 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
           <div className="p-2 bg-primary/10 rounded-lg">
             <User className="w-6 h-6 text-primary" />
           </div>
           <div>
             <h1 className="text-3xl font-bold tracking-tight">Profile Dashboard</h1>
             <p className="text-muted-foreground">Your coding journey at a glance</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* User Identity Card */}
            <Card className="glass-dark border-0">
                <CardContent className="pt-8 flex flex-col items-center text-center">
                <div className="relative mb-6 group cursor-pointer">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 p-[3px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
                        {(user?.fullName || user?.username || 'U').charAt(0).toUpperCase()}
                    </div>
                    </div>
                    <div className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg border-4 border-background group-hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-1">{user?.fullName || user?.username}</h2>
                <p className="text-sm text-muted-foreground mb-1">@{user?.username}</p>
                <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                    <Mail className="w-3 h-3" /> {user?.email}
                </p>

                <div className="flex gap-2 mb-6">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1">
                    Level {userLevel}
                    </Badge>
                    <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 px-3 py-1 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> {activityData.currentStreak > 0 ? `${activityData.currentStreak}d streak` : 'No streak'}
                    </Badge>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-6">
                    <div>
                    <p className="text-xs text-muted-foreground mb-1">Roll Number</p>
                    <p className="font-medium">{user?.rollNumber || "-"}</p>
                    </div>
                    <div>
                    <p className="text-xs text-muted-foreground mb-1">College</p>
                    <p className="font-medium truncate" title={user?.college}>{user?.college || "-"}</p>
                    </div>
                    <div>
                    <p className="text-xs text-muted-foreground mb-1">Branch</p>
                    <p className="font-medium">{user?.branch || "-"}</p>
                    </div>
                    <div>
                    <p className="text-xs text-muted-foreground mb-1">Year</p>
                    <p className="font-medium">{user?.year || "-"}</p>
                    </div>
                </div>

                <div className="w-full mt-8 flex gap-3">
                    <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 font-bold"
                        onClick={() => navigate('/settings', { state: { activeTab: 'profile' } })}
                    >
                        <Edit className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                    <Button 
                        variant="outline" 
                        className="flex-1 font-bold"
                        onClick={() => navigate('/settings', { state: { activeTab: 'account' } })}
                    >
                        <Key className="w-4 h-4 mr-2" /> Security
                    </Button>
                </div>
                </CardContent>
            </Card>

            {/* Quick Stats Summary */}
            <Card className="glass-dark border-0 shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-muted-foreground font-medium">College Rank</span>
                        <Badge className="bg-purple-500/20 text-purple-400 border-0 text-sm px-3">
                            {ranks.college}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-muted-foreground font-medium">Global Rank</span>
                        <Badge className="bg-blue-500/20 text-blue-400 border-0 text-sm px-3">
                            {ranks.global}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-muted-foreground font-medium">Current Streak</span>
                        <Badge className="bg-orange-500/20 text-orange-400 border-0 text-sm px-3">
                            {activityData.currentStreak} days
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-muted-foreground font-medium">Max Streak</span>
                        <Badge className="bg-red-500/20 text-red-400 border-0 text-sm px-3">
                            {activityData.maxStreak} days
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-muted-foreground font-medium">Sheets Completed</span>
                        <Badge className="bg-green-500/20 text-green-400 border-0 text-sm px-3">
                            {sheetsCompleted}/{totalSheets || 6}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Streak Display */}
            <StreakDisplay 
              currentStreak={activityData.currentStreak}
              maxStreak={activityData.maxStreak}
              totalActiveDays={activityData.totalActiveDays}
            />

            {/* Activity Heatmap (Green Graph) */}
            <Card className="glass-dark border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">📊</span> Activity Graph
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityHeatmap heatmapData={activityData.heatmapData} />
              </CardContent>
            </Card>

            {/* Problem Stats with Donut Chart */}
            <Card className="glass-dark border-0">
              <CardHeader>
                <CardTitle>Problem Solving Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsDonutChart easy={stats.Easy} medium={stats.Medium} hard={stats.Hard} />
              </CardContent>
            </Card>

            {/* Per-Sheet Progress */}
            <Card className="glass-dark border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Sheet Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sheetProgressData.map(sheet => {
                  const solved = getSheetSolved(sheet.id);
                  const pct = Math.round((solved / sheet.total) * 100);
                  const isComplete = pct === 100;
                  return (
                    <div key={sheet.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{sheet.name}</span>
                          {isComplete && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                              ✓ Completed
                            </Badge>
                          )}
                        </div>
                        <span className={`text-sm font-semibold ${isComplete ? 'text-green-400' : 'text-muted-foreground'}`}>
                          {solved}/{sheet.total}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ease-out ${sheet.color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-dark border-0">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${stats.Total > 0 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                    <div className="p-2 bg-amber-500/20 rounded-full text-amber-500">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">First Steps</h4>
                      <p className="text-xs text-muted-foreground">Solved first problem</p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${stats.Total >= 10 ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                    <div className="p-2 bg-blue-500/20 rounded-full text-blue-500">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Dedicated</h4>
                      <p className="text-xs text-muted-foreground">Solved 10 problems</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${activityData.maxStreak >= 7 ? 'bg-orange-500/10 border-orange-500/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                    <div className="p-2 bg-orange-500/20 rounded-full text-orange-500">
                      <Flame className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">On Fire</h4>
                      <p className="text-xs text-muted-foreground">7-day streak achieved</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${stats.Total >= 25 ? 'bg-purple-500/10 border-purple-500/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                    <div className="p-2 bg-purple-500/20 rounded-full text-purple-500">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Master</h4>
                      <p className="text-xs text-muted-foreground">Solved 25 problems</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${sheetsCompleted >= 1 ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                    <div className="p-2 bg-green-500/20 rounded-full text-green-500">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Completionist</h4>
                      <p className="text-xs text-muted-foreground">Completed a full sheet</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${sheetsCompleted >= 3 ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                    <div className="p-2 bg-cyan-500/20 rounded-full text-cyan-500">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Sheet Slayer</h4>
                      <p className="text-xs text-muted-foreground">Completed 3 sheets</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;