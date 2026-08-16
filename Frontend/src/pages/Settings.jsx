import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Bell, Palette, Shield, Save, CheckCircle, Moon, Sun, Trash2, Mail, School, Sparkles } from 'lucide-react';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/useToast';

const tabs = [
  { id: 'profile', label: 'Profile Info', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'account', label: 'Account & Security', icon: Shield },
];

const inputCls =
  'w-full h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    college: user?.college || '',
    bio: user?.bio || '',
    rollNumber: user?.rollNumber || '',
    branch: user?.branch || '',
    year: user?.year || '',
  });

  useEffect(() => {
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
  }, [location.state]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        college: user.college || '',
        bio: user.bio || '',
        rollNumber: user.rollNumber || '',
        branch: user.branch || '',
        year: user.year || '',
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const r = await updateProfile(formData).catch(() => ({ success: false, error: 'Network error' }));
    setLoading(false);
    if (r.success) {
      toast({ title: 'Profile updated ✨', description: 'Your changes have been saved.', variant: 'success' });
    } else {
      toast({ title: 'Update failed', description: r.error, variant: 'destructive' });
    }
  };

  const set = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your personal details, academic institution, and interface theme.
        </p>
      </div>

      {/* Horizontal Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="workspace-card p-6 sm:p-8">
        {/* Profile Info */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Profile Information</h2>
              <p className="text-xs text-slate-500">Your public profile name and college ranking association.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</Label>
                <input className={inputCls} value={formData.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Alex Johnson" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Username</Label>
                <input className={inputCls} value={formData.username} onChange={(e) => set('username', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">College / Institution</Label>
                <input className={inputCls} value={formData.college} onChange={(e) => set('college', e.target.value)} placeholder="IIT Bombay / Stanford" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Roll / Student ID</Label>
                <input className={inputCls} value={formData.rollNumber} onChange={(e) => set('rollNumber', e.target.value)} placeholder="CS21B045" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Branch / Major</Label>
                <input className={inputCls} value={formData.branch} onChange={(e) => set('branch', e.target.value)} placeholder="Computer Science" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Year of Study</Label>
                <input className={inputCls} value={formData.year} onChange={(e) => set('year', e.target.value)} placeholder="3rd Year" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address (Read-only)</Label>
                <input className={`${inputCls} bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed`} value={formData.email} disabled />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bio</Label>
                <textarea
                  className="w-full h-24 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all"
                  placeholder="DSA aspirant aiming for Tier 1 tech companies..."
                  value={formData.bio}
                  onChange={(e) => set('bio', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-60"
              >
                <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        )}

        {/* Appearance */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Interface Theme</h2>
              <p className="text-xs text-slate-500">Choose between light and dark workspace themes.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  theme === 'light'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="h-24 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-3">
                  <Sun className="w-8 h-8 text-amber-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Light Mode</span>
                  {theme === 'light' && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                </div>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  theme === 'dark'
                    ? 'border-indigo-600 bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="h-24 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-3">
                  <Moon className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode</span>
                  {theme === 'dark' && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Email Reminders</h2>
              <p className="text-xs text-slate-500">Configure your study cadence and streak protection alerts.</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Daily Streak Protector', desc: 'Get a notification 2 hours before your daily streak resets.' },
                { title: 'Weekly Progress Digest', desc: 'Receive a performance report of solved patterns every Monday.' },
                { title: 'Leaderboard Updates', desc: 'Notify when peers in your college overtake your ranking.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Account & Security */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-rose-600 dark:text-rose-400">Danger Zone</h2>
              <p className="text-xs text-slate-500">Irreversible actions for your RankQuest account.</p>
            </div>
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-rose-700 dark:text-rose-300">Delete Account and Submissions</p>
                <p className="text-[11px] text-rose-500 dark:text-rose-400">Permanently delete your profile and all solved problem logs.</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-sm shrink-0">
                <Trash2 className="w-3.5 h-3.5 inline mr-1" /> Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}