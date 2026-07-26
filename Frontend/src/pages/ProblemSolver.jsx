import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Play, Send, RotateCcw, Code2, Terminal, Loader2, ArrowLeft, Tag, 
  CheckCircle, XCircle, Bookmark, ExternalLink, Copy, Download,
  Building2, Youtube, Clock, Pause, RefreshCw, History, FileText
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../hooks/useToast'
import CodeEditor from '../components/CodeEditor'
import { getProblemById, submitSolution as submitSolutionApi, JUDGE0_API_KEY } from '../services/apiService'

const languageApiMap = {
  javascript: 93,
  python: 71,
  java: 62,
  cpp: 54
};

const fileExtensions = {
  javascript: 'js',
  python: 'py',
  java: 'java',
  cpp: 'cpp'
};

const codeTemplates = {
  javascript: `// Write your solution here\nconsole.log("Hello from JavaScript!");`,
  python: `# Write your solution here\nprint("Hello from Python!")`,
  java: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello from Java!");\n\t}\n}`,
  cpp: `#include <iostream>\nint main() {\n\tstd::cout << "Hello from C++!" << std::endl;\n\treturn 0;\n}`
};

const difficultyConfig = {
  Easy: { className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', label: 'Easy' },
  Medium: { className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', label: 'Medium' },
  Hard: { className: 'bg-red-500/10 text-red-400 border-red-500/30', label: 'Hard' },
};

const getSubmissionKey = (pId) => `rankquest_submissions_${pId}`;

const ProblemSolver = () => {
  const { problemId } = useParams()
  const navigate = useNavigate()
  const { refreshUser } = useAuth()
  const { toast } = useToast()
  
  const [problem, setProblem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [code, setCode] = useState(codeTemplates.javascript)
  const [language, setLanguage] = useState('javascript')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [output, setOutput] = useState('')
  const [outputStatus, setOutputStatus] = useState(null)
  const [testResults, setTestResults] = useState([])
  const [activeTab, setActiveTab] = useState('description') // 'description' | 'testcases' | 'submissions'

  // Submissions history state
  const [submissionsHistory, setSubmissionsHistory] = useState([]);

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock Interview Timer State
  const [timerSeconds, setTimerSeconds] = useState(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            toast({ title: "⏰ Time's Up!", description: "Mock interview 45-minute timer has ended.", variant: "destructive" });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const toggleTimer = () => setIsTimerRunning(prev => !prev);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(45 * 60);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Fetch Problem Data & Submissions History
  useEffect(() => {
    const fetchProblem = async () => {
      if (!problemId) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProblemById(problemId);
        const problemData = data?.data || data;
        if (problemData && (problemData.id || problemData.title)) {
          setProblem(problemData);
          const bookmarks = JSON.parse(localStorage.getItem('rankquest_bookmarks') || '[]');
          setIsBookmarked(bookmarks.includes(Number(problemId)));
          
          // Load past submissions history
          const history = JSON.parse(localStorage.getItem(getSubmissionKey(problemId)) || '[]');
          setSubmissionsHistory(history);
        } else {
          throw new Error("Problem data not found");
        }
      } catch (err) {
        console.error("Error loading problem:", err);
        setError("Failed to load problem details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    setCode(codeTemplates[language] || '');
    setOutput('');
    setTestResults([]);
    setOutputStatus(null);
  }, [language]);

  const toggleBookmark = () => {
    const pId = Number(problemId);
    const bookmarks = JSON.parse(localStorage.getItem('rankquest_bookmarks') || '[]');
    let updated;
    if (bookmarks.includes(pId)) {
      updated = bookmarks.filter(id => id !== pId);
      setIsBookmarked(false);
      toast({ title: 'Removed from Revision List', variant: 'default' });
    } else {
      updated = [...bookmarks, pId];
      setIsBookmarked(true);
      toast({ title: 'Bookmarked for Revision! ⭐', description: 'Saved to your revision list.', variant: 'success' });
    }
    localStorage.setItem('rankquest_bookmarks', JSON.stringify(updated));
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({ title: 'Copied to Clipboard!', description: 'Solution code copied successfully.', variant: 'success' });
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `${problem?.title ? problem.title.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'solution'}.${fileExtensions[language] || 'txt'}`;
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded Solution', description: `Saved as ${filename}`, variant: 'success' });
  };

  const resetCode = () => {
    setCode(codeTemplates[language]);
    setOutput('');
    setTestResults([]);
    setOutputStatus(null);
  }

  const loadPastSubmission = (sub) => {
    setLanguage(sub.language);
    setCode(sub.code);
    toast({ title: 'Loaded Code!', description: `Restored submission from ${new Date(sub.timestamp).toLocaleTimeString()}`, variant: 'success' });
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);
    setOutputStatus(null);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageApiMap[language],
      })
    };

    try {
      const submissionResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*', options);
      if (!submissionResponse.ok) throw new Error('Code submission to Judge0 failed');
      const submissionResult = await submissionResponse.json();
      const submissionToken = submissionResult.token;
      if (!submissionToken) throw new Error('No submission token received');

      let finalResult;
      let attempts = 0;
      while (attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const resultResponse = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}?base64_encoded=false&fields=*`,
          { headers: { 'X-RapidAPI-Key': JUDGE0_API_KEY, 'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com' } }
        );
        finalResult = await resultResponse.json();
        if (finalResult.status_id > 2) break;
        attempts++;
      }

      if (finalResult.stdout) {
        setOutput(finalResult.stdout.trim());
        setOutputStatus('success');
        setTestResults([{ passed: true, actual: finalResult.stdout.trim() }]);
      } else if (finalResult.stderr) {
        setOutput(`Runtime Error:\n${finalResult.stderr}`);
        setOutputStatus('error');
        setTestResults([{ passed: false, actual: finalResult.stderr }]);
      } else if (finalResult.compile_output) {
        setOutput(`Compilation Error:\n${finalResult.compile_output}`);
        setOutputStatus('error');
        setTestResults([{ passed: false, actual: finalResult.compile_output }]);
      } else {
        setOutput(`Status: ${finalResult.status?.description || 'Unknown'}`);
        setOutputStatus(finalResult.status_id === 3 ? 'success' : 'error');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setOutputStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const submitSolution = async () => {
    if (testResults.length === 0) {
      toast({ 
        title: 'Run Code First', 
        description: 'Please run your code to verify output before submitting.', 
        variant: 'destructive' 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const passed = testResults.every(r => r.passed);
      const status = passed ? "ACCEPTED" : "WRONG_ANSWER";
      const submissionData = { code, language, status };
      
      const response = await submitSolutionApi(problemId, submissionData);
      
      // Log into local submission history
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status,
        language,
        code,
      };
      const updatedHistory = [newEntry, ...submissionsHistory];
      setSubmissionsHistory(updatedHistory);
      localStorage.setItem(getSubmissionKey(problemId), JSON.stringify(updatedHistory));

      if (response && response.success) {
        toast({
          title: status === "ACCEPTED" ? '🎉 Solution Accepted!' : '❌ Wrong Answer',
          description: status === "ACCEPTED" 
            ? 'Great job! Problem marked as solved.' 
            : 'Your output doesn\'t match. Keep trying!',
          variant: status === "ACCEPTED" ? 'default' : 'destructive'
        });
        if (status === "ACCEPTED") {
          await refreshUser();
          setTimeout(() => navigate('/sheets'), 2000);
        }
      } else {
        throw new Error(response?.message || "Submission failed");
      }
    } catch (error) {
      toast({ title: 'Submission Error', description: error.message || 'Failed to submit.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const getTestCases = () => {
    try {
      const raw = problem?.testCases || problem?.test_cases;
      if (!raw) return [];
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (e) {
      return [];
    }
  }

  const companiesList = problem?.companies ? problem.companies.split(',').map(c => c.trim()).filter(Boolean) : [];
  const tagsList = problem?.tags ? problem.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading problem details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Could not load problem</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button variant="outline" onClick={() => navigate('/sheets')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sheets
          </Button>
        </div>
      </div>
    );
  }

  const testCases = getTestCases();
  const diffCfg = difficultyConfig[problem?.difficulty] || difficultyConfig.Medium;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          {/* Right Toolbar: Interview Timer & Bookmark */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-xl text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span className={`font-bold ${timerSeconds < 300 ? 'text-red-400 animate-pulse' : 'text-orange-300'}`}>
                {formatTimer(timerSeconds)}
              </span>
              <button
                onClick={toggleTimer}
                className="hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                title={isTimerRunning ? 'Pause Timer' : 'Start Mock Timer'}
              >
                {isTimerRunning ? <Pause className="w-3 h-3 text-yellow-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
              </button>
              <button
                onClick={resetTimer}
                className="hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                title="Reset 45-Min Timer"
              >
                <RefreshCw className="w-3 h-3 text-gray-400" />
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleBookmark}
              className={`gap-2 border-white/10 ${isBookmarked ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {isBookmarked ? <Bookmark className="w-4 h-4 text-yellow-400 fill-yellow-400" /> : <Bookmark className="w-4 h-4" />}
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Problem Description / Examples / Submissions */}
          <Card className="glass-dark border-0 shadow-2xl flex flex-col max-h-[calc(100vh-140px)]">
            <CardHeader className="pb-3 flex-shrink-0 border-b border-white/10">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-3 leading-tight flex items-center gap-2">
                    {problem?.title}
                  </CardTitle>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={diffCfg.className}>{problem?.difficulty}</Badge>
                    {problem?.acceptance && (
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                        {problem.acceptance} Acceptance
                      </Badge>
                    )}
                    {problem?.topic && (
                      <Badge className="bg-white/5 text-gray-300 border-white/10 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {problem.topic}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Companies Tags */}
              {companiesList.length > 0 && (
                <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-muted-foreground flex items-center gap-1 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" /> Asked in:
                  </span>
                  {companiesList.map(comp => (
                    <span key={comp} className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                      {comp}
                    </span>
                  ))}
                </div>
              )}

              {/* External Resource Links */}
              <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
                {problem?.leetcodeUrl && (
                  <a
                    href={problem.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20 font-medium transition-colors"
                  >
                    LeetCode <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {problem?.gfgUrl && (
                  <a
                    href={problem.gfgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 font-medium transition-colors"
                  >
                    GeeksforGeeks <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {problem?.youtubeUrl && (
                  <a
                    href={problem.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 font-medium transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5" /> Video Solution <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Tab Bar: Description | Examples | Submissions */}
              <div className="flex gap-1 mt-4 p-1 bg-white/5 rounded-lg w-fit">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'testcases', label: `Examples (${testCases.length})` },
                  { id: 'submissions', label: `Submissions (${submissionsHistory.length})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      activeTab === tab.id 
                        ? 'bg-primary text-primary-foreground shadow' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="overflow-y-auto custom-scrollbar flex-1 p-6">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-sm">
                      {problem?.description || 'No description available.'}
                    </p>
                  </div>

                  {tagsList.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Related Concepts</span>
                      <div className="flex flex-wrap gap-1.5">
                        {tagsList.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'testcases' && (
                <div className="space-y-4">
                  {testCases.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">No example test cases available.</p>
                  ) : (
                    testCases.map((tc, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-white/10">
                        <div className="bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground">
                          Example {idx + 1}
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <span className="text-xs text-gray-400 font-medium">Input:</span>
                            <pre className="mt-1 text-sm font-mono text-blue-300 bg-blue-500/5 p-2 rounded-lg">{tc.input}</pre>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400 font-medium">Output:</span>
                            <pre className="mt-1 text-sm font-mono text-green-300 bg-green-500/5 p-2 rounded-lg">{tc.output}</pre>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Submissions Tab */}
              {activeTab === 'submissions' && (
                <div className="space-y-3">
                  {submissionsHistory.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No submissions recorded yet for this problem.</p>
                      <p className="text-xs text-gray-500 mt-1">Submit a solution to log your attempt history.</p>
                    </div>
                  ) : (
                    submissionsHistory.map((sub, idx) => (
                      <div
                        key={sub.id || idx}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {sub.status === 'ACCEPTED' ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-xs ${sub.status === 'ACCEPTED' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {sub.status === 'ACCEPTED' ? 'Accepted' : 'Wrong Answer'}
                              </span>
                              <Badge className="bg-white/10 text-gray-300 text-[10px] uppercase font-mono">
                                {sub.language}
                              </Badge>
                            </div>
                            <span className="text-[11px] text-muted-foreground">
                              {new Date(sub.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => loadPastSubmission(sub)}
                          className="h-8 px-3 text-xs border-white/10 hover:bg-primary/20 hover:text-primary gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> Restore Code
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* RIGHT: Code Editor & Export Toolbar */}
          <Card className="glass-dark border-0 shadow-2xl flex flex-col max-h-[calc(100vh-140px)]">
            <CardHeader className="p-4 flex-shrink-0 border-b border-white/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" /> Code Editor
                </CardTitle>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={copyCodeToClipboard} className="h-8 w-8 text-muted-foreground hover:text-white" title="Copy Code">
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={downloadCode} className="h-8 w-8 text-muted-foreground hover:text-white" title="Download Code">
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                  
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                  >
                    <option value="python" className="bg-background">Python</option>
                    <option value="javascript" className="bg-background">JavaScript</option>
                    <option value="java" className="bg-background">Java</option>
                    <option value="cpp" className="bg-background">C++</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={runCode}
                    disabled={isRunning}
                    className="bg-emerald-600 hover:bg-emerald-700 gap-2 text-xs font-bold"
                  >
                    {isRunning ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                    {isRunning ? 'Running...' : 'Run Code'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={submitSolution}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 gap-2 text-xs font-bold"
                  >
                    {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" onClick={resetCode} className="text-xs gap-1 text-muted-foreground hover:text-foreground">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 min-h-0">
                <CodeEditor
                  language={language}
                  value={code}
                  onChange={setCode}
                />
              </div>

              {output && (
                <div className="flex-shrink-0 border-t border-white/10">
                  <div className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold ${
                    outputStatus === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {outputStatus === 'success' 
                      ? <CheckCircle className="w-4 h-4" /> 
                      : <XCircle className="w-4 h-4" />
                    }
                    <Terminal className="w-3.5 h-3.5" />
                    Output
                  </div>
                  <pre className="p-4 text-sm font-mono text-foreground whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar bg-black/20">
                    {output}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProblemSolver