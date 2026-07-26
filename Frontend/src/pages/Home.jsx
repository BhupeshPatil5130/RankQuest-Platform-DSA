import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Target, BookOpen, Code2, Trophy, 
  Sparkles, Layers, Compass, CheckCircle2, Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 subtle-grid transition-colors">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <Compass className="w-4 h-4 text-indigo-500" />
            Pattern-Wise Learning Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Master Data Structures & Algorithms <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Pattern by Pattern</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop grinding 1000s of random LeetCode questions. Learn the 15 core algorithmic patterns in a proven sequential roadmap from beginner foundations to advanced mastery.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link to="/patterns">
              <Button size="lg" className="gradient-brand hover:opacity-95 text-white font-extrabold rounded-2xl text-xs sm:text-sm px-7 h-12 shadow-lg border-0">
                Start Pattern Roadmap <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>

            <Link to="/sheets">
              <Button size="lg" variant="outline" className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm px-7 h-12 shadow-sm font-semibold">
                <BookOpen className="mr-2 w-4 h-4 text-emerald-500" /> SDE Problem Sheets
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Card className="card-color-violet p-6 rounded-2xl space-y-3">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">15 Sequential Steps</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Proven roadmap from Two Pointers and Sliding Window to Dynamic Programming.
            </p>
          </Card>

          <Card className="card-color-emerald p-6 rounded-2xl space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">150 Curated Problems</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              10 handpicked questions per pattern linked to LeetCode and GeeksforGeeks.
            </p>
          </Card>

          <Card className="card-color-amber p-6 rounded-2xl space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 w-fit">
              <Trophy className="w-6 h-6" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">College Rankings</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Compete with peers from your college, track daily activity heatmaps, and showcase your rank.
            </p>
          </Card>

          <Card className="card-color-indigo p-6 rounded-2xl space-y-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 w-fit">
              <Code2 className="w-6 h-6" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Code Playground</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Run and test Python, Java, C++, and JavaScript directly in your browser.
            </p>
          </Card>
        </div>

        {/* CTA Box */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/80 p-8 text-center space-y-4 shadow-lg">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Ready to start your DSA journey?</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">Create a free account or sign in with Google to start tracking your daily progress.</p>
          <Link to="/register">
            <Button className="gradient-brand text-white font-extrabold text-xs px-7 h-11 rounded-xl border-0 shadow-md">
              Create Free Account <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;