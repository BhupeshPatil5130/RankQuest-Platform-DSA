import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Sparkles } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { getSheets, getSolvedProblems } from '../services/apiService';
import { mockSheets } from '../services/mockData';
import { useAuth } from '../contexts/AuthContext';

const sheetColors = [
  { border: 'border-indigo-200 dark:border-indigo-800/60', grad: 'from-indigo-500 to-purple-600', badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800', bar: '[&>div]:from-indigo-400 [&>div]:to-purple-500' },
  { border: 'border-emerald-200 dark:border-emerald-800/60', grad: 'from-emerald-500 to-teal-600', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800', bar: '[&>div]:from-emerald-400 [&>div]:to-teal-500' },
  { border: 'border-amber-200 dark:border-amber-800/60', grad: 'from-amber-500 to-orange-600', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800', bar: '[&>div]:from-amber-400 [&>div]:to-orange-500' },
  { border: 'border-pink-200 dark:border-pink-800/60', grad: 'from-pink-500 to-rose-600', badge: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400 border-pink-200 dark:border-pink-800', bar: '[&>div]:from-pink-400 [&>div]:to-rose-500' },
  { border: 'border-cyan-200 dark:border-cyan-800/60', grad: 'from-cyan-500 to-blue-600', badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800', bar: '[&>div]:from-cyan-400 [&>div]:to-blue-500' },
  { border: 'border-violet-200 dark:border-violet-800/60', grad: 'from-violet-500 to-fuchsia-600', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400 border-violet-200 dark:border-violet-800', bar: '[&>div]:from-violet-400 [&>div]:to-fuchsia-500' },
];

export default function Sheets() {
  const { user } = useAuth();
  const [sheets,  setSheets]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [solvedCountMap, setSolvedCountMap] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await getSheets();
        if (data?.length) {
          setSheets(data);
          if (user) {
            const ids = await getSolvedProblems().catch(() => []);
            const s   = new Set(ids || []);
            const m   = {};
            for (const sh of data) {
              if (sh.problems?.length) m[sh.id] = sh.problems.filter(p => s.has(p.id)).length;
            }
            setSolvedCountMap(m);
          }
        } else {
          // Backend returned no sheets — use expanded mock catalog
          setSheets(mockSheets);
        }
      } catch {
        // Network error — use expanded mock catalog
        setSheets(mockSheets);
      } finally { setLoading(false); }
    })();
  }, [user]);

  const filtered = sheets.filter(sh =>
    (sh.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (sh.description || '').toLowerCase().includes(search.toLowerCase()) ||
    (sh.author || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-7 md:p-10 shadow-xl shadow-emerald-500/20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" /> {sheets.length}+ Curated SDE Problem Sheets
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">SDE Sheet Collections</h1>
          <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
            Handpicked problem collections — Placement 10x10 Master Sheet, Striver SDE Sheet, NeetCode 150, Blind 75, Love Babbar 450, GFG Must-Do, Apna College, Grind 75 and more.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-white font-semibold">
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg"><Sparkles className="w-4 h-4 text-yellow-300" /> {sheets.reduce((a, s) => a + (s.problemCount || 0), 0)}+ Problems</div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg"><BookOpen className="w-4 h-4 text-emerald-300" /> {sheets.length} Sheets</div>
          </div>
        </div>

        {/* Featured Placement Master Sheet Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider">
              🔥 Featured Placement Special
            </div>
            <h2 className="text-xl md:text-2xl font-black">10x10 Data Structure Interview Master Sheet</h2>
            <p className="text-xs text-indigo-100 max-w-xl">
              Covers all Data Structures (Arrays, Linked Lists, Trees, Graphs, DP, Tries, etc.) with 10 Easy, 10 Medium, and 10 Hard questions per topic!
            </p>
          </div>
          <Link to="/placement" 
            className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-extrabold text-xs shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2">
            Explore Placement Prep <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Search */}
        <div className="flex justify-end bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search sheets…" value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg" />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((sheet, idx) => {
              const c      = sheetColors[idx % sheetColors.length];
              const solved = solvedCountMap[sheet.id] || 0;
              const total  = sheet.problemCount || sheet.problems?.length || 0;
              const pct    = total ? Math.round((solved / total) * 100) : 0;
              return (
                <div key={sheet.id}
                  className={`group bg-white dark:bg-slate-900 border-2 ${c.border} rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${c.badge}`}>{sheet.author || 'Curated'}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 code-font">{total} Qs</span>
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center shadow-md`}>
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{sheet.title}</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">{sheet.description}</p>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{solved} / {total}</span>
                    </div>
                    <Progress value={pct} className={`h-1.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-gradient-to-r ${c.bar}`} />
                    <Link to={`/sheets/${sheet.id}`}>
                      <button className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r ${c.grad} text-white text-xs font-bold shadow-md hover:opacity-90 hover:scale-[1.02] transition-all`}>
                        Open Sheet <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}