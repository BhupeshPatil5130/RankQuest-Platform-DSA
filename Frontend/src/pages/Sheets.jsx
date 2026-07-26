import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { getSheets, getSolvedProblems } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const Sheets = () => {
  const { user } = useAuth();
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [solvedCountMap, setSolvedCountMap] = useState({});

  useEffect(() => {
    const fetchSheetsData = async () => {
      try {
        setLoading(true);
        const data = await getSheets();
        if (data && Array.isArray(data)) {
          setSheets(data);

          if (user) {
            try {
              const solvedIds = await getSolvedProblems();
              const solvedSet = new Set(solvedIds || []);

              const countMap = {};
              for (const sheet of data) {
                if (sheet.problems && Array.isArray(sheet.problems)) {
                  const count = sheet.problems.filter(p => solvedSet.has(p.id)).length;
                  countMap[sheet.id] = count;
                }
              }
              setSolvedCountMap(countMap);
            } catch (err) {
              console.error('Failed to get sheet solved count:', err);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching sheets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSheetsData();
  }, [user]);

  const filteredSheets = sheets.filter(sheet => 
    sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 subtle-grid">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="border border-zinc-800/80 rounded-2xl bg-zinc-900/60 p-6 md:p-10 backdrop-blur-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Curated SDE Problem Sheets
          </div>
          
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              SDE Sheet Collections
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Handpicked problem collections by industry leaders including Striver SDE Sheet, NeetCode 150, Blind 75, and Love Babbar 450.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-between items-center bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/80">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search sheets by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-zinc-950 border-zinc-800 text-xs h-9 rounded-lg"
            />
          </div>
        </div>

        {/* Sheets Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-56 rounded-xl bg-zinc-900/40 border border-zinc-800 animate-pulse p-5"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSheets.map((sheet) => {
              const solvedCount = solvedCountMap[sheet.id] || 0;
              const totalProblems = sheet.problemCount || sheet.problems?.length || 0;
              const progressPct = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

              return (
                <Card 
                  key={sheet.id}
                  className="bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 transition-all rounded-xl flex flex-col justify-between p-5 space-y-4 group"
                >
                  <CardContent className="p-0 space-y-4 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[11px] border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                          {sheet.author || 'Curated'}
                        </Badge>
                        <span className="text-xs text-zinc-500 font-mono">{totalProblems} Questions</span>
                      </div>

                      <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {sheet.title}
                      </h2>

                      <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                        {sheet.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-zinc-800/80">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-zinc-500">Progress</span>
                        <span className="font-semibold text-emerald-400">{solvedCount} / {totalProblems} Solved</span>
                      </div>
                      <Progress value={progressPct} className="h-1.5 bg-zinc-950" />

                      <Link to={`/sheets/${sheet.id}`} className="block pt-1">
                        <button className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 text-xs font-semibold transition-all">
                          <span>Open SDE Sheet</span>
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

export default Sheets;