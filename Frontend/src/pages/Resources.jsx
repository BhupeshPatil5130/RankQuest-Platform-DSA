import { useState, useEffect } from 'react'
import {
  BookOpen, Video, ExternalLink, Star, Users, Filter, Search,
  Library, Play, FileText, GraduationCap, Zap, Table, Code, Layers, Sparkles
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'

const cheatSheetData = {
  dataStructures: [
    { name: 'Array / Dynamic Array', access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', space: 'O(n)' },
    { name: 'Singly Linked List', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
    { name: 'Doubly Linked List', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
    { name: 'Stack / Queue', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
    { name: 'Hash Table / Map', access: 'O(1)', search: 'O(1)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
    { name: 'Binary Search Tree (Balanced)', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
    { name: 'Min / Max Heap (Priority Queue)', access: 'O(1)', search: 'O(n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
  ],
  sorting: [
    { name: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: 'No' },
    { name: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: 'Yes' },
    { name: 'Heap Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: 'No' },
    { name: 'Insertion Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes' },
    { name: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes' },
  ],
  dpPatterns: [
    { pattern: '0/1 Knapsack', time: 'O(N * W)', space: 'O(N * W) or O(W)', example: 'Partition Equal Subset Sum, Target Sum' },
    { pattern: 'Unbounded Knapsack', time: 'O(N * W)', space: 'O(W)', example: 'Coin Change, Rod Cutting' },
    { pattern: 'Longest Common Subsequence (LCS)', time: 'O(M * N)', space: 'O(M * N)', example: 'Edit Distance, Shortest Common Supersequence' },
    { pattern: 'Longest Increasing Subsequence (LIS)', time: 'O(N log N) or O(N²)', space: 'O(N)', example: 'Russian Doll Envelopes, Maximum Height Stack' },
    { pattern: 'Matrix Chain Multiplication (MCM)', time: 'O(N³)', space: 'O(N²)', example: 'Palindrome Partitioning, Burst Balloons' },
  ]
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'cheatsheet'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resources = [
    {
      id: 1,
      title: 'Introduction to Algorithms (CLRS)',
      type: 'book',
      category: 'algorithms',
      description: 'The comprehensive guide to algorithms and data structures',
      author: 'Cormen, Leiserson, Rivest, Stein',
      rating: 4.8,
      users: 15420,
      url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
      difficulty: 'Advanced',
      topics: ['Algorithms', 'Data Structures', 'Theory']
    },
    {
      id: 2,
      title: 'Striver DSA Course',
      type: 'video',
      category: 'course',
      description: 'Complete DSA course with detailed explanations and coding',
      author: 'Raj Vikramaditya (Striver)',
      rating: 4.9,
      users: 89500,
      url: 'https://takeuforward.org/strivers-a2z-dsa-course/',
      difficulty: 'Beginner to Advanced',
      topics: ['Complete DSA', 'Interview Prep', 'Coding']
    },
    {
      id: 3,
      title: 'LeetCode Patterns',
      type: 'article',
      category: 'patterns',
      description: '14 patterns to ace any coding interview question',
      author: 'Sean Prashad',
      rating: 4.7,
      users: 23400,
      url: 'https://seanprashad.com/leetcode-patterns/',
      difficulty: 'Intermediate',
      topics: ['Patterns', 'Interview Prep', 'Problem Solving']
    },
    {
      id: 4,
      title: 'GeeksforGeeks DSA Course',
      type: 'course',
      category: 'course',
      description: 'Self-paced DSA course with practice problems',
      author: 'GeeksforGeeks',
      rating: 4.5,
      users: 45600,
      url: 'https://www.geeksforgeeks.org/dsa-self-paced-course/',
      difficulty: 'Beginner to Intermediate',
      topics: ['DSA Fundamentals', 'Practice Problems', 'Theory']
    },
    {
      id: 5,
      title: 'Cracking the Coding Interview',
      type: 'book',
      category: 'interview',
      description: '189 programming questions and solutions',
      author: 'Gayle Laakmann McDowell',
      rating: 4.6,
      users: 67800,
      url: 'https://www.crackingthecodinginterview.com/',
      difficulty: 'Intermediate',
      topics: ['Interview Questions', 'Problem Solving', 'System Design']
    },
    {
      id: 6,
      title: 'Abdul Bari Algorithms',
      type: 'video',
      category: 'algorithms',
      description: 'Algorithm analysis and design course',
      author: 'Abdul Bari',
      rating: 4.8,
      users: 34500,
      url: 'https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
      difficulty: 'Intermediate',
      topics: ['Algorithm Analysis', 'Complexity', 'Design Patterns']
    },
    {
      id: 7,
      title: 'Dynamic Programming Patterns',
      type: 'article',
      category: 'patterns',
      description: 'Complete guide to DP patterns and techniques',
      author: 'Aditya Verma',
      rating: 4.9,
      users: 12300,
      url: 'https://www.youtube.com/watch?v=nqowUJzG-iM&list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go',
      difficulty: 'Advanced',
      topics: ['Dynamic Programming', 'Optimization', 'Problem Solving']
    },
    {
      id: 8,
      title: 'System Design Primer',
      type: 'article',
      category: 'system-design',
      description: 'Learn how to design large-scale systems',
      author: 'Donne Martin',
      rating: 4.7,
      users: 89200,
      url: 'https://github.com/donnemartin/system-design-primer',
      difficulty: 'Advanced',
      topics: ['System Design', 'Scalability', 'Architecture']
    },
    {
      id: 9,
      title: 'CS50 Introduction to Computer Science',
      type: 'course',
      category: 'fundamentals',
      description: 'Harvard\'s introduction to computer science',
      author: 'David J. Malan',
      rating: 4.9,
      users: 156000,
      url: 'https://cs50.harvard.edu/x/',
      difficulty: 'Beginner',
      topics: ['Computer Science', 'Programming', 'Fundamentals']
    },
    {
      id: 10,
      title: 'Competitive Programming Handbook',
      type: 'book',
      category: 'competitive',
      description: 'Guide to competitive programming and contests',
      author: 'Antti Laaksonen',
      rating: 4.6,
      users: 23400,
      url: 'https://cses.fi/book/book.pdf',
      difficulty: 'Advanced',
      topics: ['Competitive Programming', 'Algorithms', 'Mathematics']
    }
  ]

  const categories = ['all', 'algorithms', 'course', 'patterns', 'interview', 'system-design', 'fundamentals', 'competitive']
  const types = ['all', 'book', 'video', 'article', 'course']

  const filteredResources = resources.filter(resource => {
    if (!resource) return false;
    const term = (searchTerm || '').toLowerCase();
    const matchesSearch = (resource.title || '').toLowerCase().includes(term) ||
      (resource.author || '').toLowerCase().includes(term) ||
      (resource.description || '').toLowerCase().includes(term) ||
      (resource.topics || []).some(topic => (topic || '').toLowerCase().includes(term));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'book': return <BookOpen className="h-5 w-5" />
      case 'video': return <Play className="h-5 w-5" />
      case 'course': return <GraduationCap className="h-5 w-5" />
      case 'article': return <FileText className="h-5 w-5" />
      default: return <BookOpen className="h-5 w-5" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'book': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'video': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'course': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'article': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <div className={`text-center mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-primary to-purple-600 rounded-2xl shadow-lg">
                <Library className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Learning Resources & Cheat Sheet
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Curated books, courses, and Big-O complexity cheat sheets for technical interview preparation.
            </p>

            {/* Sub-Tab Bar: Resources | DSA Cheat Sheet */}
            <div className="flex justify-center mt-6">
              <div className="p-1 bg-white/5 border border-white/10 rounded-full shadow-lg flex gap-1">
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === 'resources'
                      ? 'bg-primary text-primary-foreground shadow'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  📚 Curated Resources
                </button>
                <button
                  onClick={() => setActiveTab('cheatsheet')}
                  className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === 'cheatsheet'
                      ? 'bg-primary text-primary-foreground shadow'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  ⚡ Big-O & Pattern Cheat Sheet
                </button>
              </div>
            </div>
          </div>

          {/* TAB 1: CURATED RESOURCES */}
          {activeTab === 'resources' && (
            <>
              {/* Search and Filters */}
              <Card className={`glass-dark border-0 shadow-2xl mb-8 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search resources, authors, or topics..."
                        className="pl-12 h-12 bg-background/50 border-white/20 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                        <Filter className="h-4 w-4 text-white" />
                      </div>
                      <select
                        className="px-4 py-3 bg-background/50 border border-white/20 rounded-xl focus:border-primary/50 focus:ring-primary/20 min-w-[160px]"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {categories.map(category => (
                          <option key={category} value={category} className="bg-background">
                            {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <select
                        className="px-4 py-3 bg-background/50 border border-white/20 rounded-xl focus:border-primary/50 focus:ring-primary/20 min-w-[120px]"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        {types.map(type => (
                          <option key={type} value={type} className="bg-background">
                            {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources Grid */}
              <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${mounted ? 'animate-stagger-in' : 'opacity-0'}`}>
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="glass-dark border-0 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group flex flex-col justify-between">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-xl ${getTypeColor(resource.type)}`}>
                            {getTypeIcon(resource.type)}
                          </div>
                          <Badge className={`${getTypeColor(resource.type)} px-3 py-1 rounded-xl`}>
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          </Badge>
                        </div>
                        <Badge className={`px-3 py-1 rounded-xl ${resource.difficulty.includes('Beginner') ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                            resource.difficulty.includes('Intermediate') ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                              'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                          {resource.difficulty}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-all duration-300">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/80 mb-4">by {resource.author}</p>

                      <p className="text-muted-foreground/90 text-sm mb-5 line-clamp-3 leading-relaxed">
                        {resource.description}
                      </p>

                      <div className="mb-5">
                        <div className="flex flex-wrap gap-2">
                          {resource.topics.slice(0, 3).map((topic, index) => (
                            <Badge key={index} className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-1">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1.5">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{resource.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Users className="h-4 w-4 text-blue-400" />
                            <span className="text-muted-foreground">{resource.users.toLocaleString()}</span>
                          </div>
                        </div>

                        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 font-bold text-xs">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            View <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* TAB 2: BIG-O & PATTERNS CHEAT SHEET */}
          {activeTab === 'cheatsheet' && (
            <div className="space-y-8 animate-fade-in">

              {/* Data Structures Complexity */}
              <Card className="glass-dark border-0 shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-4">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Table className="w-5 h-5 text-emerald-400" /> Data Structure Operations Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-3 text-left">Data Structure</th>
                        <th className="px-6 py-3 text-left">Access</th>
                        <th className="px-6 py-3 text-left">Search</th>
                        <th className="px-6 py-3 text-left">Insertion</th>
                        <th className="px-6 py-3 text-left">Deletion</th>
                        <th className="px-6 py-3 text-left">Space Complexity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {cheatSheetData.dataStructures.map((ds, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-3.5 font-sans font-semibold text-foreground">{ds.name}</td>
                          <td className="px-6 py-3.5 text-emerald-400">{ds.access}</td>
                          <td className="px-6 py-3.5 text-yellow-400">{ds.search}</td>
                          <td className="px-6 py-3.5 text-blue-400">{ds.insert}</td>
                          <td className="px-6 py-3.5 text-purple-400">{ds.delete}</td>
                          <td className="px-6 py-3.5 text-gray-300">{ds.space}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Sorting Algorithms Complexity */}
              <Card className="glass-dark border-0 shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-4">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-400" /> Sorting Algorithms Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-3 text-left">Algorithm</th>
                        <th className="px-6 py-3 text-left">Best Time</th>
                        <th className="px-6 py-3 text-left">Average Time</th>
                        <th className="px-6 py-3 text-left">Worst Time</th>
                        <th className="px-6 py-3 text-left">Space</th>
                        <th className="px-6 py-3 text-left">Stable</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {cheatSheetData.sorting.map((algo, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-3.5 font-sans font-semibold text-foreground">{algo.name}</td>
                          <td className="px-6 py-3.5 text-emerald-400">{algo.best}</td>
                          <td className="px-6 py-3.5 text-yellow-400">{algo.avg}</td>
                          <td className="px-6 py-3.5 text-red-400">{algo.worst}</td>
                          <td className="px-6 py-3.5 text-gray-300">{algo.space}</td>
                          <td className="px-6 py-3.5 font-sans text-xs">
                            <span className={`px-2 py-0.5 rounded font-bold ${algo.stable === 'Yes' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                              {algo.stable}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Common Dynamic Programming Patterns */}
              <Card className="glass-dark border-0 shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-4">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-400" /> Key Dynamic Programming Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {cheatSheetData.dpPatterns.map((dp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-base text-foreground mb-1">{dp.pattern}</h4>
                        <p className="text-xs text-muted-foreground">e.g. {dp.example}</p>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20">Time: {dp.time}</span>
                        <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">Space: {dp.space}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Resources
