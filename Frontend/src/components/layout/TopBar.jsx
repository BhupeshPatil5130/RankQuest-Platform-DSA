import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Flame,
  Trophy,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Code2,
  Sparkles,
  Target
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useDailySolved } from '../../hooks/useDailySolved';
import { useToast } from '../../hooks/useToast';

const pathTitles = {
  '/': 'Dashboard Overview',
  '/patterns': 'DSA Patterns Roadmap',
  '/sheets': 'Curated SDE Sheets',
  '/placement': '10x10 Placement Prep',
  '/rankings': 'Global & College Leaderboards',
  '/playground': 'Interactive Code Playground',
  '/resources': 'Developer Resources',
  '/profile': 'My Developer Profile',
  '/settings': 'Account Settings',
};

export default function TopBar({ onOpenMobileMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { streak, solvedToday } = useDailySolved();
  const { toast } = useToast();

  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out', description: 'See you next time!' });
    navigate('/login');
    setUserDropdown(false);
  };

  const getPageTitle = () => {
    if (pathTitles[location.pathname]) return pathTitles[location.pathname];
    if (location.pathname.startsWith('/patterns/')) return 'Pattern Roadmap';
    if (location.pathname.startsWith('/sheets/')) return 'SDE Problem Sheet';
    if (location.pathname.startsWith('/problem/')) return 'Code Workspace';
    return 'RankQuest Platform';
  };

  const name = user?.fullName || user?.username || 'Developer';
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-all">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right: Quick Stats, Theme Toggle, User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quick Streak Pill */}
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 text-xs font-bold shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>{streak}d Streak</span>
            </div>
          )}

          {/* Quick Practice Link */}
          <Link
            to="/patterns"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700 text-xs font-bold transition-all"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Patterns</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-transform active:scale-95"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* Profile Dropdown or Auth buttons */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-slate-50 dark:bg-slate-800 transition-all text-left"
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                  {initial}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                  {name.split(' ')[0]}
                </span>
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-scale-in origin-top-right">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
