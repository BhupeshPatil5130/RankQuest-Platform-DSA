import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff, Layers, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const schema = Yup.object().shape({
  email:    Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login, googleLogin, isAuthenticated } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { toast } = useToast();

  // Where to redirect after successful login
  const from = location.state?.from?.pathname || '/';

  // If already authenticated, redirect away
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const r = await login(data);
    setLoading(false);
    if (r.success) {
      toast({ title: 'Welcome back! 🎉', description: 'Ready to grind some DSA?', variant: 'success' });
      navigate(from, { replace: true });
    } else {
      toast({ title: 'Login failed', description: r.error || 'Invalid email or password.', variant: 'destructive' });
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 subtle-grid flex flex-col justify-center py-16 px-4 transition-colors relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 -right-24 w-72 h-72 rounded-full bg-purple-400/10 dark:bg-purple-500/5 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-pink-400/8 dark:bg-pink-500/5 blur-3xl animate-float-reverse pointer-events-none" />

      <div className="w-full max-w-md mx-auto space-y-8 relative animate-slide-in-up">

        {/* Brand */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-all duration-300">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">RankQuest</span>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Welcome back</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">Sign in to continue your DSA journey</p>
          </div>
          {/* Show redirect hint if coming from a protected page */}
          {location.state?.from && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              Sign in to access that page
            </div>
          )}
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">

          {/* Google */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast({ title: 'Google Sign-In Error', description: 'Unable to sign in with Google.', variant: 'destructive' })}
              theme="filled_black" size="large" width="100%" shape="pill"
            />
          </div>

          <div className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 shrink-0">or sign in with email</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500" /> Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                className={`w-full h-12 px-4 rounded-xl border ${
                  errors.email ? 'border-rose-400 dark:border-rose-600' : 'border-slate-200 dark:border-slate-700'
                } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 dark:focus:border-indigo-600 transition-all duration-300`}
              />
              {errors.email && <p className="text-xs text-rose-500 mt-0.5">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-500" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={`w-full h-12 px-4 pr-12 rounded-xl border ${
                    errors.password ? 'border-rose-400 dark:border-rose-600' : 'border-slate-200 dark:border-slate-700'
                  } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 dark:focus:border-indigo-600 transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-500 mt-0.5">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? <><Loader2 className="w-4.5 h-4.5 animate-spin" /> Signing in…</>
                : <>Sign In <ArrowRight className="w-4.5 h-4.5" /></>
              }
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            No account?{' '}
            <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Create one for free</Link>
          </p>
        </div>

      </div>
    </div>
  );
}