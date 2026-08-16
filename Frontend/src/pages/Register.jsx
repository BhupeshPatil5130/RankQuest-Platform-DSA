import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff, Mail, Lock, User, School, BookOpen, ArrowRight, Loader2, Layers } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

export default function Register() {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    branch: '',
    password: '',
    confirmPassword: '',
  });

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
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
      username: form.name.trim().replace(/\s+/g, '_').toLowerCase(),
      fullName: form.name.trim(),
      email: form.email,
      password: form.password,
      college: form.college,
      branch: form.branch,
    };
    const r = await register(payload);
    setLoading(false);
    if (r.success) {
      toast({ title: '🎉 Account created!', description: 'Please sign in to start practicing.', variant: 'success' });
      navigate('/login');
    } else {
      toast({ title: 'Registration failed', description: r.error, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl animate-float-slow pointer-events-none" />

      <div className="w-full max-w-lg space-y-6 relative animate-slide-in-up">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              RankQuest
            </span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Create your free account</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Join the pattern-wise DSA platform</p>
        </div>

        {/* Card */}
        <div className="workspace-card p-6 sm:p-8 space-y-5 shadow-xl bg-white dark:bg-slate-900">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (cr) => {
                const r = await googleLogin(cr.credential);
                if (r.success) {
                  toast({ title: 'Welcome! 🎉', variant: 'success' });
                  navigate('/');
                } else toast({ title: 'Google sign-in failed', description: r.error, variant: 'destructive' });
              }}
              onError={() => toast({ title: 'Google Login Error', variant: 'destructive' })}
              theme="outline"
              size="large"
              shape="pill"
              width="100%"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-[11px] font-bold text-slate-400 uppercase">or with email</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={`w-full h-10 px-3.5 rounded-xl border ${
                    errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                  } bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                />
                {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={`w-full h-10 px-3.5 rounded-xl border ${
                    errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                  } bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                />
                {errors.email && <p className="text-[11px] text-rose-500">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">College / University</label>
                <input
                  type="text"
                  placeholder="IIT Bombay"
                  value={form.college}
                  onChange={(e) => set('college', e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Branch / Major</label>
                <input
                  type="text"
                  placeholder="Computer Science"
                  value={form.branch}
                  onChange={(e) => set('branch', e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password *</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Min 6 chars"
                    value={form.password}
                    onChange={(e) => set('password', e.target.value)}
                    className={`w-full h-10 px-3.5 pr-9 rounded-xl border ${
                      errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    } bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-rose-500">{errors.password}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConf ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={(e) => set('confirmPassword', e.target.value)}
                    className={`w-full h-10 px-3.5 pr-9 rounded-xl border ${
                      errors.confirmPassword ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    } bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConf(!showConf)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConf ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-[11px] text-rose-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Free Account'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}