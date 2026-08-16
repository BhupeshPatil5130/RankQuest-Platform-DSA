import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
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

function SmartHome() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Dashboard /> : <Home />;
}

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check if current route is guest landing or auth pages where standalone layout is better
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isGuestLanding = location.pathname === '/' && !isAuthenticated;
  const isStandalone = isAuthPage || isGuestLanding;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {isStandalone ? (
        // Full page layout for login, register & guest landing
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<SmartHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      ) : (
        // Workspace layout with Fixed Sidebar and Dynamic TopBar
        <div className="flex-1 flex">
          {/* Left Sidebar */}
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          {/* Right Main Container */}
          <div
            className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
              collapsed ? 'lg:pl-[78px]' : 'lg:pl-64'
            }`}
          >
            {/* Top Workspace Bar */}
            <TopBar onOpenMobileMenu={() => setMobileOpen(true)} />

            {/* Page Content View */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
              <Routes>
                <Route path="/" element={<SmartHome />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Public / In-app routes */}
                <Route path="/patterns" element={<Patterns />} />
                <Route path="/sheets" element={<Sheets />} />
                <Route path="/placement" element={<PlacementSheet />} />
                <Route path="/rankings" element={<Rankings />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/playground" element={<CodePlayground />} />

                {/* Pattern & Problem Details */}
                <Route path="/patterns/:slug" element={<ProtectedRoute><PatternDetail /></ProtectedRoute>} />
                <Route path="/sheets/:sheetId" element={<ProtectedRoute><SheetDetail /></ProtectedRoute>} />
                <Route path="/problem/:problemId" element={<ProtectedRoute><ProblemSolver /></ProtectedRoute>} />

                {/* User Settings & Profile */}
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;