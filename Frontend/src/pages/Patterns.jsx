import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, Zap, Activity, Layers, RotateCcw, GitCompare, Share2, 
  GitFork, Scale, Box, Search, Award, GitMerge, Briefcase, Network,
  Sparkles, BookOpen, ArrowRight, Compass, ShieldCheck
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { getAllPatterns, getSolvedProblems, getProblemsByPattern } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const iconMap = {
  Target, Zap, Activity, Layers, RotateCcw, GitCompare, Share2, 
  GitFork, Scale, Box, Search, Award, GitMerge, Briefcase, Network
};

const categoryTiers = [
  { id: 'All', label: 'All Tiers' },
  { id: 'Beginner Foundations', label: 'Step 1: Beginner Foundations' },
  { id: 'Intermediate Techniques', label: 'Step 2: Intermediate Techniques' },
  { id: 'Advanced Algorithmic Mastery', label: 'Step 3: Advanced Mastery' }
];

const Patterns = () => {
  const { user } = useAuth();
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [patternSolveMap, setPatternSolveMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllPatterns();
        if (data && Array.isArray(data)) {
          setPatterns(data);

          if (user) {
            try {
              const solvedIds = await getSolvedProblems();
              const solvedSet = new Set(solvedIds || []);
              
              const solveMap = {};
              for (const pattern of data) {
                const problems = await getProblemsByPattern(pattern.slug);
                if (problems && Array.isArray(problems)) {
                  const solvedCount = problems.filter(p => solvedSet.has(p.id)).length;
                  solveMap[pattern.slug] = solvedCount;
                }
              }
              setPatternSolveMap(solveMap);
            } catch (err) {
              console.error('Failed to fetch solved problems for patterns:', err);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching patterns:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredPatterns = patterns.filter(pattern => {
    if (!pattern) return false;
    const term = (searchTerm || '').toLowerCase();
    const matchesSearch = (pattern.name || '').toLowerCase().includes(term) ||
                          (pattern.description || '').toLowerCase().includes(term) ||
                          (pattern.category || '').toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'All' || pattern.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 subtle-grid transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero Section */}
        <div className="border border-zinc-200 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900/60 p-6 md:p-10 backdrop-blur-sm space-y-4 shadow-sm dark:shadow-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Sequential Learning Path (Steps 01 to 15)
          </div>
          
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Pattern-Wise DSA Roadmap
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              Learn algorithms in the proven order of difficulty. Master 15 core patterns with 10 handpicked questions per pattern, linked directly to LeetCode and GeeksforGeeks.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              15 Sequential Steps
            </div>
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              150 Handpicked Problems
            </div>
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              LeetCode & GFG Integration
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm dark:shadow-none">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categoryTiers.map(tier => (
              <button
                key={tier.id}
                onClick={() => setSelectedCategory(tier.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === tier.id
                    ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white font-semibold border border-zinc-700 shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <Input
              type="text"
              placeholder="Search pattern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs h-9 rounded-lg"
            />
          </div>
        </div>

        {/* Pattern Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-56 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 animate-pulse p-5"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPatterns.map((pattern) => {
              const IconComponent = iconMap[pattern.icon] || Target;
              const solvedCount = patternSolveMap[pattern.slug] || 0;
              const totalProblems = pattern.totalProblems || 10;
              const progressPct = Math.round((solvedCount / totalProblems) * 100);

              return (
                <Card 
                  key={pattern.id}
                  className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all rounded-xl flex flex-col justify-between group p-5 space-y-4 shadow-sm dark:shadow-none"
                >
                  <CardContent className="p-0 space-y-4 flex-1 flex flex-col justify-between">
                    
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 code-font uppercase">
                          Step {String(pattern.sequenceOrder).padStart(2, '0')}
                        </span>
                        <Badge variant="outline" className="text-[11px] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {pattern.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:border-indigo-400 transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {pattern.name}
                          </h2>
                          <p className="text-[11px] text-zinc-500 mt-0.5">
                            {pattern.category}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {pattern.description}
                      </p>
                    </div>

                    {/* Progress & CTA */}
                    <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-zinc-500">Progress</span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {solvedCount} / {totalProblems} Solved ({progressPct}%)
                        </span>
                      </div>
                      <Progress value={progressPct} className="h-1.5 bg-zinc-100 dark:bg-zinc-950" />

                      <Link to={`/patterns/${pattern.slug}`} className="block pt-1">
                        <button className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 text-xs font-semibold transition-all">
                          <span>Practice Pattern</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>

                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Patterns;
