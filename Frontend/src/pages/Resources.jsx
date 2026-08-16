import { useState, useEffect } from 'react'
import {
  BookOpen, Video, ExternalLink, Star, Users, Filter, Search,
  Library, Play, FileText, GraduationCap, Zap, Table, Code,
  Layers, Sparkles, Lightbulb, MessageSquare, Clock, TrendingUp,
  CheckCircle2, AlertCircle, Brain, Target, ArrowRight, Youtube,
  Github
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { getResources } from '../services/apiService'

// ─── Big-O Cheat Sheet Data ─────────────────────────────────────────────────
const cheatSheetData = {
  dataStructures: [
    { name: 'Array / Dynamic Array',           access: 'O(1)',     search: 'O(n)',     insert: 'O(n)',      delete: 'O(n)',      space: 'O(n)' },
    { name: 'Singly Linked List',              access: 'O(n)',     search: 'O(n)',     insert: 'O(1)',      delete: 'O(1)',      space: 'O(n)' },
    { name: 'Doubly Linked List',              access: 'O(n)',     search: 'O(n)',     insert: 'O(1)',      delete: 'O(1)',      space: 'O(n)' },
    { name: 'Stack / Queue',                   access: 'O(n)',     search: 'O(n)',     insert: 'O(1)',      delete: 'O(1)',      space: 'O(n)' },
    { name: 'Hash Table / Map',                access: 'O(1)',     search: 'O(1)',     insert: 'O(1)',      delete: 'O(1)',      space: 'O(n)' },
    { name: 'Binary Search Tree (Balanced)',   access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
    { name: 'Min / Max Heap (Priority Queue)', access: 'O(1)',     search: 'O(n)',     insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
    { name: 'Trie (Prefix Tree)',              access: 'O(k)',     search: 'O(k)',     insert: 'O(k)',      delete: 'O(k)',      space: 'O(n*k)' },
    { name: 'Graph (Adjacency List)',          access: 'O(V+E)',   search: 'O(V+E)',   insert: 'O(1)',      delete: 'O(E)',      space: 'O(V+E)' },
  ],
  sorting: [
    { name: 'Quick Sort',     best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)',      space: 'O(log n)', stable: 'No' },
    { name: 'Merge Sort',     best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',     stable: 'Yes' },
    { name: 'Heap Sort',      best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)',     stable: 'No' },
    { name: 'Tim Sort',       best: 'O(n)',        avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',     stable: 'Yes' },
    { name: 'Insertion Sort', best: 'O(n)',        avg: 'O(n²)',       worst: 'O(n²)',       space: 'O(1)',     stable: 'Yes' },
    { name: 'Bubble Sort',    best: 'O(n)',        avg: 'O(n²)',       worst: 'O(n²)',       space: 'O(1)',     stable: 'Yes' },
    { name: 'Counting Sort',  best: 'O(n+k)',      avg: 'O(n+k)',      worst: 'O(n+k)',      space: 'O(k)',     stable: 'Yes' },
    { name: 'Radix Sort',     best: 'O(nk)',       avg: 'O(nk)',       worst: 'O(nk)',        space: 'O(n+k)',   stable: 'Yes' },
  ],
  dpPatterns: [
    { pattern: '0/1 Knapsack',                         time: 'O(N × W)',       space: 'O(N × W) or O(W)', example: 'Partition Equal Subset Sum, Target Sum' },
    { pattern: 'Unbounded Knapsack',                   time: 'O(N × W)',       space: 'O(W)',             example: 'Coin Change, Rod Cutting' },
    { pattern: 'Longest Common Subsequence (LCS)',     time: 'O(M × N)',       space: 'O(M × N)',         example: 'Edit Distance, Shortest Common Supersequence' },
    { pattern: 'Longest Increasing Subsequence (LIS)', time: 'O(N log N)',     space: 'O(N)',             example: 'Russian Doll Envelopes, Max Height Stack' },
    { pattern: 'Matrix Chain Multiplication (MCM)',    time: 'O(N³)',          space: 'O(N²)',            example: 'Palindrome Partitioning, Burst Balloons' },
    { pattern: 'DP on Trees',                          time: 'O(V)',           space: 'O(V)',             example: 'Diameter of Tree, Max Path Sum' },
    { pattern: 'DP on Grids',                          time: 'O(M × N)',       space: 'O(M × N)',         example: 'Unique Paths, Min Cost Path' },
    { pattern: 'Bitmask DP',                           time: 'O(2^N × N)',     space: 'O(2^N × N)',       example: 'Travelling Salesman, Hamiltonian Path' },
  ]
};

// ─── Tips & Tricks Data ───────────────────────────────────────────────────────
const tipsData = [
  {
    category: '🧠 Problem-Solving Mental Models',
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-800/60',
    tips: [
      { title: 'Read → Clarify → Example → Brute → Optimize', body: 'Never jump to code. Spend the first 5 minutes understanding the problem. Draw 2-3 examples by hand. Code brute-force first, then optimize.' },
      { title: 'Recognize the Pattern First', body: 'Before solving, ask: "Does this involve a sliding window? Two pointers? BFS/DFS? DP?" Map to a known pattern and your solution rate will double.' },
      { title: 'Think About Edge Cases Upfront', body: 'Empty input, single element, all same elements, negative numbers, integer overflow — check these BEFORE coding, not after.' },
      { title: 'Decompose and Conquer', body: 'Break complex problems into sub-problems. Solve each independently. "How do I find the sum of a subarray?" before "How do I find the max subarray sum?"' },
    ]
  },
  {
    category: '⚡ DSA Tricks That Save Time',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800/60',
    tips: [
      { title: 'Two Pointers for Sorted Arrays', body: 'Whenever you need pairs or subarrays in a sorted array — use two pointers (left, right). Reduces O(n²) to O(n). Works for: Two Sum (sorted), Container With Most Water, Trapping Rain Water.' },
      { title: 'HashMap for O(1) Lookup', body: 'When asked "have I seen this before?" use a HashMap. Whenever brute force requires two nested loops checking pairs, a HashMap can collapse it to O(n).' },
      { title: 'Prefix Sum for Range Queries', body: 'Build prefix[] where prefix[i] = sum(arr[0..i]). Then rangeSum(l, r) = prefix[r] - prefix[l-1] in O(1). Precompute once, query many times.' },
      { title: 'Monotonic Stack for Next Greater/Smaller', body: 'Maintain a stack in monotonically increasing/decreasing order. Perfect for: Next Greater Element, Largest Rectangle in Histogram, Daily Temperatures.' },
      { title: 'BFS for Shortest Path, DFS for Connectivity', body: 'BFS = shortest path in unweighted graphs. DFS = check connectivity, detect cycles, topological sort. Never use DFS for shortest path on unweighted graphs.' },
      { title: 'Fast Power: Binary Exponentiation', body: 'x^n in O(log n) using: if n is even → (x^(n/2))², if n is odd → x × x^(n-1). Used in modular arithmetic problems.' },
    ]
  },
  {
    category: '🎯 Interview Performance Tips',
    icon: Target,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800/60',
    tips: [
      { title: 'Think Out Loud (Always)', body: 'Interviewers evaluate your thinking process, not just the final answer. Talk through your thought process even if you\'re unsure. "I\'m thinking of using a HashMap here because..."' },
      { title: 'State Time & Space Complexity', body: 'After coding, always say "This is O(n) time and O(1) space." Then ask: "Can we optimize further?" Proactively discussing trade-offs impresses interviewers.' },
      { title: 'Handle Edge Cases in Code', body: 'Add null checks, empty array checks, and boundary checks in your code. Say "I\'m adding a guard clause here for the empty case." This shows maturity.' },
      { title: 'Test Your Solution', body: 'Dry-run your code with 2-3 test cases on the whiteboard/screen. Show you can trace through your own code. Catch bugs before the interviewer does.' },
      { title: 'Ask Clarifying Questions', body: '"Can the input be null?" "Is the array sorted?" "Are there duplicates?" "What\'s the expected input size?" This shows senior-level thinking.' },
    ]
  },
  {
    category: '📐 Pattern Recognition Guide',
    icon: Layers,
    color: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-cyan-200 dark:border-cyan-800/60',
    tips: [
      { title: 'Sliding Window → "Subarray/Substring of size K"', body: 'Keywords: "contiguous subarray", "window of size k", "maximum/minimum in a subarray". Pattern: maintain a window [l, r], expand right, shrink left when constraint is violated.' },
      { title: 'Binary Search → "Find in Sorted" or "Search Space Reduction"', body: 'Keywords: "sorted array", "rotated sorted", "find minimum/maximum", "first/last occurrence". Also: answer is monotonic (once answer is False, it stays False) → binary search on the answer.' },
      { title: 'Graph BFS/DFS → "Connected Components, Islands, Shortest Path"', body: 'Keywords: "number of islands", "connected", "shortest path", "reach from A to B", "all paths". Grid problems → BFS/DFS on cells. 0/1 matrix → multi-source BFS.' },
      { title: 'Dynamic Programming → "Count ways", "Min/Max cost", "Can we achieve X?"', body: 'Keywords: "count distinct ways", "minimum cost to reach", "maximum profit", "can you partition". DP if: overlapping subproblems + optimal substructure.' },
      { title: 'Heap → "K-th Largest/Smallest, Top K Elements"', body: 'Keywords: "k-th largest", "k closest points", "stream of numbers", "merge k sorted". MinHeap of size K for K-largest elements (counter-intuitive but correct).' },
    ]
  },
  {
    category: '🏃 Speed Coding Tricks',
    icon: Clock,
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-pink-200 dark:border-pink-800/60',
    tips: [
      { title: 'Use Python for Interviews When Possible', body: 'Python\'s list comprehensions, collections.defaultdict, heapq, and Counter save 30-40% coding time vs Java/C++. Use Python unless required otherwise.' },
      { title: 'Know Standard Library Shortcuts', body: 'Python: Counter(arr), sorted(arr, key=lambda...), bisect.bisect_left(arr, x). Java: Arrays.sort(), Collections.sort(), PriorityQueue(Comparator.reverseOrder()). Know these cold.' },
      { title: 'Template Your Common Patterns', body: 'Memorize templates: DFS with visited set, BFS with deque, sliding window with two pointers, binary search boundaries. Apply the template, then customize.' },
      { title: 'Integers → Avoid Off-By-One Errors', body: 'Binary search: use mid = low + (high - low) // 2 (avoids overflow). Loop bounds: prefer [0, n) over [1, n+1]. Use "while left < right" vs "left <= right" correctly.' },
    ]
  }
];

// ─── Resources Data ────────────────────────────────────────────────────────────
const resources = [
  { id: 1,  title: 'Introduction to Algorithms (CLRS)',       type: 'book',    category: 'algorithms',    description: 'The comprehensive bible of algorithms and data structures. Used in university courses worldwide.', author: 'Cormen, Leiserson, Rivest, Stein', rating: 4.8, users: 15420, url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition', difficulty: 'Advanced',              topics: ['Algorithms', 'Data Structures', 'Theory'] },
  { id: 2,  title: 'Striver A2Z DSA Course',                  type: 'video',   category: 'course',        description: 'Complete DSA course — Step-by-Step from basics to advanced with detailed explanations and coding.', author: 'Raj Vikramaditya (Striver)', rating: 4.9, users: 89500, url: 'https://takeuforward.org/strivers-a2z-dsa-course/', difficulty: 'Beginner to Advanced', topics: ['Complete DSA', 'Interview Prep', 'Coding'] },
  { id: 3,  title: 'NeetCode.io',                              type: 'course',  category: 'patterns',      description: 'Categorized LeetCode solutions with video explanations. Best for pattern-by-pattern learning.', author: 'NeetCode', rating: 4.9, users: 125000, url: 'https://neetcode.io/', difficulty: 'Intermediate',           topics: ['Patterns', 'LeetCode', 'Video'] },
  { id: 4,  title: 'LeetCode Patterns by Sean Prashad',       type: 'article', category: 'patterns',      description: '14 patterns to ace any coding interview question. Curated problem list by pattern.', author: 'Sean Prashad', rating: 4.7, users: 23400, url: 'https://seanprashad.com/leetcode-patterns/', difficulty: 'Intermediate',           topics: ['Patterns', 'Interview Prep', 'Problem Solving'] },
  { id: 5,  title: 'GeeksforGeeks DSA Course',                type: 'course',  category: 'course',        description: 'Self-paced DSA course with practice problems, theory, and certificate.', author: 'GeeksforGeeks', rating: 4.5, users: 45600, url: 'https://www.geeksforgeeks.org/dsa-self-paced-course/', difficulty: 'Beginner to Intermediate', topics: ['DSA Fundamentals', 'Practice', 'Theory'] },
  { id: 6,  title: 'Cracking the Coding Interview',           type: 'book',    category: 'interview',     description: '189 programming questions and solutions covering all major topics asked in FAANG interviews.', author: 'Gayle Laakmann McDowell', rating: 4.6, users: 67800, url: 'https://www.crackingthecodinginterview.com/', difficulty: 'Intermediate',           topics: ['Interview Questions', 'Problem Solving', 'System Design'] },
  { id: 7,  title: 'Abdul Bari Algorithms (YouTube)',         type: 'video',   category: 'algorithms',    description: 'Algorithm analysis and design — one of the best free courses for understanding algorithm complexity.', author: 'Abdul Bari', rating: 4.8, users: 34500, url: 'https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O', difficulty: 'Intermediate',           topics: ['Algorithm Analysis', 'Complexity', 'Design Patterns'] },
  { id: 8,  title: 'Dynamic Programming by Aditya Verma',    type: 'video',   category: 'patterns',      description: 'Complete guide to DP patterns — knapsack, LCS, MCM, and more. Best DP playlist on YouTube.', author: 'Aditya Verma', rating: 4.9, users: 12300, url: 'https://www.youtube.com/watch?v=nqowUJzG-iM&list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go', difficulty: 'Advanced',              topics: ['Dynamic Programming', 'Optimization'] },
  { id: 9,  title: 'System Design Primer',                    type: 'article', category: 'system-design', description: 'Learn how to design large-scale systems. 250k+ GitHub stars. The go-to system design resource.', author: 'Donne Martin', rating: 4.7, users: 89200, url: 'https://github.com/donnemartin/system-design-primer', difficulty: 'Advanced',              topics: ['System Design', 'Scalability', 'Architecture'] },
  { id: 10, title: 'CS50 — Harvard Introduction to CS',      type: 'course',  category: 'fundamentals',  description: "Harvard's legendary CS intro course — free, comprehensive, covers C, Python, Web, SQL.}", author: 'David J. Malan', rating: 4.9, users: 156000, url: 'https://cs50.harvard.edu/x/', difficulty: 'Beginner',              topics: ['Computer Science', 'Programming', 'Fundamentals'] },
  { id: 11, title: 'Competitive Programming Handbook',       type: 'book',    category: 'competitive',   description: 'Guide to competitive programming and contests. Available free as PDF from author.', author: 'Antti Laaksonen', rating: 4.6, users: 23400, url: 'https://cses.fi/book/book.pdf', difficulty: 'Advanced',              topics: ['Competitive Programming', 'Algorithms', 'Mathematics'] },
  { id: 12, title: 'CSES Problem Set',                       type: 'article', category: 'competitive',   description: '300 curated competitive programming problems. Best for building algorithmic thinking.', author: 'CSES Finland', rating: 4.8, users: 41000, url: 'https://cses.fi/problemset/', difficulty: 'Intermediate',           topics: ['Competitive Programming', 'Practice', 'Algorithms'] },
  { id: 13, title: 'Grokking Algorithms (Book)',             type: 'book',    category: 'algorithms',    description: 'Illustrated introduction to algorithms — perfect for visual learners. Fun and beginner-friendly.', author: 'Aditya Bhargava', rating: 4.7, users: 38900, url: 'https://www.manning.com/books/grokking-algorithms', difficulty: 'Beginner',              topics: ['Algorithms', 'Visual Learning', 'Beginner'] },
  { id: 14, title: 'Grokking the Coding Interview',          type: 'course',  category: 'patterns',      description: '16 coding patterns to solve any LeetCode problem. Used by thousands of FAANG candidates.', author: 'Educative.io', rating: 4.8, users: 72000, url: 'https://www.educative.io/courses/grokking-the-coding-interview', difficulty: 'Intermediate',           topics: ['Patterns', 'FAANG', 'Interview'] },
  { id: 15, title: 'William Fiset — Graph Theory (YouTube)', type: 'video',   category: 'algorithms',    description: 'Best-in-class graph theory course — DFS, BFS, Dijkstra, Bellman-Ford, Floyd-Warshall, and more.', author: 'William Fiset', rating: 4.9, users: 18200, url: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P', difficulty: 'Intermediate to Advanced', topics: ['Graph Theory', 'Algorithms', 'Video'] },
];

const categories = ['all', 'algorithms', 'course', 'patterns', 'interview', 'system-design', 'fundamentals', 'competitive'];
const types = ['all', 'book', 'video', 'article', 'course'];

const Resources = () => {
  const [activeTab,         setActiveTab]         = useState('resources');
  const [selectedCategory,  setSelectedCategory]  = useState('all');
  const [selectedType,      setSelectedType]      = useState('all');
  const [searchTerm,        setSearchTerm]        = useState('');
  const [expandedTip,       setExpandedTip]       = useState(null);
  const [mounted,           setMounted]           = useState(false);
  const [resourceList,      setResourceList]      = useState(resources);

  useEffect(() => {
    setMounted(true);
    (async () => {
      try {
        const data = await getResources();
        if (Array.isArray(data) && data.length > 0) {
          // Normalize backend fields if string topics are returned as comma-separated
          const normalized = data.map(r => ({
            ...r,
            topics: Array.isArray(r.topics) ? r.topics : (r.topics ? r.topics.split(',') : []),
            users: r.users || r.usersCount || 1000
          }));
          setResourceList(normalized);
        }
      } catch (e) {
        // Fallback to local resources catalog on error
      }
    })();
  }, []);

  const filteredResources = resourceList.filter(r => {
    const s = (searchTerm || '').toLowerCase();
    const matchSearch = (r.title || '').toLowerCase().includes(s) ||
                        (r.author || '').toLowerCase().includes(s) ||
                        (r.description || '').toLowerCase().includes(s) ||
                        (r.topics || []).some(t => (t || '').toLowerCase().includes(s));
    const matchCat  = selectedCategory === 'all' || r.category === selectedCategory;
    const matchType = selectedType === 'all' || r.type === selectedType;
    return matchSearch && matchCat && matchType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'book':    return <BookOpen className="h-4 w-4" />;
      case 'video':   return <Play className="h-4 w-4" />;
      case 'course':  return <GraduationCap className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      default:        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'book':    return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700/50';
      case 'video':   return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700/50';
      case 'course':  return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700/50';
      case 'article': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700/50';
      default:        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600';
    }
  };

  const getDifficultyStyle = (difficulty) => {
    if (difficulty.includes('Beginner'))     return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700/50';
    if (difficulty.includes('Intermediate')) return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700/50';
    return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700/50';
  };

  const tabs = [
    { id: 'resources',   label: '📚 Curated Resources',         count: resources.length },
    { id: 'cheatsheet',  label: '⚡ Big-O Cheat Sheet',          count: null },
    { id: 'tips',        label: '💡 Tips, Tricks & Interview',   count: null },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="space-y-6">

        {/* Hero */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl p-7 md:p-10 shadow-xl shadow-purple-500/20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-widest">
            <Library className="w-3.5 h-3.5" /> DSA Learning Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Resources, Cheat Sheets & Interview Tips
          </h1>
          <p className="text-violet-100 text-sm max-w-2xl leading-relaxed">
            Curated books, courses, YouTube channels, Big-O complexity tables, problem-solving mental models, and FAANG interview tips — everything in one place.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-white font-semibold">
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg"><BookOpen className="w-4 h-4 text-emerald-300" /> {resources.length}+ Resources</div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg"><Lightbulb className="w-4 h-4 text-amber-300" /> 25+ Pro Tips</div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-lg"><Table className="w-4 h-4 text-cyan-300" /> Big-O Tables</div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-sm">
          <div className="flex flex-wrap gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── TAB 1: CURATED RESOURCES ─────────────────────────── */}
        {activeTab === 'resources' && (
          <>
            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search resources, authors, or topics..."
                  className="pl-9 h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  className="px-3 py-2 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/40 min-w-[140px]"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c} value={c} className="bg-white dark:bg-slate-800">
                      {c === 'all' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
                <select
                  className="px-3 py-2 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/40 min-w-[110px]"
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                >
                  {types.map(t => (
                    <option key={t} value={t} className="bg-white dark:bg-slate-800">
                      {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Showing <span className="text-slate-900 dark:text-white font-bold">{filteredResources.length}</span> of {resources.length} resources
            </p>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResources.map(resource => (
                <div key={resource.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl border ${getTypeStyle(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTypeStyle(resource.type)}`}>
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDifficultyStyle(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">by {resource.author}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resource.topics.slice(0, 3).map((topic, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" /> {resource.rating}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Users className="w-3.5 h-3.5" /> {resource.users.toLocaleString()}
                      </span>
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-xs shadow-md hover:opacity-90 hover:scale-[1.02] transition-all"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-16 space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">No resources match your search.</p>
                <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedType('all'); }}
                  className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}

        {/* ─── TAB 2: BIG-O CHEAT SHEET ─────────────────────────── */}
        {activeTab === 'cheatsheet' && (
          <div className="space-y-6">
            {/* Data Structures */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <Table className="w-5 h-5 text-emerald-500" />
                <h2 className="font-extrabold text-slate-900 dark:text-white">Data Structure Operations — Time & Space Complexity</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5 text-left">Data Structure</th>
                      <th className="px-5 py-3.5 text-left">Access</th>
                      <th className="px-5 py-3.5 text-left">Search</th>
                      <th className="px-5 py-3.5 text-left">Insert</th>
                      <th className="px-5 py-3.5 text-left">Delete</th>
                      <th className="px-5 py-3.5 text-left">Space</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {cheatSheetData.dataStructures.map((ds, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-5 py-3.5 font-sans font-semibold text-slate-900 dark:text-white">{ds.name}</td>
                        <td className="px-5 py-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">{ds.access}</td>
                        <td className="px-5 py-3.5 text-amber-600 dark:text-amber-400 font-semibold">{ds.search}</td>
                        <td className="px-5 py-3.5 text-blue-600 dark:text-blue-400 font-semibold">{ds.insert}</td>
                        <td className="px-5 py-3.5 text-violet-600 dark:text-violet-400 font-semibold">{ds.delete}</td>
                        <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 font-semibold">{ds.space}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sorting Algorithms */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-500" />
                <h2 className="font-extrabold text-slate-900 dark:text-white">Sorting Algorithms — Complexity Comparison</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5 text-left">Algorithm</th>
                      <th className="px-5 py-3.5 text-left">Best</th>
                      <th className="px-5 py-3.5 text-left">Average</th>
                      <th className="px-5 py-3.5 text-left">Worst</th>
                      <th className="px-5 py-3.5 text-left">Space</th>
                      <th className="px-5 py-3.5 text-left">Stable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {cheatSheetData.sorting.map((algo, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-5 py-3.5 font-sans font-semibold text-slate-900 dark:text-white">{algo.name}</td>
                        <td className="px-5 py-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">{algo.best}</td>
                        <td className="px-5 py-3.5 text-amber-600 dark:text-amber-400 font-semibold">{algo.avg}</td>
                        <td className="px-5 py-3.5 text-red-600 dark:text-red-400 font-semibold">{algo.worst}</td>
                        <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 font-semibold">{algo.space}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded-md font-sans font-bold text-[10px] ${
                            algo.stable === 'Yes'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {algo.stable}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DP Patterns */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500" />
                <h2 className="font-extrabold text-slate-900 dark:text-white">Dynamic Programming Patterns</h2>
              </div>
              <div className="p-5 space-y-3">
                {cheatSheetData.dpPatterns.map((dp, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{dp.pattern}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">e.g. {dp.example}</p>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                      <span className="px-2.5 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 font-semibold">⏱ {dp.time}</span>
                      <span className="px-2.5 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/50 font-semibold">💾 {dp.space}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 3: TIPS & TRICKS ──────────────────────────────── */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            {/* Intro banner */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white">Pro Tips for DSA & Technical Interviews</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Curated from 100s of FAANG interviews. Learn the mental models, shortcuts, and communication strategies that separate good candidates from great ones.
                </p>
              </div>
            </div>

            {/* Tips sections */}
            {tipsData.map((section, sIdx) => {
              const Icon = section.icon;
              return (
                <div key={sIdx} className={`${section.bg} ${section.border} border-2 rounded-2xl overflow-hidden shadow-sm`}>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white">{section.category}</h3>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {section.tips.length} tips
                    </span>
                  </div>
                  <div className="px-5 pb-5 space-y-2">
                    {section.tips.map((tip, tIdx) => {
                      const key = `${sIdx}-${tIdx}`;
                      const isOpen = expandedTip === key;
                      return (
                        <div key={tIdx}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                            onClick={() => setExpandedTip(isOpen ? null : key)}
                          >
                            <div className="flex items-center gap-2.5">
                              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isOpen ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`} />
                              <span className="text-sm font-bold text-slate-900 dark:text-white">{tip.title}</span>
                            </div>
                            <ArrowRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 pt-0">
                              <div className="ml-6 pl-2.5 border-l-2 border-emerald-200 dark:border-emerald-800">
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{tip.body}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* YouTube Channels */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <h3 className="font-extrabold text-slate-900 dark:text-white">Must-Watch YouTube Channels</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: 'NeetCode', desc: 'Best pattern-wise LeetCode solutions with clean explanations', url: 'https://www.youtube.com/@NeetCode', sub: '480K+ subs' },
                  { name: 'Striver (takeUforward)', desc: 'A2Z DSA course — step-by-step from beginner to advanced', url: 'https://www.youtube.com/@takeUforward', sub: '750K+ subs' },
                  { name: 'William Fiset', desc: 'Best graph theory and data structures content on YouTube', url: 'https://www.youtube.com/@WilliamFiset-videos', sub: '200K+ subs' },
                  { name: 'Back To Back SWE', desc: 'Deep algorithmic explanations with animations', url: 'https://www.youtube.com/@BackToBackSWE', sub: '320K+ subs' },
                  { name: 'Errichto', desc: 'Competitive programming tutorials and contest walkthroughs', url: 'https://www.youtube.com/@Errichto', sub: '160K+ subs' },
                  { name: 'Abdul Bari', desc: 'Algorithm complexity and design — university-level quality', url: 'https://www.youtube.com/@abdul_bari', sub: '2M+ subs' },
                ].map((ch, i) => (
                  <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{ch.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{ch.desc}</p>
                      <p className="text-[10px] text-red-500 font-semibold mt-1">{ch.sub}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-red-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* GitHub Repos */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <h3 className="font-extrabold text-slate-900 dark:text-white">Essential GitHub Repositories</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: 'system-design-primer', desc: '250k+ stars — comprehensive system design resource', url: 'https://github.com/donnemartin/system-design-primer', stars: '250k+' },
                  { name: 'coding-interview-university', desc: "John Washam's self-study plan for Google interviews", url: 'https://github.com/jwasham/coding-interview-university', stars: '300k+' },
                  { name: 'javascript-algorithms', desc: 'Algorithms and DS implemented in JavaScript with explanations', url: 'https://github.com/trekhleb/javascript-algorithms', stars: '185k+' },
                  { name: 'the-algorithms', desc: 'Open-source implementations of algorithms in all languages', url: 'https://github.com/TheAlgorithms/Python', stars: '190k+' },
                ].map((repo, i) => (
                  <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-slate-400 dark:hover:border-slate-500 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-slate-700 flex items-center justify-center shrink-0">
                      <Github className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-mono">{repo.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{repo.desc}</p>
                      <p className="text-[10px] text-amber-500 font-semibold mt-1">⭐ {repo.stars} stars</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-indigo-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Resources;
