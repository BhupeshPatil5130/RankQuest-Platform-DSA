import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  User, Bell, Palette, Shield, Save, CheckCircle,
  Moon, Sun, Trash2, Mail
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/useToast';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Profile Form State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    college: user?.college || '',
    bio: user?.bio || '',
    rollNumber: user?.rollNumber || '',
    branch: user?.branch || '',
    year: user?.year || ''
  });

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
        year: user.year || ''
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateProfile(formData);

      if (result.success) {
        toast({
          title: "Profile Updated ✨",
          description: "Your profile details have been saved successfully.",
          variant: "success"
        });
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "Could not save changes.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and profile details.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <Card className="glass-dark border-0 h-fit lg:w-64 shrink-0 overflow-hidden sticky top-24">
            <div className="p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                      ? 'bg-primary/10 text-primary shadow-sm font-bold'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">

            {/* PROFILE SETTINGS */}
            {activeTab === 'profile' && (
              <Card className="glass-dark border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your name, institution, and personal bio.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                        {(formData.fullName || formData.username || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{formData.fullName || formData.username || 'Developer'}</h3>
                        <p className="text-xs text-muted-foreground">@{formData.username}</p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alex Johnson"
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className="bg-white/5 border-white/10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>College / Institution</Label>
                        <Input
                          value={formData.college}
                          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                          placeholder="e.g. IIT Bombay"
                          className="bg-white/5 border-white/10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Roll Number</Label>
                        <Input
                          value={formData.rollNumber}
                          onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                          placeholder="e.g. CS21B045"
                          className="bg-white/5 border-white/10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Branch</Label>
                        <Input
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          placeholder="e.g. Computer Science"
                          className="bg-white/5 border-white/10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Year of Study</Label>
                        <Input
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          placeholder="e.g. 3rd Year"
                          className="bg-white/5 border-white/10"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={formData.email}
                            disabled
                            className="pl-9 bg-white/5 border-white/10 opacity-60 cursor-not-allowed text-xs font-mono"
                          />
                        </div>
                        <p className="text-[11px] text-muted-foreground">Email is tied to your account login.</p>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Bio / About You</Label>
                        <textarea
                          className="flex min-h-[90px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 resize-none"
                          placeholder="Tell the community about your DSA goals, target companies, or tech stack..."
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 font-bold px-6">
                        {loading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* APPEARANCE SETTINGS */}
            {activeTab === 'appearance' && (
              <Card className="glass-dark border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the interface theme.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-white/5 ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'}`}
                      onClick={() => setTheme('light')}
                    >
                      <div className="mb-3 rounded-lg bg-[#f0f0f0] p-4 aspect-video flex items-center justify-center">
                        <Sun className="h-8 w-8 text-orange-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">Light Mode</span>
                        {theme === 'light' && <CheckCircle className="h-4 w-4 text-primary" />}
                      </div>
                    </div>

                    <div
                      className={`cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-white/5 ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'}`}
                      onClick={() => setTheme('dark')}
                    >
                      <div className="mb-3 rounded-lg bg-[#1a1a1a] p-4 aspect-video flex items-center justify-center">
                        <Moon className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">Dark Mode</span>
                        {theme === 'dark' && <CheckCircle className="h-4 w-4 text-primary" />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <Card className="glass-dark border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your email preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Weekly Progress Report", desc: "Get a summary of your coding activity every Monday." },
                    { title: "Streak Reminders", desc: "Receive a notification if you are close to breaking your daily streak." },
                    { title: "Security Alerts", desc: "Get notified about important account logins." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="space-y-0.5">
                        <h4 className="font-medium text-sm text-foreground">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors">
                          <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200" />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* ACCOUNT SETTINGS */}
            {activeTab === 'account' && (
              <Card className="glass-dark border-0 border-l-4 border-l-red-500 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-red-400">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div>
                      <h4 className="font-bold text-sm text-red-200">Delete Account</h4>
                      <p className="text-xs text-red-300/70">Permanently remove your account and all submission data.</p>
                    </div>
                    <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 font-bold">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;