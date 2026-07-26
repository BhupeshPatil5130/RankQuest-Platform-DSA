import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {
  Eye, EyeOff, Mail, Lock, User, School,
  UserPlus, BookOpen, ArrowRight, Loader2, Layers
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const FormField = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-1">
    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-zinc-500" />} {label}
    </Label>
    {children}
    {error && <p className="text-[11px] text-rose-500 dark:text-rose-400 mt-0.5">{error}</p>}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    college: '',
    branch: '',
    year: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 subtle-grid transition-colors">
      <div className="w-full max-w-xl mx-auto space-y-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 group-hover:border-indigo-400 transition-colors shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              RankQuest
            </span>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Create your account</h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Start grinding pattern-wise DSA problems today</p>
          </div>
        </div>

        {/* Card */}
        <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800/80 shadow-xl dark:shadow-2xl backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">

            {/* Google OAuth */}
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  setIsGoogleLoading(true);
                  try {
                    const token = credentialResponse.credential;
                    const result = await googleLogin(token);
                    if (result.success) {
                      toast({ title: 'Welcome!', description: 'Signed in with Google successfully.', variant: 'success' });
                      navigate('/dashboard');
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-medium">
                  or register with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name *" icon={User} error={errors.name}>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 h-10 rounded-xl text-xs focus:border-indigo-500"
                  />
                </FormField>

                <FormField label="Email Address *" icon={Mail} error={errors.email}>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 h-10 rounded-xl text-xs focus:border-indigo-500"
                  />
                </FormField>
              </div>

              {/* Optional College Details */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 space-y-3">
                <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Academic Details (Optional)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="College" icon={School}>
                    <Input
                      type="text"
                      placeholder="IIT Bombay"
                      value={formData.college}
                      onChange={(e) => handleChange('college', e.target.value)}
                      className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 h-10 rounded-xl text-xs focus:border-indigo-500"
                    />
                  </FormField>

                  <FormField label="Branch" icon={BookOpen}>
                    <Input
                      type="text"
                      placeholder="Computer Science"
                      value={formData.branch}
                      onChange={(e) => handleChange('branch', e.target.value)}
                      className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 h-10 rounded-xl text-xs focus:border-indigo-500"
                    />
                  </FormField>
                </div>
              </div>

              {/* Security */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 space-y-3">
                <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Security</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Password *" icon={Lock} error={errors.password}>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min 6 characters"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 h-10 rounded-xl text-xs pr-10 focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </FormField>

                  <FormField label="Confirm Password *" icon={Lock} error={errors.confirmPassword}>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Repeat password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 h-10 rounded-xl text-xs pr-10 focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </FormField>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all border-0 mt-3"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</>
                ) : (
                  <><UserPlus className="mr-1.5 h-4 w-4" /> Create Account <ArrowRight className="ml-1.5 h-4 w-4" /></>
                )}
              </Button>
            </form>

            <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                  Sign in
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