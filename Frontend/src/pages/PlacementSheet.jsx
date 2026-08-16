import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, CheckCircle2, Circle, Search, ExternalLink, 
  Sparkles, Code2, Youtube, Layers, ShieldCheck, 
  BookOpen, ChevronRight, RefreshCw, Loader2
} from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import { getSolvedProblems, getPlacementTopics, toggleSolveStatus } from '../services/apiService';
import { useToast } from '../hooks/useToast';

export default function PlacementSheet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // All topics and questions are fetched dynamically from backend API
  const [topicsData,  setTopicsData]  = useState([]);
  const [activeTopic, setActiveTopic] = useState('arrays');
  const [solvedSet,   setSolvedSet]   = useState(new Set());
  const [loading,     setLoading]     = useState(true);
  const [fetchingBackend, setFetchingBackend] = useState(false);
  const [search,      setSearch]      = useState('');
  const [diffFilter,  setDiffFilter]  = useState('all');
  const [statusFilter,setStatusFilter]= useState('all');

  // Fetch placement topics and solved statuses directly from Backend API on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      setFetchingBackend(true);
      try {
        const [backendTopics, solvedIds] = await Promise.all([
          getPlacementTopics().catch(() => []),
          user ? getSolvedProblems().catch(() => []) : Promise.resolve([])
        ]);

        if (user) {
          setSolvedSet(new Set((solvedIds || []).map(id => String(id))));
        }

        if (Array.isArray(backendTopics) && backendTopics.length > 0) {
          setTopicsData(backendTopics);
          if (backendTopics[0]?.id) {
            setActiveTopic(backendTopics[0].id);
          }
        }
      } catch (err) {
        console.error('[PlacementSheet] Failed to load from backend API:', err);
      } finally {
        setLoading(false);
        setFetchingBackend(false);
      }
    })();
  }, [user]);

  const handleToggle = async (p) => {
    if (!user) {
      toast({ title: 'Login Required', description: 'Please log in to track your solved progress.', variant: 'warning' });
      return;
    }
    const pidStr = String(p.id);
    const currentlySolved = solvedSet.has(pidStr);
    const newSolved = !currentlySolved;

    setSolvedSet(prev => {
      const next = new Set(prev);
      if (newSolved) next.add(pidStr);
      else next.delete(pidStr);
      return next;
    });

    try {
      await toggleSolveStatus(p.id, newSolved);
      toast({
        title: newSolved ? 'Problem Solved! 🎉' : 'Marked as Unsolved',
        description: `${p.title} status saved to backend database.`,
      });
    } catch {
      setSolvedSet(prev => {
        const next = new Set(prev);
        if (currentlySolved) next.add(pidStr);
        else next.delete(pidStr);
        return next;
      });
      toast({ title: 'Sync Failed', description: 'Unable to update status. Please try again.', variant: 'destructive' });
    }
  };

  let totalProblems = 0;
  let totalSolvedCount = 0;

  topicsData.forEach(t => {
    const topicProblems = [...(t.easy || []), ...(t.medium || []), ...(t.hard || [])];
    totalProblems += topicProblems.length;
    topicProblems.forEach(p => {
      if (solvedSet.has(String(p.id))) totalSolvedCount++;
    });
  });

  const overallPct = totalProblems ? Math.round((totalSolvedCount / totalProblems) * 100) : 0;
  const currentTopic = topicsData.find(t => t.id === activeTopic) || topicsData[0];

  const filterList = (list) => {
    if (!Array.isArray(list)) return [];
    return list.filter(p => {
      const matchesSearch = (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
                            (p.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase())) ||
                            (p.companies || []).some(c => c.toLowerCase().includes(search.toLowerCase()));
      const isSolved = solvedSet.has(String(p.id));
      const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'solved' && isSolved) || 
                            (statusFilter === 'unsolved' && !isSolved);
      return matchesSearch && matchesStatus;
    });
  };

  const filteredEasy   = filterList(currentTopic?.easy);
  const filteredMedium = filterList(currentTopic?.medium);
  const filteredHard   = filterList(currentTopic?.hard);

  const getTopicSolvedCount = (t) => {
    if (!t) return 0;
    const all = [...(t.easy || []), ...(t.medium || []), ...(t.hard || [])];
    return all.filter(p => solvedSet.has(String(p.id))).length;
  };

  if (loading && topicsData.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Loading Placement Modules from Backend API...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="space-y-6">

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-7 md:p-10 shadow-2xl shadow-indigo-500/20 text-white space-y-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-widest backdrop-blur-md">
              <Trophy className="w-3.5 h-3.5 text-amber-300" /> Backend API Live (10 Easy, 10 Medium, 10 Hard per Topic)
            </div>

            {fetchingBackend && (
              <span className="flex items-center gap-1.5 text-xs text-indigo-100 bg-white/10 px-3 py-1 rounded-full animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" /> API Synced
              </span>
            )}
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Placement Prep Master Sheet
            </h1>
            <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
              All topics and questions are <span className="font-extrabold text-white">fetched dynamically from the Backend REST API</span>. Separate un-mixed modules for Stack, Queue, Binary Trees, and BST!
            </p>
          </div>

          {/* Master Progress Bar */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl space-y-3 max-w-2xl">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" /> Total Placement Progress
              </span>
              <span className="text-amber-300 font-extrabold text-sm">{totalSolvedCount} / {totalProblems} Solved ({overallPct}%)</span>
            </div>
            <Progress value={overallPct} className="h-3 rounded-full bg-black/20 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-teal-300" />
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-semibold pt-1">
            <div className="bg-white/15 px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-300" /> {topicsData.length} Backend Modules
            </div>
            <div className="bg-white/15 px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" /> {totalProblems} Placement Questions
            </div>
            <div className="bg-white/15 px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <Code2 className="w-4 h-4 text-pink-300" /> Playground Code Execution
            </div>
          </div>
        </div>

        {/* Filter & Topic Selector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar Un-Mixed Data Structure Topics */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Backend Modules
            </h3>

            <div className="space-y-1.5 max-h-[650px] overflow-y-auto pr-1 subtle-scrollbar">
              {topicsData.map((t) => {
                const isSelected = t.id === activeTopic;
                const solvedCount = getTopicSolvedCount(t);
                const totalInTopic = (t.easy?.length || 0) + (t.medium?.length || 0) + (t.hard?.length || 0);
                const pct = totalInTopic ? Math.round((solvedCount / totalInTopic) * 100) : 0;

                return (
                  <button key={t.id} onClick={() => setActiveTopic(t.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between group
                      ${isSelected 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/25 font-bold' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'}`}>
                    
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-lg shrink-0">{t.icon}</span>
                      <div className="truncate">
                        <p className="text-xs truncate">{t.name}</p>
                        <p className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {solvedCount}/{totalInTopic} solved ({pct}%)
                        </p>
                      </div>
                    </div>
                    
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-white' : 'text-slate-400 group-hover:translate-x-1'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Problem Area */}
          {currentTopic && (
            <div className="lg:col-span-3 space-y-6">

              {/* Controls Bar */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
                
                {/* Difficulty Filters */}
                <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                  {[
                    { key: 'all', label: `All Levels (${(currentTopic.easy?.length||0) + (currentTopic.medium?.length||0) + (currentTopic.hard?.length||0)})` },
                    { key: 'Easy', label: `🟢 Easy (${currentTopic.easy?.length || 0})` },
                    { key: 'Medium', label: `🟡 Medium (${currentTopic.medium?.length || 0})` },
                    { key: 'Hard', label: `🔴 Hard (${currentTopic.hard?.length || 0})` },
                  ].map(f => (
                    <button key={f.key} onClick={() => setDiffFilter(f.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all
                        ${diffFilter === f.key 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Status & Search */}
                <div className="flex gap-2 w-full md:w-auto items-center">
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    className="h-9 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold outline-none">
                    <option value="all">Status: All</option>
                    <option value="solved">Status: Solved</option>
                    <option value="unsolved">Status: Unsolved</option>
                  </select>

                  <div className="relative flex-1 md:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search module questions…" value={search} onChange={e => setSearch(e.target.value)}
                      className="pl-9 h-9 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl" />
                  </div>
                </div>

              </div>

              {/* Active Topic Banner */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{currentTopic.icon}</span> {currentTopic.name}
                  </h2>
                  <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-extrabold border-indigo-200 dark:border-indigo-800">
                    {getTopicSolvedCount(currentTopic)} / {(currentTopic.easy?.length||0) + (currentTopic.medium?.length||0) + (currentTopic.hard?.length||0)} Solved
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{currentTopic.description}</p>
              </div>

              {/* Render Problem Sections by Difficulty */}
              <div className="space-y-6">

                {/* Easy Section */}
                {(diffFilter === 'all' || diffFilter === 'Easy') && (
                  <DifficultySection 
                    title="🟢 Easy Placement Problems (10 Fundamentals)" 
                    badgeColor="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                    problems={filteredEasy}
                    solvedSet={solvedSet}
                    onToggle={handleToggle}
                    navigate={navigate}
                  />
                )}

                {/* Medium Section */}
                {(diffFilter === 'all' || diffFilter === 'Medium') && (
                  <DifficultySection 
                    title="🟡 Medium Placement Problems (10 Online Assessments & High Frequency)" 
                    badgeColor="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                    problems={filteredMedium}
                    solvedSet={solvedSet}
                    onToggle={handleToggle}
                    navigate={navigate}
                  />
                )}

                {/* Hard Section */}
                {(diffFilter === 'all' || diffFilter === 'Hard') && (
                  <DifficultySection 
                    title="🔴 Hard Placement Problems (10 MAANG Final Round & Advanced)" 
                    badgeColor="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border-rose-200 dark:border-rose-800"
                    problems={filteredHard}
                    solvedSet={solvedSet}
                    onToggle={handleToggle}
                    navigate={navigate}
                  />
                )}

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// ─── DIFFICULTY SECTION COMPONENT ─────────────────────────────────────────────
function DifficultySection({ title, badgeColor, problems, solvedSet, onToggle, navigate }) {
  if (!problems || !problems.length) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm space-y-0">
      <div className="bg-slate-50 dark:bg-slate-800/80 px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
          {title}
        </h3>
        <Badge className={`text-[10px] font-extrabold ${badgeColor}`}>
          {problems.filter(p => solvedSet.has(String(p.id))).length} / {problems.length} Solved
        </Badge>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {problems.map((p) => {
          const isSolved = solvedSet.has(String(p.id));
          return (
            <div key={p.id} 
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40
                ${isSolved ? 'bg-emerald-50/30 dark:bg-emerald-950/10' : ''}`}>
              
              <div className="flex items-start sm:items-center gap-3">
                <button onClick={() => onToggle(p)}
                  className="mt-0.5 sm:mt-0 transition-transform active:scale-95 shrink-0"
                  title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}>
                  {isSolved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-bold ${isSolved ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                      {p.title}
                    </span>

                    {p.acceptance && (
                      <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {p.acceptance} accept
                      </span>
                    )}
                  </div>

                  {/* Company Badges */}
                  <div className="flex flex-wrap gap-1 items-center">
                    {(p.companies || []).map(c => (
                      <span key={c} className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                        {c}
                      </span>
                    ))}
                    {(p.tags || []).map(t => (
                      <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 justify-end">
                <button onClick={() => navigate(`/playground?problemId=${p.id}`)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                  <Code2 className="w-3.5 h-3.5" /> Playground
                </button>

                {p.leetcodeUrl && (
                  <a href={p.leetcodeUrl} target="_blank" rel="noreferrer"
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                    title="Solve on LeetCode">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {p.youtubeUrl && (
                  <a href={p.youtubeUrl} target="_blank" rel="noreferrer"
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Watch YouTube Solution">
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
