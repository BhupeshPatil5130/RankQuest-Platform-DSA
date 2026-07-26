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

// Rich fallback problem dataset from original sheets
const defaultSheetProblems = [
  // Striver SDE Sheet
  { id: 1, sheetSlug: 'striver-sde', title: 'Set Matrix Zeroes', difficulty: 'Medium', topic: 'Arrays', companies: 'Amazon, Microsoft, Meta' },
  { id: 2, sheetSlug: 'striver-sde', title: "Pascal's Triangle", difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Apple, Bloomberg' },
  { id: 3, sheetSlug: 'striver-sde', title: 'Next Permutation', difficulty: 'Medium', topic: 'Arrays', companies: 'Meta, Amazon, Microsoft' },
  { id: 4, sheetSlug: 'striver-sde', title: "Kadane's Algorithm", difficulty: 'Medium', topic: 'Arrays', companies: 'Google, Amazon, Meta' },
  { id: 5, sheetSlug: 'striver-sde', title: 'Sort Colors (0s, 1s, 2s)', difficulty: 'Medium', topic: 'Arrays', companies: 'Microsoft, Amazon, Meta' },
  { id: 6, sheetSlug: 'striver-sde', title: 'Stock Buy and Sell', difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Microsoft, Meta' },
  { id: 7, sheetSlug: 'striver-sde', title: 'Rotate Image (2D Matrix)', difficulty: 'Medium', topic: 'Arrays', companies: 'Amazon, Microsoft, Apple' },
  { id: 8, sheetSlug: 'striver-sde', title: 'Merge Intervals', difficulty: 'Medium', topic: 'Arrays', companies: 'Amazon, Google, Meta' },
  { id: 9, sheetSlug: 'striver-sde', title: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', companies: 'Amazon, Apple, Bloomberg' },
  { id: 10, sheetSlug: 'striver-sde', title: 'Middle of the Linked List', difficulty: 'Easy', topic: 'Linked List', companies: 'Amazon, Apple' },
  { id: 11, sheetSlug: 'striver-sde', title: 'Merge Two Sorted Lists', difficulty: 'Easy', topic: 'Linked List', companies: 'Amazon, Microsoft, Apple' },
  { id: 12, sheetSlug: 'striver-sde', title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Stack & Queue', companies: 'Amazon, Google, Meta' },
  { id: 13, sheetSlug: 'striver-sde', title: 'Subsets II', difficulty: 'Medium', topic: 'Recursion', companies: 'Amazon, Google, Meta' },
  { id: 14, sheetSlug: 'striver-sde', title: 'N-Queens', difficulty: 'Hard', topic: 'Backtracking', companies: 'Amazon, Google, Microsoft' },
  { id: 15, sheetSlug: 'striver-sde', title: 'LRU Cache', difficulty: 'Medium', topic: 'Design', companies: 'Amazon, Google, Microsoft' },

  // Love Babbar 450
  { id: 16, sheetSlug: 'love-babbar-450', title: 'Reverse the Array', difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Microsoft' },
  { id: 17, sheetSlug: 'love-babbar-450', title: 'Find Min and Max in Array', difficulty: 'Easy', topic: 'Arrays', companies: 'Adobe, Amazon' },
  { id: 18, sheetSlug: 'love-babbar-450', title: 'Kth Smallest Element', difficulty: 'Medium', topic: 'Arrays', companies: 'Amazon, Microsoft, VMWare' },
  { id: 19, sheetSlug: 'love-babbar-450', title: 'Move Negative Numbers to Front', difficulty: 'Easy', topic: 'Arrays', companies: 'Adobe, Amazon' },
  { id: 20, sheetSlug: 'love-babbar-450', title: 'Union of Two Arrays', difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Microsoft' },
  { id: 21, sheetSlug: 'love-babbar-450', title: 'Cyclically Rotate Array by One', difficulty: 'Easy', topic: 'Arrays', companies: 'Adobe, Amazon' },
  { id: 22, sheetSlug: 'love-babbar-450', title: 'Detect Loop in Linked List', difficulty: 'Medium', topic: 'Linked List', companies: 'Amazon, Microsoft' },
  { id: 23, sheetSlug: 'love-babbar-450', title: 'Balanced Parenthesis', difficulty: 'Easy', topic: 'Stack & Queue', companies: 'Amazon, Microsoft' },
  { id: 24, sheetSlug: 'love-babbar-450', title: 'Height of Binary Tree', difficulty: 'Easy', topic: 'Trees', companies: 'Amazon, Microsoft' },
  { id: 25, sheetSlug: 'love-babbar-450', title: '0-1 Knapsack Problem', difficulty: 'Medium', topic: 'Dynamic Programming', companies: 'Amazon, Google, Microsoft' },

  // NeetCode 150
  { id: 26, sheetSlug: 'neetcode-150', title: 'Contains Duplicate', difficulty: 'Easy', topic: 'Arrays & Hashing', companies: 'Amazon, Apple' },
  { id: 27, sheetSlug: 'neetcode-150', title: 'Valid Anagram', difficulty: 'Easy', topic: 'Arrays & Hashing', companies: 'Google, Amazon, Microsoft' },
  { id: 28, sheetSlug: 'neetcode-150', title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays & Hashing', companies: 'Amazon, Google, Apple' },
  { id: 29, sheetSlug: 'neetcode-150', title: 'Group Anagrams', difficulty: 'Medium', topic: 'Arrays & Hashing', companies: 'Amazon, Google, Meta' },
  { id: 30, sheetSlug: 'neetcode-150', title: 'Top K Frequent Elements', difficulty: 'Medium', topic: 'Arrays & Hashing', companies: 'Amazon, Google, Microsoft' },
  { id: 31, sheetSlug: 'neetcode-150', title: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Arrays & Hashing', companies: 'Amazon, Apple, Meta' },
  { id: 32, sheetSlug: 'neetcode-150', title: 'Valid Palindrome', difficulty: 'Easy', topic: 'Two Pointers', companies: 'Meta, Microsoft, Uber' },
  { id: 33, sheetSlug: 'neetcode-150', title: '3Sum', difficulty: 'Medium', topic: 'Two Pointers', companies: 'Amazon, Meta, Microsoft' },
  { id: 34, sheetSlug: 'neetcode-150', title: 'Container With Most Water', difficulty: 'Medium', topic: 'Two Pointers', companies: 'Amazon, Google, Microsoft' },
  { id: 35, sheetSlug: 'neetcode-150', title: 'Longest Substring Without Repeating', difficulty: 'Medium', topic: 'Sliding Window', companies: 'Amazon, Google, Microsoft' },

  // Blind 75
  { id: 36, sheetSlug: 'blind-75', title: 'Two Sum', difficulty: 'Easy', topic: 'Array', companies: 'Amazon, Google, Apple' },
  { id: 37, sheetSlug: 'blind-75', title: 'Best Time to Buy Stock', difficulty: 'Easy', topic: 'Array', companies: 'Amazon, Microsoft, Meta' },
  { id: 38, sheetSlug: 'blind-75', title: 'Contains Duplicate', difficulty: 'Easy', topic: 'Array', companies: 'Amazon, Apple' },
  { id: 39, sheetSlug: 'blind-75', title: 'Maximum Product Subarray', difficulty: 'Medium', topic: 'Array', companies: 'Google, Amazon, Meta' },
  { id: 40, sheetSlug: 'blind-75', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', companies: 'Amazon, Microsoft, Meta' },
  { id: 41, sheetSlug: 'blind-75', title: 'Invert Binary Tree', difficulty: 'Easy', topic: 'Tree', companies: 'Amazon, Apple, Google' },
  { id: 42, sheetSlug: 'blind-75', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', topic: 'Tree', companies: 'Amazon, Google, Microsoft' },
  { id: 43, sheetSlug: 'blind-75', title: 'Number of Islands', difficulty: 'Medium', topic: 'Graph', companies: 'Amazon, Microsoft, Bloomberg' },

  // GFG Must Do
  { id: 44, sheetSlug: 'gfg-must-do', title: 'Missing Number in Array', difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Microsoft' },
  { id: 45, sheetSlug: 'gfg-must-do', title: 'Subarray with Given Sum', difficulty: 'Medium', topic: 'Arrays', companies: 'Amazon, Microsoft, Meta' },
  { id: 46, sheetSlug: 'gfg-must-do', title: 'Leaders in an Array', difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Microsoft' },
  { id: 47, sheetSlug: 'gfg-must-do', title: 'Majority Element (Moore Voting)', difficulty: 'Medium', topic: 'Arrays', companies: 'Amazon, Google, Microsoft' },
  { id: 48, sheetSlug: 'gfg-must-do', title: 'Equilibrium Point', difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Adobe' },

  // Apna College DSA
  { id: 49, sheetSlug: 'apna-college', title: 'Search Element in Array', difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Microsoft' },
  { id: 50, sheetSlug: 'apna-college', title: 'Chocolate Distribution Problem', difficulty: 'Easy', topic: 'Arrays', companies: 'Amazon, Flipkart' },
  { id: 51, sheetSlug: 'apna-college', title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Arrays', companies: 'Amazon, Google, Meta' },
  { id: 52, sheetSlug: 'apna-college', title: 'Spiral Matrix Traversal', difficulty: 'Medium', topic: 'Matrix', companies: 'Amazon, Microsoft' },
  { id: 53, sheetSlug: 'apna-college', title: 'Search in a 2D Matrix', difficulty: 'Medium', topic: 'Matrix', companies: 'Google, Amazon, Meta' },
];

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

  // Fallback sheet metadata
  const sheetFallback = {
    'striver-sde': { name: 'Striver SDE Sheet', author: 'Raj Vikramaditya', description: 'Top 190 problems to crack SDE interviews. Carefully curated from FAANG interviews.', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    'love-babbar-450': { name: 'Love Babbar 450', author: 'Love Babbar', description: 'Comprehensive 450 DSA problems for product-based companies. Most popular sheet for placements.', color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    'neetcode-150': { name: 'NeetCode 150', author: 'NeetCode', description: 'Top 150 LeetCode problems grouped by patterns. Best for systematic interview preparation.', color: 'bg-gradient-to-r from-green-500 to-green-600' },
    'blind-75': { name: 'Blind 75', author: 'Blind Community', description: 'The original 75 most frequently asked LeetCode questions. The classic starting point.', color: 'bg-gradient-to-r from-red-500 to-red-600' },
    'gfg-must-do': { name: 'GFG Must Do', author: 'GeeksforGeeks', description: 'Topic-wise must-do coding questions for campus placements. GFG curated list.', color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
    'apna-college': { name: 'Apna College DSA', author: 'Apna College', description: 'Curated DSA sheet for college students and beginners. Perfect for structured learning.', color: 'bg-gradient-to-r from-teal-500 to-teal-600' },
  };

  const currentSheet = sheetInfo || sheetFallback[sheetId] || sheetFallback['striver-sde'];
  const sheetColor = sheetInfo?.colorFrom
    ? `bg-gradient-to-r from-${sheetInfo.colorFrom} to-${sheetInfo.colorTo || sheetInfo.colorFrom}`
    : (sheetFallback[sheetId]?.color || 'bg-gradient-to-r from-blue-500 to-blue-600');

  // If backend returns problems use them, otherwise filter default catalog by sheetSlug
  const sheetProblems = problems.length > 0 
    ? problems 
    : defaultSheetProblems.filter(p => p.sheetSlug === sheetId);

  const solvedInSheet = sheetProblems.filter(p => solvedProblems.has(p.id)).length;
  const totalInSheet = sheetProblems.length;
  const progress = totalInSheet > 0 ? Math.round((solvedInSheet / totalInSheet) * 100) : 0;

  // Extract filter options
  const topics = ['all', ...new Set(sheetProblems.map(p => p.topic).filter(Boolean))];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  const allCompanies = ['all', ...new Set(sheetProblems.flatMap(p => p.companies ? p.companies.split(',').map(c => c.trim()) : []).filter(Boolean))];
  const statuses = ['all', 'solved', 'unsolved', 'bookmarked'];

  const filteredProblems = sheetProblems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (problem.topic || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (problem.companies || '').toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="min-h-screen bg-background py-8">
      {/* Notes Modal */}
      {noteModal && (
        <NoteModal problem={noteModal} onClose={() => setNoteModal(null)} />
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground" onClick={() => navigate('/sheets')}>
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