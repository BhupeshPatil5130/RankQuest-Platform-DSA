import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff, Layers, ShieldCheck } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
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

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 subtle-grid">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        
        {/* Brand Badge */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-indigo-400 group-hover:border-zinc-700 transition-colors">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              RankQuest
            </span>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-white">Welcome back</h1>
            <p className="text-xs text-zinc-400 mt-1">Sign in to continue your DSA practice</p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="bg-zinc-900/80 border-zinc-800/80 shadow-2xl backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">

            {/* Native Google OAuth Button */}
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  setIsGoogleLoading(true);
                  try {
                    const token = credentialResponse.credential;
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
                }}
                onError={() => {
                  toast({ title: 'Google Sign-In Error', description: 'Failed to authenticate with Google.', variant: 'destructive' });
                }}
                theme="filled_black"
                size="large"
                width="100%"
                shape="pill"
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-zinc-900 text-zinc-400 font-medium">
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" /> Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 h-10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs ${errors.email ? 'border-rose-500' : ''}`}
                  placeholder="name@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-zinc-400" /> Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 h-10 rounded-xl pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs ${errors.password ? 'border-rose-500' : ''}`}
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all border-0 mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
                ) : (
                  <>Sign In <ArrowRight className="ml-1.5 h-4 w-4" /></>
                )}
              </Button>
            </form>

            <div className="text-center pt-2 border-t border-zinc-800/60">
              <p className="text-xs text-zinc-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
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