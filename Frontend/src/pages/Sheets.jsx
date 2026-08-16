import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Sparkles, GraduationCap, Flame } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { getSheets, getSolvedProblems } from '../services/apiService';
import { mockSheets } from '../services/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function Sheets() {
  const { user } = useAuth();
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [solvedCountMap, setSolvedCountMap] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await getSheets();
        if (data?.length) {
          setSheets(data);
          if (user) {
            const ids = await getSolvedProblems().catch(() => []);
            const s = new Set(ids || []);
            const m = {};
            for (const sh of data) {
              if (sh.problems?.length) m[sh.id] = sh.problems.filter((p) => s.has(p.id)).length;
            }
            setSolvedCountMap(m);
          }
        } else {
          setSheets(mockSheets);
        }
      } catch {
        setSheets(mockSheets);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const filtered = sheets.filter(
    (sh) =>
      (sh.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (sh.description || '').toLowerCase().includes(search.toLowerCase()) ||
      (sh.author || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Curated SDE Problem Sheets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Handpicked interview sheets — Striver SDE, NeetCode 150, Blind 75, Love Babbar, and more.
          </p>
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search sheets or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
          />
        </div>
      </div>

      {/* Featured Placement Callout Banner */}
      <div className="workspace-card p-5 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-200/60 dark:border-indigo-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase">
              🔥 Featured Prep
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              10x10 Data Structure Interview Master Sheet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Arrays, Linked Lists, Trees, Graphs, DP — 10 Easy, 10 Medium, 10 Hard per topic.
            </p>
          </div>
        </div>

        <Link
          to="/placement"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all shrink-0"
        >
          Open Master Sheet <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sheet Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((sheet) => {
            const solved = solvedCountMap[sheet.id] || 0;
            const total = sheet.problemCount || sheet.problems?.length || 0;
            const pct = total ? Math.round((solved / total) * 100) : 0;

            return (
              <div
                key={sheet.id}
                className="workspace-card-hover p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {sheet.author || 'Curated'}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 code-font">{total} Questions</span>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {sheet.title}
                      </h2>
                      <p className="text-xs text-slate-400 truncate">
                        {sheet.problems?.length || sheet.problemCount} Curated Questions
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {sheet.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>Solved</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {solved} / {total} ({pct}%)
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-emerald-500" />
                  <Link to={`/sheets/${sheet.id}`}>
                    <button className="w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-600 text-slate-700 dark:text-slate-300 hover:text-white text-xs font-bold transition-all duration-200 border border-slate-200 dark:border-slate-700/80 hover:border-transparent">
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
  );
}