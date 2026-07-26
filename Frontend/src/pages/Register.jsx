import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import {
  Eye, EyeOff, Mail, Lock, User, School, Brain, Layers,
  UserPlus, BookOpen, Calendar, Hash, ArrowRight, Loader2, CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

// Google "G" SVG icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

const FormField = ({ label, icon: Icon, error, children }) => (
  <div>
    <Label className="text-gray-300 flex items-center gap-2 mb-2">
      {Icon && <Icon className="w-4 h-4" />} {label}
    </Label>
    {children}
    {error && (
      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
        <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
        {error}
      </p>
    )}
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rollNumber: '',
    college: '',
    branch: '',
    year: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  const { register, googleLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const userDataForBackend = {
      username: formData.name.trim().replace(/\s+/g, '_').toLowerCase(),
      fullName: formData.name.trim(),
      email: formData.email,
      password: formData.password,
      rollNumber: formData.rollNumber,
      college: formData.college,
      branch: formData.branch,
      year: formData.year,
    };

    try {
      const result = await register(userDataForBackend);
      if (result.success) {
        toast({
          title: '🎉 Account Created!',
          description: 'Welcome to RankQuest! Please sign in to continue.',
          variant: 'default'
        });
        navigate('/login');
      } else {
        toast({
          title: 'Registration Failed',
          description: result.error || 'Failed to create account',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleSuccess = async (tokenResponse) => {
    setIsGoogleLoading(true);
    try {
      const token = tokenResponse.credential || tokenResponse.access_token;
      const result = await googleLogin(token);
      if (result.success) {
        toast({ title: 'Welcome!', description: 'Signed in with Google successfully.', variant: 'success' });
        navigate('/');
      } else {
        toast({ title: 'Google sign-in failed', description: result.error, variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Google sign-in failed.', variant: 'destructive' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const googleLoginHook = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => toast({ title: 'Google sign-in cancelled', variant: 'destructive' }),
  });

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return { label: '', color: '' };
    if (p.length < 6) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (p.length < 10) return { label: 'Fair', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  };
  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden relative py-12 px-4">
      {/* Aurora Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] opacity-50 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-50 animate-pulse delay-1000 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className={`w-full max-w-2xl relative z-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="inline-flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 shadow-xl shadow-indigo-500/25">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">
              RankQuest
            </span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Create Your Account</h1>
          <p className="text-gray-400 text-sm">Join thousands of developers on their DSA journey</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <CardContent className="p-8 relative z-10">

            {/* Google Button */}
            <div className="w-full flex justify-center mb-6">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  setIsGoogleLoading(true);
                  try {
                    const token = credentialResponse.credential;
                    const result = await googleLogin(token);
                    if (result.success) {
                      toast({ title: 'Welcome!', description: 'Signed in with Google successfully.', variant: 'success' });
                      navigate('/');
                    } else {
                      toast({ title: 'Google sign-in failed', description: result.error, variant: 'destructive' });
                    }
                  } catch (err) {
                    toast({ title: 'Error', description: 'Google sign-in failed.', variant: 'destructive' });
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
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-400 bg-black/30 backdrop-blur-xl rounded-full">
                  or register with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Full Name *" icon={User} error={errors.name}>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-primary/50 ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </div>
                </FormField>

                <FormField label="Email Address *" icon={Mail} error={errors.email}>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-primary/50 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </FormField>
              </div>

              {/* Academic Info */}
              <div className="pt-2 pb-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Academic Details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Roll Number *" icon={Hash} error={errors.rollNumber}>
                    <Input
                      type="text"
                      placeholder="2021CS001"
                      value={formData.rollNumber}
                      onChange={(e) => handleChange('rollNumber', e.target.value)}
                      className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-primary/50 ${errors.rollNumber ? 'border-red-500' : ''}`}
                    />
                  </FormField>

                  <FormField label="College" icon={School}>
                    <Input
                      type="text"
                      placeholder="ABC Institute of Technology"
                      value={formData.college}
                      onChange={(e) => handleChange('college', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-primary/50"
                    />
                  </FormField>

                  <FormField label="Branch" icon={BookOpen}>
                    <Input
                      type="text"
                      placeholder="Computer Science"
                      value={formData.branch}
                      onChange={(e) => handleChange('branch', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl focus:border-primary/50"
                    />
                  </FormField>

                  <FormField label="Year" icon={Calendar}>
                    <select
                      value={formData.year}
                      onChange={(e) => handleChange('year', e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none text-sm"
                    >
                      <option value="" className="bg-gray-900">Select Year</option>
                      <option value="1st Year" className="bg-gray-900">1st Year</option>
                      <option value="2nd Year" className="bg-gray-900">2nd Year</option>
                      <option value="3rd Year" className="bg-gray-900">3rd Year</option>
                      <option value="4th Year" className="bg-gray-900">4th Year</option>
                      <option value="Alumni" className="bg-gray-900">Alumni</option>
                    </select>
                  </FormField>
                </div>
              </div>

              {/* Password */}
              <div className="pt-2 pb-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Security</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Password *" icon={Lock} error={errors.password}>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl pr-10 focus:border-primary/50 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} />
                          </div>
                          <span className={`text-xs font-medium ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                        </div>
                      </div>
                    )}
                  </FormField>

                  <FormField label="Confirm Password *" icon={Lock} error={errors.confirmPassword}>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Repeat your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11 rounded-xl pr-10 focus:border-primary/50 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  </FormField>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] border-0 mt-2"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating Account...</>
                ) : (
                  <><UserPlus className="mr-2 h-5 w-5" /> Create Account <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;