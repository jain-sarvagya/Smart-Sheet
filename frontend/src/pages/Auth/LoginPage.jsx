
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth.service.js';
import toast from 'react-hot-toast';
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = ({ title = 'Smart Sheet AI' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.login(email, password);
      const { token, user } = result.data;
      login(user, token);

      toast.success('Welcome back! You have successfully logged in.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.error || 'Failed to login. Please check your credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Side */}
      <section className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E3A8A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-teal-400/20 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{title}</span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Welcome back!
              <br />
              Ready to learn?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Continue your learning journey with AI-powered assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Right Side */}
      <section className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md bg-[#0F172A]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">{title}</span>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back 👋
            </h1>
            <p className="text-gray-400">
              Sign in to continue to Smart Sheet AI
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#020617] border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 w-full px-4 py-3 mt-2 rounded-lg outline-none transition text-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-[#020617] border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 w-full px-4 py-3 mt-2 rounded-lg outline-none transition text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg font-semibold text-white 
              bg-gradient-to-r from-blue-500 to-teal-400 
              hover:opacity-90 transition-all duration-300 
              shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;