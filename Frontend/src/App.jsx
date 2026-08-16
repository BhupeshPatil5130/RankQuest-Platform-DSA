import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Sheets from './pages/Sheets';
import SheetDetail from './pages/SheetDetail';
import ProblemSolver from './pages/ProblemSolver';
import Rankings from './pages/Rankings';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import CodePlayground from './pages/CodePlayground';
import Patterns from './pages/Patterns';
import PatternDetail from './pages/PatternDetail';
import PlacementSheet from './pages/PlacementSheet';
import { useAuth } from './contexts/AuthContext';

/**
 * SmartHome — shows the marketing landing page for guests,
 * and the personal Dashboard for authenticated users.
 */
function SmartHome() {
  const { isAuthenticated, loading } = useAuth();
  // Wait for auth check to avoid flash
  if (loading) return null;
  return isAuthenticated ? <Dashboard /> : <Home />;
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Routes>
          {/* Smart root: guest → Home landing, auth → Dashboard */}
          <Route path="/" element={<SmartHome />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Auth Pages */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public Pages */}
          <Route path="/patterns"      element={<Patterns />} />
          <Route path="/sheets"        element={<Sheets />} />
          <Route path="/placement"     element={<PlacementSheet />} />
          <Route path="/rankings"      element={<Rankings />} />
          <Route path="/resources"     element={<Resources />} />
          <Route path="/playground"    element={<CodePlayground />} />

          {/* Pattern Detail — requires login to track progress */}
          <Route path="/patterns/:slug" element={<ProtectedRoute><PatternDetail /></ProtectedRoute>} />

          {/* Protected Pages */}
          <Route path="/sheets/:sheetId"    element={<ProtectedRoute><SheetDetail /></ProtectedRoute>} />
          <Route path="/problem/:problemId" element={<ProtectedRoute><ProblemSolver /></ProtectedRoute>} />
          <Route path="/profile"            element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings"           element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;