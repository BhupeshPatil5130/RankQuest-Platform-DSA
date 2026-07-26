import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Target, BookOpen, Code2, Trophy, 
  Sparkles, Layers, Compass, CheckCircle2, Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 subtle-grid">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Pattern-Wise Learning Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Master Data Structures & Algorithms <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pattern by Pattern</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Stop grinding 1000s of random LeetCode questions. Learn the 15 core algorithmic patterns in a proven sequential roadmap from beginner foundations to advanced mastery.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link to="/patterns">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm px-6 h-11 shadow-lg border-0">
                Start Pattern Roadmap <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>

            <Link to="/sheets">
              <Button size="lg" variant="outline" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800 rounded-xl text-xs sm:text-sm px-6 h-11">
                <BookOpen className="mr-2 w-4 h-4 text-emerald-400" /> SDE Problem Sheets
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-zinc-900/60 border-zinc-800/80 p-6 rounded-2xl space-y-3">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-indigo-400 w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-white">15 Sequential Patterns</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Step-by-step roadmap from Two Pointers and Sliding Window to Dynamic Programming and Graphs.
            </p>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800/80 p-6 rounded-2xl space-y-3">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 w-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-white">150 Handpicked Problems</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              10 curated questions per pattern with direct links to LeetCode and GeeksforGeeks.
            </p>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800/80 p-6 rounded-2xl space-y-3">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-400 w-fit">
              <Trophy className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-white">College Leaderboards</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Compete with peers from your college, track daily activity heatmaps, and showcase your rank.
            </p>
          </Card>
        </div>

        {/* CTA Box */}
        <div className="border border-zinc-800/80 rounded-2xl bg-zinc-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Ready to start your DSA journey?</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">Create a free account or sign in with Google to start tracking your daily progress.</p>
          <Link to="/register">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-6 h-10 rounded-xl border-0">
              Create Free Account <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;