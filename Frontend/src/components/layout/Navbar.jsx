import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut, Code2, Trophy, BookOpen, Zap, Home, Moon, Sun, Target, Layers, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../hooks/useToast';

const navigation = [
  { name: 'Dashboard',       href: '/',           icon: Home,    activeColor: 'text-indigo-500',   bg: 'bg-indigo-500/10 border-indigo-300 dark:border-indigo-700' },
  { name: 'Patterns',        href: '/patterns',   icon: Target,  activeColor: 'text-purple-500',   bg: 'bg-purple-500/10 border-purple-300 dark:border-purple-700' },
  { name: 'DSA Sheets',      href: '/sheets',     icon: BookOpen,activeColor: 'text-emerald-500',  bg: 'bg-emerald-500/10 border-emerald-300 dark:border-emerald-700' },
  { name: 'Rankings',        href: '/rankings',   icon: Trophy,  activeColor: 'text-amber-500',    bg: 'bg-amber-500/10 border-amber-300 dark:border-amber-700' },
  { name: 'Resources',       href: '/resources',  icon: Zap,     activeColor: 'text-cyan-500',     bg: 'bg-cyan-500/10 border-cyan-300 dark:border-cyan-700' },
  { name: 'Playground',      href: '/playground', icon: Code2,   activeColor: 'text-pink-500',     bg: 'bg-pink-500/10 border-pink-300 dark:border-pink-700' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]         = useState(false);
  const [showUserMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme }           = useTheme();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out', description: 'See you next time!' });
    navigate('/');
    setShowMenu(false);
  };

  const isActive   = (p) => location.pathname === p;
  const name       = () => user?.fullName || user?.username || 'User';
  const initial    = () => name().charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
              RankQuest
            </span>
            <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              PRO
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navigation.map(({ name: n, href, icon: Icon, activeColor, bg }) => {
              const active = isActive(href);
              return (
                <Link key={n} to={href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all
                    ${active ? `${bg} ${activeColor} border shadow-sm` : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
                  <Icon className={`w-3.5 h-3.5 ${active ? activeColor : ''}`} />
                  {n}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Toggle theme">
            {theme === 'dark'
              ? <Sun className="w-4 h-4 text-amber-400" />
              : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setShowMenu(!showUserMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm">
                <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold flex items-center justify-center text-xs shadow">
                  {initial()}
                </span>
                <span className="max-w-[100px] truncate">{name()}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-hidden text-xs">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">{name()}</p>
                    <p className="text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setShowMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                    <User className="w-4 h-4 text-indigo-400" /> Profile
                  </Link>
                  <Link to="/settings" onClick={() => setShowMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    <Settings className="w-4 h-4 text-purple-400" /> Settings
                  </Link>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors border-t border-slate-100 dark:border-slate-800 font-semibold">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Sign In</Link>
              <Link to="/register" className="text-xs font-bold text-white px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/25 transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="absolute top-14 inset-x-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1 md:hidden shadow-xl z-40">
          {navigation.map(({ name: n, href, icon: Icon, activeColor }) => (
            <Link key={n} to={href} onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                ${isActive(href) ? `${activeColor} bg-slate-100 dark:bg-slate-800` : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
              <Icon className={`w-4 h-4 ${activeColor}`} /> {n}
            </Link>
          ))}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-2 mt-2 flex items-center gap-2">
            <button onClick={toggleTheme} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 px-3 py-2">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}