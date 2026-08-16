import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, CheckCircle, Circle, Search, Play, StickyNote, X, Save, 
  Bookmark, ExternalLink, Building2, Tag, Loader2
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../hooks/useToast'
import { getSolvedProblems, getProblemsBySheet, getSheetBySlug } from '../services/apiService'
import { mockSheets, getProblemsBySheet as getMockProblemsBySheet } from '../services/mockData'

// Notes stored in localStorage per problem
const getNoteKey = (problemId) => `rankquest_note_${problemId}`;

const NoteModal = ({ problem, onClose }) => {
  const [note, setNote] = useState(() => localStorage.getItem(getNoteKey(problem.id)) || '');
  const { toast } = useToast();

  const handleSave = () => {
    if (note.trim()) {
      localStorage.setItem(getNoteKey(problem.id), note.trim());
    } else {
      localStorage.removeItem(getNoteKey(problem.id));
    }
    toast({ title: 'Note saved!', description: `Notes for "${problem.title}" have been saved.`, variant: 'success' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-background border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">Problem Notes</h3>
            <p className="text-sm text-muted-foreground truncate max-w-[300px]">{problem.title}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add your notes, approach, or key insights here..."
          className="w-full h-48 p-4 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
          autoFocus
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4" /> Save Note
          </Button>
        </div>
      </div>
    </div>
  );
};

// Fallback problems are imported from the shared mockData service (150+ problems).

const SheetDetail = () => {
  const { sheetId } = useParams()
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  
  const [solvedProblems, setSolvedProblems] = useState(new Set())
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem('rankquest_bookmarks') || '[]'))
  
  const [isLoading, setIsLoading] = useState(true)
  const [sheetInfo, setSheetInfo] = useState(null)
  const [problems, setProblems] = useState([])
  const [noteModal, setNoteModal] = useState(null)

  // Fetch sheet info + problems from backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [sheetRes, problemsRes] = await Promise.allSettled([
          getSheetBySlug(sheetId),
          getProblemsBySheet(sheetId),
        ]);

        if (sheetRes.status === 'fulfilled' && sheetRes.value) {
          const sheet = sheetRes.value.data || sheetRes.value;
          setSheetInfo(sheet);
        }

        if (problemsRes.status === 'fulfilled' && problemsRes.value) {
          const probs = problemsRes.value.data || problemsRes.value;
          if (Array.isArray(probs) && probs.length > 0) {
            setProblems(probs);
          }
        }
      } catch (err) {
        console.error('Failed to fetch sheet data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sheetId]);

  // Fetch solved problems if user is logged in
  useEffect(() => {
    const fetchSolved = async () => {
      if (!user) return;
      try {
        const solvedIds = await getSolvedProblems();
        if (solvedIds) setSolvedProblems(new Set(solvedIds));
      } catch (error) {
        console.error("Failed to fetch solved problems", error);
      }
    };
    fetchSolved();
  }, [user]);

  const toggleBookmark = (problemId) => {
    const pId = Number(problemId);
    let updated;
    if (bookmarks.includes(pId)) {
      updated = bookmarks.filter(id => id !== pId);
      toast({ title: 'Removed from Revision List', variant: 'default' });
    } else {
      updated = [...bookmarks, pId];
      toast({ title: 'Bookmarked for Revision! ⭐', variant: 'success' });
    }
    setBookmarks(updated);
    localStorage.setItem('rankquest_bookmarks', JSON.stringify(updated));
  };

  // Fallback sheet metadata — sourced from shared mockData (8 sheets)
  const sheetGradients = {
    'striver-sde':       'bg-gradient-to-r from-blue-500 to-indigo-600',
    'love-babbar-450':   'bg-gradient-to-r from-purple-500 to-violet-600',
    'neetcode-150':      'bg-gradient-to-r from-emerald-500 to-teal-600',
    'blind-75':          'bg-gradient-to-r from-rose-500 to-red-600',
    'gfg-must-do':       'bg-gradient-to-r from-orange-500 to-amber-600',
    'apna-college':      'bg-gradient-to-r from-teal-500 to-cyan-600',
    'leetcode-top-150':  'bg-gradient-to-r from-yellow-500 to-orange-500',
    'grind-75':          'bg-gradient-to-r from-pink-500 to-rose-600',
  };

  const mockSheetMeta = mockSheets.find(s => s.id === sheetId);
  const currentSheet = sheetInfo || mockSheetMeta || mockSheets[0];
  const sheetColor = sheetGradients[sheetId] || 'bg-gradient-to-r from-blue-500 to-indigo-600';

  // Backend-first: use API data; fallback to the shared 150-problem mock catalog
  const sheetProblems = problems.length > 0
    ? problems
    : getMockProblemsBySheet(sheetId).map(p => ({
        ...p,
        companies: Array.isArray(p.companies) ? p.companies.join(', ') : p.companies,
      }));

  const solvedInSheet = sheetProblems.filter(p => solvedProblems.has(p.id)).length;
  const totalInSheet = sheetProblems.length;
  const progress = totalInSheet > 0 ? Math.round((solvedInSheet / totalInSheet) * 100) : 0;

  // Extract filter options
  const topics = ['all', ...new Set(sheetProblems.map(p => p.topic).filter(Boolean))];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  const allCompanies = ['all', ...new Set(sheetProblems.flatMap(p => p.companies ? p.companies.split(',').map(c => c.trim()) : []).filter(Boolean))];
  const statuses = ['all', 'solved', 'unsolved', 'bookmarked'];

  const filteredProblems = sheetProblems.filter(problem => {
    const matchesSearch = (problem.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
                         (problem.topic || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
                         (problem.companies || '').toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesTopic = selectedTopic === 'all' || problem.topic === selectedTopic;
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesCompany = selectedCompany === 'all' || (problem.companies && problem.companies.includes(selectedCompany));
    
    const isSolved = solvedProblems.has(problem.id);
    const isBm = bookmarks.includes(Number(problem.id));
    const matchesStatus = selectedStatus === 'all' ||
                         (selectedStatus === 'solved' && isSolved) ||
                         (selectedStatus === 'unsolved' && !isSolved) ||
                         (selectedStatus === 'bookmarked' && isBm);
                         
    return matchesSearch && matchesTopic && matchesDifficulty && matchesCompany && matchesStatus;
  });

  const difficultyBadge = (diff) => {
    const cfg = {
      Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      Hard: 'bg-red-500/10 text-red-400 border-red-500/30',
    };
    return cfg[diff] || 'bg-white/5 text-gray-400 border-white/10';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading sheet details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Notes Modal */}
      {noteModal && (
        <NoteModal problem={noteModal} onClose={() => setNoteModal(null)} />
      )}

      <div>
        <Button variant="ghost" className="mb-4 gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white" onClick={() => navigate('/sheets')}>
          <ArrowLeft className="h-4 w-4" /> Back to Sheets
        </Button>

        {/* Sheet Header */}
        <Card className="overflow-hidden mb-8 border-0 shadow-2xl">
          <div className={`${sheetColor} px-8 py-12 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">{currentSheet.name}</h1>
              <p className="text-xl opacity-90 mb-2">by {currentSheet.author}</p>
              <p className="text-base opacity-80 max-w-3xl">{currentSheet.description}</p>
            </div>
          </div>
          <CardContent className="p-8 glass-dark">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-primary mb-1">{solvedInSheet}/{totalInSheet}</div>
                <div className="text-muted-foreground text-sm">Problems Solved</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{progress}%</div>
                <div className="text-muted-foreground text-sm">Completion</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-purple-400 mb-1">{bookmarks.length}</div>
                <div className="text-muted-foreground text-sm">Bookmarked for Revision</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Overall Progress</span>
                <span className="font-medium text-foreground">{solvedInSheet}/{totalInSheet}</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="glass-dark border-0 mb-6 shadow-lg">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by title, topic, or company..."
                  className="pl-10 bg-white/5 border-white/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select className="px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-sm text-foreground focus:outline-none focus:border-primary/50" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                  {topics.map(t => <option key={t} value={t} className="bg-background">{t === 'all' ? 'All Topics' : t}</option>)}
                </select>
                <select className="px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-sm text-foreground focus:outline-none focus:border-primary/50" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                  {allCompanies.map(c => <option key={c} value={c} className="bg-background">{c === 'all' ? 'All Companies' : c}</option>)}
                </select>
                <select className="px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-sm text-foreground focus:outline-none focus:border-primary/50" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                  {difficulties.map(d => <option key={d} value={d} className="bg-background">{d === 'all' ? 'All Difficulties' : d}</option>)}
                </select>
                <select className="px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-sm text-foreground focus:outline-none focus:border-primary/50" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  {statuses.map(s => <option key={s} value={s} className="bg-background">{s === 'all' ? 'All Statuses' : s === 'solved' ? '✓ Solved' : s === 'unsolved' ? '○ Unsolved' : '⭐ Bookmarked'}</option>)}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems Table */}
        <Card className="glass-dark border-0 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12">Status</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12">⭐</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Problem</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16 text-muted-foreground">
                      <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p>No problems found matching your filters.</p>
                    </td>
                  </tr>
                ) : filteredProblems.map((problem, idx) => {
                  const isSolved = solvedProblems.has(problem.id);
                  const isBm = bookmarks.includes(Number(problem.id));
                  const hasNote = !!localStorage.getItem(getNoteKey(problem.id));
                  const compList = problem.companies ? problem.companies.split(',').map(c => c.trim()).slice(0, 2) : [];

                  return (
                    <tr key={problem.id} className={`group transition-all duration-200 hover:bg-white/5 ${isSolved ? 'opacity-80' : ''}`}>
                      <td className="px-4 py-4">
                        {isSolved
                          ? <CheckCircle className="h-5 w-5 text-emerald-500" />
                          : <Circle className="h-5 w-5 text-white/20 group-hover:text-white/40 transition-colors" />
                        }
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => toggleBookmark(problem.id)}
                          className="text-muted-foreground hover:text-yellow-400 transition-colors"
                          title={isBm ? 'Bookmarked' : 'Bookmark for revision'}
                        >
                          {isBm ? <Bookmark className="h-5 w-5 text-yellow-400 fill-yellow-400" /> : <Bookmark className="h-5 w-5 opacity-40 hover:opacity-100" />}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium text-sm ${isSolved ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {problem.title}
                          </span>
                          {hasNote && (
                            <span title="Has notes" className="text-yellow-400/70">
                              <StickyNote className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {compList.length > 0 ? (
                          <div className="flex items-center gap-1 flex-wrap">
                            {compList.map(c => (
                              <span key={c} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-medium">
                                {c}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`text-xs ${difficultyBadge(problem.difficulty)}`}>{problem.difficulty}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="h-8 px-3 text-xs bg-primary/20 hover:bg-primary/30 text-primary border-primary/20 gap-1 font-semibold"
                            onClick={() => navigate(`/problem/${problem.id}`)}
                          >
                            <Play className="h-3 w-3" /> Solve
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-8 px-2 text-xs gap-1 ${hasNote ? 'text-yellow-400 hover:text-yellow-300' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={() => setNoteModal(problem)}
                            title="Add/Edit Notes"
                          >
                            <StickyNote className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SheetDetail