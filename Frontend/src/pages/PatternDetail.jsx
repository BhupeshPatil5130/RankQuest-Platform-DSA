import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, Circle, ExternalLink, Building2, Tag, Loader2,
  Bookmark, Target, Zap, Activity, Layers, RotateCcw, GitCompare, Share2,
  GitFork, Scale, Box, Search, Award, GitMerge, Briefcase, Network, Code2, Sparkles, Check
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { getPatternBySlug, getProblemsByPattern, getSolvedProblems, submitSolution } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const iconMap = {
  Target, Zap, Activity, Layers, RotateCcw, GitCompare, Share2,
  GitFork, Scale, Box, Search, Award, GitMerge, Briefcase, Network
};

const PatternDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pattern, setPattern] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solvedSet, setSolvedSet] = useState(new Set());
  const [bookmarkedSet, setBookmarkedSet] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const patternData = await getPatternBySlug(slug);
        const problemData = await getProblemsByPattern(slug);

        if (patternData) {
          setPattern(patternData.data || patternData);
        }
        if (problemData && Array.isArray(problemData)) {
          setProblems(problemData);
        }

        // Fetch user solved problems if logged in
        if (user) {
          const solvedIds = await getSolvedProblems();
          setSolvedSet(new Set(solvedIds || []));
        }

        // Load bookmarks from local storage
        const savedBm = localStorage.getItem(`rankquest_bm_${slug}`);
        if (savedBm) {
          setBookmarkedSet(new Set(JSON.parse(savedBm)));
        }

      } catch (err) {
        console.error('Error fetching pattern details:', err);
        toast({ title: 'Error', description: 'Failed to load pattern details.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, user]);

  const toggleSolve = async (problemId) => {
    if (!user) {
      toast({ title: 'Login Required', description: 'Please login to track solved problems.', variant: 'destructive' });
      return;
    }

    const isSolved = solvedSet.has(problemId);
    const newSolved = new Set(solvedSet);
    
    if (isSolved) {
      newSolved.delete(problemId);
    } else {
      newSolved.add(problemId);
    }
    setSolvedSet(newSolved);

    try {
      await submitSolution(problemId, {
        language: 'java',
        code: '// Solved directly from Pattern Roadmap',
        verdict: 'ACCEPTED',
        executionTimeMs: 10,
        memoryUsedKb: 256
      });
      toast({ 
        title: isSolved ? 'Marked Unsolved' : 'Problem Solved! 🎉', 
        description: isSolved ? 'Progress updated.' : 'Great job! Keep grinding.',
        variant: isSolved ? 'default' : 'success'
      });
    } catch (err) {
      console.error('Error recording submission:', err);
    }
  };

  const toggleBookmark = (problemId) => {
    const newBm = new Set(bookmarkedSet);
    if (newBm.has(problemId)) {
      newBm.delete(problemId);
    } else {
      newBm.add(problemId);
    }
    setBookmarkedSet(newBm);
    localStorage.setItem(`rankquest_bm_${slug}`, JSON.stringify(Array.from(newBm)));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <h2 className="text-2xl font-bold mb-2">Pattern Not Found</h2>
        <Link to="/patterns">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Roadmap</Button>
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[pattern.icon] || Target;
  const solvedCount = problems.filter(p => solvedSet.has(p.id)).length;
  const totalCount = problems.length || 10;
  const progressPct = Math.round((solvedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link to="/patterns" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Pattern Roadmap
        </Link>

        {/* Pattern Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-card border border-white/10 p-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="flex items-start gap-5">
              <div className={`p-4 rounded-2xl bg-gradient-to-br from-${pattern.colorFrom || 'blue-500'} to-${pattern.colorTo || 'indigo-600'} text-white shadow-lg shrink-0`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase">
                    Step {String(pattern.sequenceOrder).padStart(2, '0')} of 15
                  </span>
                  <Badge variant="outline" className="border-white/10 text-muted-foreground">
                    {pattern.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary">
                    {pattern.difficulty}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold">{pattern.name}</h1>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
                  {pattern.description}
                </p>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-background/60 border border-white/10 p-5 rounded-2xl shrink-0 min-w-[240px] space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Pattern Progress</span>
                <span className="font-bold text-primary">{solvedCount} / {totalCount} ({progressPct}%)</span>
              </div>
              <Progress value={progressPct} className="h-2.5" />
              <p className="text-xs text-muted-foreground text-center">
                {progressPct === 100 ? '🎉 Pattern Mastered!' : `${totalCount - solvedCount} problems remaining`}
              </p>
            </div>
          </div>

          {/* Key Strategy Formula Box */}
          {pattern.keyStrategy && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-primary flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" /> When to Use & Strategy Formula:
              </h3>
              <pre className="text-xs md:text-sm font-mono bg-background/80 p-4 rounded-xl border border-white/5 text-slate-300 whitespace-pre-wrap leading-relaxed">
                {pattern.keyStrategy}
              </pre>
            </div>
          )}
        </div>

        {/* 10 Curated Problems Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" /> Curated Pattern Problems ({problems.length})
            </h2>
            <span className="text-xs text-muted-foreground">Click checkboxes to mark progress</span>
          </div>

          <div className="bg-card rounded-2xl border border-white/10 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4 text-center w-12">Status</th>
                    <th className="py-4 px-4 text-center w-12">★</th>
                    <th className="py-4 px-6">Problem</th>
                    <th className="py-4 px-4">Companies</th>
                    <th className="py-4 px-4">Difficulty</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {problems.map((problem, idx) => {
                    const isSolved = solvedSet.has(problem.id);
                    const isBookmarked = bookmarkedSet.has(problem.id);

                    return (
                      <tr key={problem.id} className="hover:bg-white/[0.02] transition-colors group">
                        
                        {/* Solved Checkbox */}
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => toggleSolve(problem.id)}
                            className="text-muted-foreground hover:text-emerald-400 transition-colors focus:outline-none"
                            title={isSolved ? "Mark unsolved" : "Mark solved"}
                          >
                            {isSolved ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                            ) : (
                              <Circle className="w-5 h-5 opacity-40 hover:opacity-100" />
                            )}
                          </button>
                        </td>

                        {/* Bookmark Button */}
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => toggleBookmark(problem.id)}
                            className="text-muted-foreground hover:text-amber-400 transition-colors focus:outline-none"
                            title={isBookmarked ? "Bookmarked" : "Bookmark problem"}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-amber-400 fill-amber-400' : 'opacity-40 hover:opacity-100'}`} />
                          </button>
                        </td>

                        {/* Problem Title & Description */}
                        <td className="py-4 px-6">
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                            <span>{idx + 1}. {problem.title}</span>
                          </div>
                          {problem.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 font-normal">
                              {problem.description}
                            </p>
                          )}
                        </td>

                        {/* Company Tags */}
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {problem.companies ? (
                              problem.companies.split(',').slice(0, 2).map((comp, i) => (
                                <Badge key={i} variant="outline" className="text-[10px] bg-secondary/50 border-white/5">
                                  {comp.trim()}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </div>
                        </td>

                        {/* Difficulty Badge */}
                        <td className="py-4 px-4">
                          <Badge className={
                            problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }>
                            {problem.difficulty}
                          </Badge>
                        </td>

                        {/* External Action Links (LeetCode & GFG) */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            
                            {/* LeetCode Button */}
                            {problem.leetcodeUrl ? (
                              <a
                                href={problem.leetcodeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold transition-all hover:scale-105"
                                title="Solve on LeetCode"
                              >
                                LeetCode <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : null}

                            {/* GFG Button */}
                            {problem.gfgUrl ? (
                              <a
                                href={problem.gfgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all hover:scale-105"
                                title="Solve on GeeksforGeeks"
                              >
                                GFG <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : null}

                            {/* In-App Playground Solver */}
                            <Link to={`/problem/${problem.id}`}>
                              <Button size="sm" variant="secondary" className="h-8 text-xs gap-1">
                                <Code2 className="w-3.5 h-3.5" /> Solve
                              </Button>
                            </Link>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatternDetail;
