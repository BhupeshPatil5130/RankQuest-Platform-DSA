import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, Zap, Activity, Layers, RotateCcw, GitCompare, Share2, 
  GitFork, Scale, Box, Search, Award, GitMerge, Briefcase, Network,
  Sparkles, BookOpen, CheckCircle2, ArrowRight, Compass, ShieldCheck
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { getAllPatterns, getSolvedProblems, getProblemsByPattern } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

// Dynamic Icon Mapping
const iconMap = {
  Target: Target,
  Zap: Zap,
  Activity: Activity,
  Layers: Layers,
  RotateCcw: RotateCcw,
  GitCompare: GitCompare,
  Share2: Share2,
  GitFork: GitFork,
  Scale: Scale,
  Box: Box,
  Search: Search,
  Award: Award,
  GitMerge: GitMerge,
  Briefcase: Briefcase,
  Network: Network
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

          // Calculate solve progress per pattern if user logged in
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
    const matchesSearch = pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pattern.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pattern.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-primary/20 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-4 h-4 animate-spin-slow" />
              Sequential Beginner-to-Advanced Roadmap
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Pattern-Wise DSA Roadmap
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Don't solve randomly. Learn DSA in the optimal sequence (Steps 01 to 15). Master 15 core algorithmic patterns with 10 handpicked problems per pattern—complete with LeetCode & GeeksforGeeks links.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-300 bg-background/50 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                15 Sequential Steps
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300 bg-background/50 px-3 py-1.5 rounded-lg border border-white/10">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                150 Curated Questions
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300 bg-background/50 px-3 py-1.5 rounded-lg border border-white/10">
                <Sparkles className="w-4 h-4 text-amber-400" />
                LeetCode & GFG Links
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-10 pointer-events-none hidden md:block">
            <Target className="w-96 h-96 text-primary" />
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/50 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categoryTiers.map(tier => (
              <button
                key={tier.id}
                onClick={() => setSelectedCategory(tier.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === tier.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]'
                    : 'bg-background/60 text-muted-foreground hover:bg-background hover:text-foreground border border-white/5'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search pattern or concept..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/60 border-white/10 focus:border-primary rounded-xl"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-card/30 border border-white/10 animate-pulse p-6 space-y-4">
                <div className="h-8 w-2/3 bg-white/10 rounded-lg"></div>
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-4 w-4/5 bg-white/5 rounded"></div>
                <div className="h-10 w-full bg-white/10 rounded-xl mt-auto"></div>
              </div>
            ))}
          </div>
        ) : filteredPatterns.length === 0 ? (
          <div className="text-center py-16 bg-card/20 rounded-3xl border border-white/10">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold">No patterns found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search term or category filter.</p>
          </div>
        ) : (
          /* Sequential Pattern Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatterns.map((pattern) => {
              const IconComponent = iconMap[pattern.icon] || Target;
              const solvedCount = patternSolveMap[pattern.slug] || 0;
              const totalProblems = pattern.totalProblems || 10;
              const progressPct = Math.round((solvedCount / totalProblems) * 100);

              return (
                <Card 
                  key={pattern.id}
                  className="group relative overflow-hidden bg-card/60 hover:bg-card/90 border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 rounded-2xl flex flex-col"
                >
                  <CardContent className="p-6 flex flex-col flex-1 justify-between space-y-5">
                    
                    {/* Top Row: Step Badge + Category */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold tracking-wider px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary uppercase">
                        Step {String(pattern.sequenceOrder).padStart(2, '0')}
                      </span>
                      <Badge variant="outline" className="text-xs border-white/10 text-muted-foreground">
                        {pattern.difficulty}
                      </Badge>
                    </div>

                    {/* Header: Icon + Pattern Title */}
                    <div className="flex items-start gap-4">
                      <div className={`p-3.5 rounded-2xl bg-gradient-to-br from-${pattern.colorFrom || 'blue-500'} to-${pattern.colorTo || 'indigo-600'} text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {pattern.name}
                        </h2>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {pattern.category}
                        </p>
                      </div>
                    </div>

                    {/* Pattern Description */}
                    <p className="text-sm text-slate-300/80 line-clamp-3 leading-relaxed">
                      {pattern.description}
                    </p>

                    {/* Progress Bar & Problems Count */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold text-primary">
                          {solvedCount} / {totalProblems} Solved ({progressPct}%)
                        </span>
                      </div>
                      <Progress value={progressPct} className="h-2 bg-secondary" />
                    </div>

                    {/* Action CTA Button */}
                    <Link to={`/patterns/${pattern.slug}`}>
                      <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground font-semibold text-sm transition-all duration-300 group-hover:shadow-md">
                        <span>Practice Pattern</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>

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
