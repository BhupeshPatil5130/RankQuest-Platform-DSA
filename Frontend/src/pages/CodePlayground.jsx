import { useState, useEffect } from 'react';
import { Play, Code2, Terminal, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import CodeEditor from '../components/CodeEditor';
import { JUDGE0_API_KEY } from '../services/apiService';

const languageApiMap = {
  javascript: 93,
  python: 71,
  java: 62,
  cpp: 54
};

const codeTemplates = {
  python: `print("Hello, Playground!")`,
  javascript: `console.log("Hello, Playground!");`,
  java: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, Playground!");\n\t}\n}`,
  cpp: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, Playground!" << std::endl;\n\treturn 0;\n}`
};

const CodePlayground = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(codeTemplates.python);
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCode(codeTemplates[language]);
    setOutput('');
  }, [language]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing...');

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageApiMap[language],
        stdin: userInput
      })
    };

    try {
      const submissionResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*', options);
      const submissionResult = await submissionResponse.json();
      const token = submissionResult.token;

      if (!token) {
        throw new Error('Failed to get execution token.');
      }

      let finalResult;
      let attempts = 0;
      while (attempts < 10) {
        await new Promise(res => setTimeout(res, 1500));
        const resultResponse = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false&fields=*`,
          { headers: { 'X-RapidAPI-Key': JUDGE0_API_KEY, 'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com' } }
        );
        finalResult = await resultResponse.json();
        if (finalResult.status_id > 2) break;
        attempts++;
      }
      
      if (finalResult.stdout) setOutput(finalResult.stdout);
      else if (finalResult.stderr) setOutput(`Runtime Error:\n${finalResult.stderr}`);
      else if (finalResult.compile_output) setOutput(`Compilation Error:\n${finalResult.compile_output}`);
      else setOutput(`Execution Finished: ${finalResult.status?.description || 'Done'}`);

    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Code Playground</h1>
            <p className="text-muted-foreground text-sm">Run code snippets instantly in multiple languages</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/50 text-foreground"
            >
              <option value="python" className="bg-background">Python 3</option>
              <option value="javascript" className="bg-background">JavaScript (Node.js)</option>
              <option value="java" className="bg-background">Java 17</option>
              <option value="cpp" className="bg-background">C++ 17</option>
            </select>
            <Button
              onClick={runCode}
              disabled={isRunning}
              className="bg-emerald-600 hover:bg-emerald-700 font-bold px-5 rounded-xl gap-2"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Executing...' : 'Run Code'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Box */}
          <Card className="glass-dark border-0 shadow-2xl flex flex-col h-[650px]">
            <CardHeader className="py-3 px-6 border-b border-white/10 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" /> Source Code
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCode(codeTemplates[language])}
                className="text-xs text-muted-foreground hover:text-foreground gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <CodeEditor language={language} value={code} onChange={setCode} />
            </CardContent>
          </Card>

          {/* Stdin & Output Box */}
          <div className="flex flex-col gap-6 h-[650px]">
            {/* Custom Input */}
            <Card className="glass-dark border-0 shadow-xl flex-1 flex flex-col min-h-0">
              <CardHeader className="py-3 px-6 border-b border-white/10">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" /> Custom Input (stdin)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter custom input arguments here..."
                  className="w-full h-full p-3 bg-black/30 border border-white/10 rounded-xl font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
                />
              </CardContent>
            </Card>

            {/* Program Output */}
            <Card className="glass-dark border-0 shadow-xl flex-[1.5] flex flex-col min-h-0">
              <CardHeader className="py-3 px-6 border-b border-white/10">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" /> Output
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-1 bg-black/40 overflow-auto custom-scrollbar rounded-b-2xl">
                <pre className="w-full h-full font-mono text-sm text-foreground whitespace-pre-wrap">
                  {output || <span className="text-muted-foreground/50">Run your code to see the output here...</span>}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;