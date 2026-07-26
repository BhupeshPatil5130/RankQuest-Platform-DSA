import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Bell, Palette, Shield, Save, CheckCircle, Moon, Sun, Trash2, Mail } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/useToast';

const tabs = [
  { id: 'profile',       label: 'Profile',       icon: User,    color: 'text-indigo-500' },
  { id: 'appearance',    label: 'Appearance',     icon: Palette, color: 'text-purple-500' },
  { id: 'notifications', label: 'Notifications',  icon: Bell,    color: 'text-amber-500' },
  { id: 'account',       label: 'Account',        icon: Shield,  color: 'text-rose-500' },
];

const inputCls = 'w-full h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme }     = useTheme();
  const { toast }               = useToast();
  const location                = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');
  const [loading,   setLoading]   = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '', username: user?.username || '',
    email: user?.email || '', college: user?.college || '',
    bio: user?.bio || '', rollNumber: user?.rollNumber || '',
    branch: user?.branch || '', year: user?.year || '',
  });

  useEffect(() => {
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
  }, [location.state]);

  useEffect(() => {
    if (user) setFormData({ fullName: user.fullName||'', username: user.username||'', email: user.email||'',
      college: user.college||'', bio: user.bio||'', rollNumber: user.rollNumber||'', branch: user.branch||'', year: user.year||'' });
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const r = await updateProfile(formData).catch(() => ({ success: false, error: 'Network error' }));
    setLoading(false);
    r.success
      ? toast({ title: 'Profile updated ✨', description: 'Saved successfully.', variant: 'success' })
      : toast({ title: 'Update failed', description: r.error, variant: 'destructive' });
  };

  const set = (k, v) => setFormData(p => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences and profile details.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 space-y-1 h-fit lg:w-56 shrink-0 shadow-sm">
            {tabs.map(({ id, label, icon: Icon, color }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all
                  ${activeTab === id ? `bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 font-bold` : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                <Icon className={`w-4 h-4 ${activeTab === id ? color : ''}`} />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">

            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="font-extrabold text-slate-900 dark:text-white">Profile Information</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Update your name, institution, and personal bio.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                    {(formData.fullName || formData.username || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{formData.fullName || formData.username || 'Developer'}</h3>
                    <p className="text-xs text-slate-400">@{formData.username}</p>
                  </div>
                </div>
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</Label>
                      <input className={inputCls} value={formData.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Alex Johnson" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Username</Label>
                      <input className={inputCls} value={formData.username} onChange={e => set('username', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">College</Label>
                      <input className={inputCls} value={formData.college} onChange={e => set('college', e.target.value)} placeholder="IIT Bombay" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Roll Number</Label>
                      <input className={inputCls} value={formData.rollNumber} onChange={e => set('rollNumber', e.target.value)} placeholder="CS21B045" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Branch</Label>
                      <input className={inputCls} value={formData.branch} onChange={e => set('branch', e.target.value)} placeholder="Computer Science" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Year of Study</Label>
                      <input className={inputCls} value={formData.year} onChange={e => set('year', e.target.value)} placeholder="3rd Year" />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input className={`${inputCls} pl-9 opacity-60 cursor-not-allowed`} value={formData.email} disabled />
                      </div>
                      <p className="text-[11px] text-slate-400">Email is tied to your account and cannot be changed.</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bio</Label>
                      <textarea
                        className="w-full min-h-[80px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all resize-none"
                        placeholder="Tell the community about your DSA goals and target companies..."
                        value={formData.bio} onChange={e => set('bio', e.target.value)} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" disabled={loading}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all disabled:opacity-60">
                      {loading ? 'Saving…' : <><Save className="w-4 h-4" /> Save Changes</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
                <div>
                  <h2 className="font-extrabold text-slate-900 dark:text-white">Appearance</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Customize the interface theme.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={() => setTheme('light')}
                    className={`rounded-2xl border-2 p-5 text-left transition-all hover:-translate-y-0.5 ${theme === 'light' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                    <div className="mb-3 h-24 rounded-xl bg-gradient-to-br from-slate-100 to-white flex items-center justify-center border border-slate-200 shadow-inner">
                      <Sun className="w-8 h-8 text-amber-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">☀️ Light Mode</span>
                      {theme === 'light' && <CheckCircle className="w-4 h-4 text-indigo-500" />}
                    </div>
                  </button>
                  <button onClick={() => setTheme('dark')}
                    className={`rounded-2xl border-2 p-5 text-left transition-all hover:-translate-y-0.5 ${theme === 'dark' ? 'border-indigo-500 bg-indigo-950/30' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                    <div className="mb-3 h-24 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                      <Moon className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">🌙 Dark Mode</span>
                      {theme === 'dark' && <CheckCircle className="w-4 h-4 text-indigo-500" />}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
                <div>
                  <h2 className="font-extrabold text-slate-900 dark:text-white">Notifications</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage your email preferences.</p>
                </div>
                {[
                  { title: 'Weekly Progress Report', desc: 'Get a summary of your coding activity every Monday.', color: 'bg-indigo-500' },
                  { title: 'Streak Reminders',        desc: 'Get notified if you are close to breaking your daily streak.', color: 'bg-amber-500' },
                  { title: 'Security Alerts',         desc: 'Get notified about important account logins.', color: 'bg-rose-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                    <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full ${item.color} shadow-sm`}>
                      <span className="translate-x-4 inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Danger Zone */}
            {activeTab === 'account' && (
              <div className="bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-800/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
                <div>
                  <h2 className="font-extrabold text-rose-600 dark:text-rose-400">⚠️ Danger Zone</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Irreversible actions for your account.</p>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-rose-700 dark:text-rose-300">Delete Account</h4>
                    <p className="text-xs text-rose-500 dark:text-rose-400/80">Permanently remove your account and all submission data.</p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}