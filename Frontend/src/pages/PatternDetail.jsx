import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, Circle, ExternalLink, Code2, Sparkles, 
  Layers, Target, ShieldCheck, ChevronRight, BookOpen, Search
} from 'lucide-react';
import { getPatternBySlug, getProblemsByPattern, toggleSolveStatus, getSolvedProblems } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

const PatternDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [pattern, setPattern] = useState(null);
  const [problems, setProblems] = useState([]);
  const [solvedIds, setSolvedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patternData, problemsData] = await Promise.all([
          getPatternBySlug(slug),
          getProblemsByPattern(slug)
        ]);

        setPattern(patternData);
        setProblems(problemsData || []);

        if (user) {
          try {
            const solved = await getSolvedProblems();
            setSolvedIds(new Set(solved || []));
          } catch (err) {
            console.error('Failed to fetch solved problems:', err);
          }
        }
      } catch (err) {
        console.error('Error fetching pattern details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, user]);

  const handleToggleSolved = async (problemId) => {
    if (!user) {
      toast({ title: 'Sign In Required', description: 'Please sign in to track your progress.' });
      return;
    }

    try {
      const newSolvedState = !solvedIds.has(problemId);
      await toggleSolveStatus(problemId, newSolvedState);
      
      setSolvedIds(prev => {
        const next = new Set(prev);
        if (newSolvedState) next.add(problemId);
        else next.delete(problemId);
        return next;
      });

      toast({
        title: newSolvedState ? 'Problem Marked Solved!' : 'Problem Unmarked',
        variant: 'success'
      });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update status.', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 max-w-7xl mx-auto space-y-6">
        <div className="h-40 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 animate-pulse"></div>
        <div className="h-96 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 animate-pulse"></div>
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold">Pattern Not Found</h2>
        <Link to="/patterns" className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Roadmaps
        </Link>
      </div>
    );
  }

  const solvedCount = problems.filter(p => solvedIds.has(p.id)).length;
  const progressPct = problems.length ? Math.round((solvedCount / problems.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 subtle-grid transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <Link to="/patterns" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Patterns Roadmap
        </Link>

        {/* Pattern Header Box */}
        <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden p-6 md:p-8 space-y-6 shadow-sm dark:shadow-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 code-font uppercase">
                  Step {String(pattern.sequenceOrder).padStart(2, '0')}
                </span>
                <Badge variant="outline" className="border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">
                  {pattern.difficulty}
                </Badge>
                <span className="text-xs text-zinc-500">{pattern.category}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {pattern.name}
              </h1>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                {pattern.description}
              </p>
            </div>

            {/* Overall Progress Badge */}
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 p-4 rounded-xl min-w-[220px] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Pattern Solved</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{solvedCount} / {problems.length}</span>
              </div>
              <Progress value={progressPct} className="h-2 bg-zinc-200 dark:bg-zinc-900" />
              <p className="text-[11px] text-zinc-500 text-right font-medium">{progressPct}% Completed</p>
            </div>
          </div>

          {/* Strategy Formula Card */}
          {pattern.strategyPattern && (
            <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 p-4 md:p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" /> Strategy & Recognition Formula
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {pattern.strategyPattern}
              </p>
              {pattern.keyIdentifiers && (
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-300">Key Triggers:</span> {pattern.keyIdentifiers}
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Problems List Table */}
        <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden p-6 space-y-4 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Curated Problem Set (10 Questions)</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">Solve questions on LeetCode / GFG or directly in RankQuest Playground</p>
            </div>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
            {problems.map((problem, index) => {
              const isSolved = solvedIds.has(problem.id);
              
              return (
                <div 
                  key={problem.id}
                  className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 px-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <button 
                      onClick={() => handleToggleSolved(problem.id)}
                      className="text-zinc-400 hover:text-emerald-500 transition-colors"
                      title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                    >
                      {isSolved ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-400 dark:text-zinc-600" />
                      )}
                    </button>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">#{index + 1}</span>
                        <h3 className={`text-sm font-semibold ${isSolved ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
                          {problem.title}
                        </h3>
                        <Badge variant="outline" className={`text-[10px] ${
                          problem.difficulty === 'Easy' ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' :
                          problem.difficulty === 'Medium' ? 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10' :
                          'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10'
                        }`}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Problem Action Links */}
                  <div className="flex items-center gap-2 shrink-0">
                    {problem.leetcodeUrl && (
                      <a 
                        href={problem.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        LeetCode <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {problem.gfgUrl && (
                      <a 
                        href={problem.gfgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        GFG <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    <Link to={`/playground?problem=${problem.id}`}>
                      <button className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                        Solve In App <Code2 className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatternDetail;
