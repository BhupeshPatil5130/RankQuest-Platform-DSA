import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff, Layers, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login, googleLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const r = await login(data);
    setLoading(false);
    if (r.success) {
      toast({ title: 'Welcome back! 🎉', description: 'Ready to continue practicing?', variant: 'success' });
      navigate(from, { replace: true });
    } else {
      toast({ title: 'Login failed', description: r.error || 'Invalid credentials', variant: 'destructive' });
    }
  };

  const handleGoogleSuccess = async (cr) => {
    setLoading(true);
    const r = await googleLogin(cr.credential);
    setLoading(false);
    if (r.success) {
      toast({ title: 'Welcome! 🎉', description: 'Signed in with Google.', variant: 'success' });
      navigate(from, { replace: true });
    } else {
      toast({ title: 'Google sign-in failed', description: r.error, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl animate-float-slow pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative animate-slide-in-up">
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
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Sign in to your account</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Continue your DSA learning streak</p>
        </div>

        {/* Card */}
        <div className="workspace-card p-6 sm:p-8 space-y-5 shadow-xl bg-white dark:bg-slate-900">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast({ title: 'Google Login Failed', variant: 'destructive' })}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  className={`w-full h-11 pl-10 pr-4 rounded-xl border ${
                    errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                  } bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={`w-full h-11 pl-10 pr-10 rounded-xl border ${
                    errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                  } bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-rose-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}