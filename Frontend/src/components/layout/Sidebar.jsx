import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  Trophy,
  Code2,
  Zap,
  Sparkles,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../hooks/useToast';

const mainNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, exact: true },
  { name: 'DSA Patterns', href: '/patterns', icon: Target },
  { name: 'Curated Sheets', href: '/sheets', icon: BookOpen },
  { name: 'Placement Prep', href: '/placement', icon: GraduationCap },
  { name: 'Leaderboard', href: '/rankings', icon: Trophy },
];

const secondaryNavigation = [
  { name: 'Playground', href: '/playground', icon: Code2 },
  { name: 'Resources', href: '/resources', icon: Zap },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out', description: 'See you next time!' });
    navigate('/login');
    setMobileOpen(false);
  };

  const name = user?.fullName || user?.username || 'Developer';
  const initial = name.charAt(0).toUpperCase();

  const renderNavLinks = (items) => (
    <div className="space-y-1.5">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact
          ? location.pathname === item.href
          : location.pathname.startsWith(item.href) && item.href !== '/';

        return (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? item.name : undefined}
            className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 dark:shadow-indigo-900/40'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
            }`}
          >
            <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
            {!collapsed && <span className="truncate">{item.name}</span>}
            {isActive && !collapsed && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
            )}
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none ${
          collapsed ? 'w-[78px]' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header / Brand */}
        <div className="h-18 flex items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-800/80">
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    RankQuest
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/50">
                    Pro
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">DSA Mastery Engine</span>
              </div>
            )}
          </NavLink>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          <div>
            {!collapsed && (
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Core Curriculum
              </p>
            )}
            {renderNavLinks(mainNavigation)}
          </div>

          <div>
            {!collapsed && (
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Practice Tools
              </p>
            )}
            {renderNavLinks(secondaryNavigation)}
          </div>

          {/* Floating Pro/Upgrade card (when expanded) */}
          {!collapsed && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/50 dark:border-indigo-800/40 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Pattern Roadmap</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                15 patterns structured from beginner to advanced.
              </p>
              <NavLink
                to="/patterns"
                onClick={() => setMobileOpen(false)}
                className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
              >
                View Roadmaps →
              </NavLink>
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                {!collapsed && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500 shrink-0" />
                {!collapsed && <span>Dark Mode</span>}
              </>
            )}
          </button>

          {/* User Account / Profile */}
          {isAuthenticated ? (
            <div className="pt-1 border-t border-slate-100 dark:border-slate-800/60">
              <div className={`flex items-center gap-3 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 ${collapsed ? 'justify-center p-1.5' : ''}`}>
                <NavLink
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 min-w-0 flex-1 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-extrabold text-xs flex items-center justify-center shadow shrink-0">
                    {initial}
                  </div>
                  {!collapsed && (
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {user?.college || 'Student'}
                      </p>
                    </div>
                  )}
                </NavLink>

                {!collapsed && (
                  <div className="flex items-center gap-0.5 shrink-0">
                    <NavLink
                      to="/settings"
                      onClick={() => setMobileOpen(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
                      title="Settings"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-1.5 pt-1">
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                <User className="w-4 h-4" />
                {!collapsed && <span>Sign In</span>}
              </NavLink>
              {!collapsed && (
                <NavLink
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/20 transition-all"
                >
                  Create Account
                </NavLink>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
