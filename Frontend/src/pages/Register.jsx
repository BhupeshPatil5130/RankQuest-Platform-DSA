import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff, Mail, Lock, User, School, BookOpen, ArrowRight, Loader2, Layers, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const Field = ({ label, icon: Icon, error, iconColor = 'text-indigo-500', children }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
      <Icon className={`w-4 h-4 ${iconColor}`} /> {label}
    </label>
    {children}
    {error && <p className="text-xs text-rose-500">{error}</p>}
  </div>
);

const inputCls = (err) =>
  `w-full h-12 px-4 rounded-xl border ${err ? 'border-rose-400 dark:border-rose-600' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all duration-300`;

export default function Register() {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();
  const { toast } = useToast();

  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [errors,   setErrors]   = useState({});
  const [form,     setForm]     = useState({ name: '', email: '', college: '', branch: '', password: '', confirmPassword: '' });

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name     = 'Full name is required';
    if (!form.email.trim())    e.email    = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.password)        e.password = 'Password is required';
    else if (form.password.length < 6)  e.password = 'Minimum 6 characters';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm password';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const payload = {
      username:  form.name.trim().replace(/\s+/g,'_').toLowerCase(),
      fullName:  form.name.trim(),
      email:     form.email,
      password:  form.password,
      college:   form.college,
      branch:    form.branch,
    };
    const r = await register(payload);
    setLoading(false);
    if (r.success) { toast({ title: '🎉 Account created!', variant: 'success' }); navigate('/login'); }
    else toast({ title: 'Registration failed', description: r.error, variant: 'destructive' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid flex flex-col justify-center py-16 px-4 transition-colors relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 -right-24 w-72 h-72 rounded-full bg-purple-400/10 dark:bg-purple-500/5 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-pink-400/8 dark:bg-pink-500/5 blur-3xl animate-float-reverse pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto space-y-8 relative animate-slide-in-up">

        {/* Brand */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-all duration-300">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">RankQuest</span>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create your account</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">Start your pattern-wise DSA journey today</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (cr) => {
                const r = await googleLogin(cr.credential);
                if (r.success) { toast({ title: 'Welcome!', variant: 'success' }); navigate('/'); }
                else toast({ title: 'Google sign-in failed', description: r.error, variant: 'destructive' });
              }}
              onError={() => toast({ title: 'Google Sign-In Error', variant: 'destructive' })}
              theme="filled_black" size="large" width="100%" shape="pill"
            />
          </div>

          <div className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-sm font-semibold text-slate-400 shrink-0">or register with email</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name *" icon={User} error={errors.name}>
                <input type="text" placeholder="John Doe" value={form.name} onChange={e => set('name', e.target.value)} className={inputCls(errors.name)} />
              </Field>
              <Field label="Email Address *" icon={Mail} error={errors.email}>
                <input type="email" placeholder="john@example.com" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls(errors.email)} />
              </Field>
            </div>

            {/* College details */}
            <div className="pt-2 space-y-4">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Academic Details (optional)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="College" icon={School} iconColor="text-emerald-500">
                  <input type="text" placeholder="IIT Bombay" value={form.college} onChange={e => set('college', e.target.value)} className={inputCls(false)} />
                </Field>
                <Field label="Branch" icon={BookOpen} iconColor="text-cyan-500">
                  <input type="text" placeholder="Computer Science" value={form.branch} onChange={e => set('branch', e.target.value)} className={inputCls(false)} />
                </Field>
              </div>
            </div>

            {/* Password */}
            <div className="pt-2 space-y-4">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Security</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Password *" icon={Lock} error={errors.password}>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={e => set('password', e.target.value)} className={inputCls(errors.password) + ' pr-12'} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showPass ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </Field>
                <Field label="Confirm Password *" icon={Lock} error={errors.confirmPassword}>
                  <div className="relative">
                    <input type={showConf ? 'text' : 'password'} placeholder="Repeat password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} className={inputCls(errors.confirmPassword) + ' pr-12'} />
                    <button type="button" onClick={() => setShowConf(!showConf)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showConf ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </Field>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60">
              {loading ? <><Loader2 className="w-4.5 h-4.5 animate-spin" /> Creating Account…</> : <><UserPlus className="w-4.5 h-4.5" /> Create Account <ArrowRight className="w-4.5 h-4.5" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}