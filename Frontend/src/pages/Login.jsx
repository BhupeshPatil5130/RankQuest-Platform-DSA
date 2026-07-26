import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Brain, ArrowRight, Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

// Google "G" SVG icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await login(data);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
        variant: 'success',
      });
      navigate(from);
    } else {
      toast({
        title: 'Login failed',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  // Google Sign-In using @react-oauth/google
  const handleGoogleSuccess = async (tokenResponse) => {
    setIsGoogleLoading(true);
    try {
      const token = tokenResponse.credential || tokenResponse.access_token;
      const result = await googleLogin(token);
      
      if (result.success) {
        toast({ title: 'Welcome!', description: 'Signed in with Google successfully.', variant: 'success' });
        navigate(from);
      } else {
        toast({ title: 'Google sign-in failed', description: result.error, variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Google sign-in failed. Please try again.', variant: 'destructive' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const googleLoginHook = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (err) => {
      console.error('Google sign-in error:', err);
      toast({ title: 'Google sign-in error', description: 'Pop-up was closed or blocked.', variant: 'destructive' });
    },
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden relative py-12 sm:px-6 lg:px-8">
      {/* Aurora Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] opacity-50 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-50 animate-pulse delay-1000 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              RankQuest
            </span>
          </Link>
        </div>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-400">
          Sign in to continue your coding journey
        </p>
      </div>

      {/* Card */}
      <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
        <Card className="border-0 shadow-2xl bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          <CardContent className="p-8 sm:p-10 relative z-10">

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={() => {
                try {
                  googleLoginHook();
                } catch (e) {
                  console.error('Google login trigger failed:', e);
                  toast({ title: 'Google Login Error', description: 'Could not launch Google popup.', variant: 'destructive' });
                }
              }}
              disabled={isGoogleLoading}
              className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-white font-medium text-sm mb-6 disabled:opacity-60 hover:border-white/40 cursor-pointer"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-400 bg-transparent backdrop-blur-xl bg-black/30 rounded-full">
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="email" className="text-gray-300 flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" /> Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="you@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span> {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300 flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4" /> Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl pr-12 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span> {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] border-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                New to RankQuest?{' '}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;