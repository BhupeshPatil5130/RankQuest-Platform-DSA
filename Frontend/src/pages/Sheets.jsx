import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code, Users, Star, Filter, Search, BookOpen, TrendingUp, ArrowRight, Sparkles, Zap, Target, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { getSolvedProblems, getAllSheets, getAllProblems } from '../services/apiService'
import { useAuth } from '../contexts/AuthContext'

const sheetIconMap = {
  'striver-sde': Code,
  'love-babbar-450': Sparkles,
  'neetcode-150': Zap,
  'blind-75': Target,
  'gfg-must-do': BookOpen,
  'apna-college': Star,
};

const sheetColorMap = {
  'striver-sde': 'from-blue-600 to-indigo-600',
  'love-babbar-450': 'from-violet-600 to-purple-600',
  'neetcode-150': 'from-emerald-500 to-teal-600',
  'blind-75': 'from-red-500 to-orange-600',
  'gfg-must-do': 'from-green-600 to-emerald-700',
  'apna-college': 'from-cyan-500 to-blue-500',
};

const Sheets = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [sheetsList, setSheetsList] = useState([])
  const [solvedSet, setSolvedSet] = useState(new Set())
  const [sheetProblemMap, setSheetProblemMap] = useState({})

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [sheetsData, problemsData, solvedIds] = await Promise.allSettled([
          getAllSheets(),
          getAllProblems(),
          user ? getSolvedProblems() : Promise.resolve([]),
        ]);

        if (solvedIds.status === 'fulfilled' && solvedIds.value) {
          setSolvedSet(new Set(solvedIds.value));
        }

        let fetchedProblems = [];
        if (problemsData.status === 'fulfilled' && problemsData.value) {
          fetchedProblems = Array.isArray(problemsData.value) ? problemsData.value : (problemsData.value.data || []);
        }

        // Build problem list map per sheet
        const map = {};
        fetchedProblems.forEach(p => {
          if (!map[p.sheetSlug]) map[p.sheetSlug] = [];
          map[p.sheetSlug].push(p.id);
        });
        setSheetProblemMap(map);

        if (sheetsData.status === 'fulfilled' && sheetsData.value) {
          const apiSheets = Array.isArray(sheetsData.value) ? sheetsData.value : (sheetsData.value.data || []);
          if (apiSheets.length > 0) {
            setSheetsList(apiSheets);
          }
        }
      } catch (err) {
        console.error("Failed to load sheets data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Fallback sheet list if API returns empty
  const fallbackSheets = [
    { slug: 'striver-sde', name: 'Striver SDE Sheet', author: 'Raj Vikramaditya', description: 'The ultimate roadmap for SDE roles. Covers every major topic needed for top-tier interviews.', totalProblems: 190, difficulty: 'Hard', category: 'Interview Prep', rating: 4.9 },
    { slug: 'love-babbar-450', name: 'Love Babbar 450', author: 'Love Babbar', description: 'A comprehensive list of 450 problems to build a rock-solid foundation in DSA.', totalProblems: 450, difficulty: 'Mixed', category: 'Complete DSA', rating: 4.8 },
    { slug: 'neetcode-150', name: 'NeetCode 150', author: 'NeetCode', description: 'Highly curated list focusing on patterns. The most efficient way to learn.', totalProblems: 150, difficulty: 'Medium', category: 'LeetCode', rating: 4.7 },
    { slug: 'blind-75', name: 'Blind 75', author: 'Blind Community', description: 'The legendary list. 75 most asked questions at FAANG companies.', totalProblems: 75, difficulty: 'Hard', category: 'FAANG Prep', rating: 4.9 },
    { slug: 'gfg-must-do', name: 'GFG Must Do', author: 'GeeksforGeeks', description: 'Essential problems for campus placements and service-based companies.', totalProblems: 100, difficulty: 'Easy', category: 'Placement', rating: 4.6 },
    { slug: 'apna-college', name: 'Apna College DSA', author: 'Shradha Khapra', description: 'Beginner friendly sheet with excellent explanations for every problem.', totalProblems: 120, difficulty: 'Easy', category: 'Beginner', rating: 4.5 }
  ];

  const activeSheets = sheetsList.length > 0 ? sheetsList : fallbackSheets;

  const categories = ['all', 'Interview Prep', 'Complete DSA', 'Pattern Based', 'FAANG Prep', 'Placement Prep', 'Beginner Friendly']
  const difficulties = ['all', 'Easy', 'Medium', 'Hard', 'Mixed']

  const filteredSheets = activeSheets.filter(sheet => {
    const name = sheet.name || sheet.title || '';
    const author = sheet.author || '';
    const diff = sheet.difficulty || 'Mixed';
    const cat = sheet.category || 'Interview Prep';

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'all' || diff === selectedDifficulty
    const matchesCategory = selectedCategory === 'all' || cat === selectedCategory
    return matchesSearch && matchesDifficulty && matchesCategory
  });

  const getSheetSolvedCount = (slug) => {
    const problemIds = sheetProblemMap[slug] || [];
    return problemIds.filter(id => solvedSet.has(id)).length;
  };

  const getSheetTotalProblems = (sheet) => {
    const fromMap = (sheetProblemMap[sheet.slug] || []).length;
    return fromMap > 0 ? fromMap : (sheet.totalProblems || 50);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading DSA sheets from API...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className={`text-center mb-16 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span>Curated by Experts</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Master Data Structures <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                & Algorithms
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose your path to mastery with hand-picked DSA sheets directly synced from our Spring Boot API.
            </p>
          </div>

          <div className={`max-w-5xl mx-auto mb-12 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="p-2 bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search sheets..."
                  className="pl-12 h-12 bg-transparent border-transparent focus:bg-background/50 rounded-xl text-lg transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 px-2">
                 <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <select 
                      className="h-12 pl-10 pr-8 bg-background/80 border border-white/10 rounded-xl appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/50 font-medium text-sm min-w-[140px]"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(c => <option key={c} value={c} className="bg-background">{c === 'all' ? 'All Categories' : c}</option>)}
                    </select>
                 </div>
                 <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                     <select 
                      className="h-12 pl-10 pr-8 bg-background/80 border border-white/10 rounded-xl appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/50 font-medium text-sm min-w-[140px]"
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                    >
                      {difficulties.map(d => <option key={d} value={d} className="bg-background">{d === 'all' ? 'All Difficulties' : d}</option>)}
                    </select>
                 </div>
              </div>
            </div>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${mounted ? 'animate-stagger-in' : 'opacity-0'}`}>
            {filteredSheets.map((sheet) => {
               const slug = sheet.slug || sheet.id;
               const total = getSheetTotalProblems(sheet);
               const solved = getSheetSolvedCount(slug);
               const progress = total > 0 ? Math.round((solved / total) * 100) : 0;
               const SheetIcon = sheetIconMap[slug] || Code;
               const colorGrad = sheetColorMap[slug] || 'from-blue-600 to-indigo-600';

               return (
              <Link key={slug} to={`/sheets/${slug}`} className="group block h-full">
                <Card className="h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:-translate-y-1 shadow-lg overflow-hidden flex flex-col">
                  
                  <div className={`h-2 w-full bg-gradient-to-r ${colorGrad}`}></div>
                  
                  <CardHeader className="pb-4 relative">
                    <div className="flex justify-between items-start mb-2">
                       <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorGrad} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <SheetIcon className="h-6 w-6" />
                       </div>
                       {progress > 0 && (
                         <Badge className="bg-primary/10 text-primary border-primary/20">
                           {progress === 100 ? 'Completed' : 'In Progress'}
                         </Badge>
                       )}
                    </div>
                    
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {sheet.name}
                    </CardTitle>
                    <div className="text-sm font-medium text-muted-foreground mt-1">
                      by <span className="text-foreground">{sheet.author}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col gap-6">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {sheet.description}
                    </p>

                    <div className="mt-auto space-y-3">
                       <div className="flex justify-between text-sm font-medium">
                          <span className="text-muted-foreground">Progress</span>
                          <span className={progress === 100 ? "text-green-400" : "text-foreground"}>
                            {progress}%
                          </span>
                       </div>
                       <Progress value={progress} className="h-2" />
                       <div className="flex justify-between text-xs text-muted-foreground pt-1">
                          <span>{solved} / {total} Solved</span>
                       </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex items-center justify-between text-sm">
                       <div className="flex gap-3">
                          <div className="flex items-center gap-1 text-yellow-500 font-medium">
                             <Star className="w-3.5 h-3.5 fill-current" /> {sheet.rating || '4.8'}
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          Explore Sheet <ArrowRight className="w-3 h-3 ml-1" />
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )})}
          </div>

          {filteredSheets.length === 0 && (
            <div className="text-center py-20">
              <div className="p-6 bg-muted/30 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No sheets found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
              <Button 
                variant="link" 
                onClick={() => {setSearchTerm(''); setSelectedCategory('all'); setSelectedDifficulty('all')}}
                className="mt-4 text-primary"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sheets