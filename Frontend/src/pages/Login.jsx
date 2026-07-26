import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff, Layers } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const schema = Yup.object().shape({
  email:    Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const [loading,   setLoading]  = useState(false);
  const [showPass,  setShowPass] = useState(false);
  const { login, googleLogin }   = useAuth();
  const navigate                 = useNavigate();
  const { toast }                = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const r = await login(data);
    setLoading(false);
    if (r.success) { toast({ title: 'Welcome back!', variant: 'success' }); navigate('/'); }
    else toast({ title: 'Login failed', description: r.error, variant: 'destructive' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid flex flex-col justify-center py-12 px-4 transition-colors">
      <div className="w-full max-w-sm mx-auto space-y-6">

        {/* Brand */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">RankQuest</span>
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Welcome back</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sign in to continue your DSA journey</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 shadow-xl space-y-5">

          {/* Google */}
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

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0">or sign in with email</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500" /> Email
              </label>
              <input type="email" placeholder="name@example.com" {...register('email')}
                className={`w-full h-10 px-3.5 rounded-xl border ${errors.email ? 'border-rose-400 dark:border-rose-600' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 dark:focus:border-indigo-600 transition-all`} />
              {errors.email && <p className="text-[11px] text-rose-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-500" /> Password
              </label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••" {...register('password')}
                  className={`w-full h-10 px-3.5 pr-10 rounded-xl border ${errors.password ? 'border-rose-400 dark:border-rose-600' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 dark:focus:border-indigo-600 transition-all`} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-rose-500">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-95 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 dark:text-slate-400">
            No account?{' '}
            <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Create one for free</Link>
          </p>
        </div>

      </div>
    </div>
  );
}