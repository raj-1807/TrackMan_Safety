import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  AlertCircle,
} from 'lucide-react';

const Login: React.FC = () => {
  const { login, error, clearError, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!email.trim()) { setLocalError('Email is required'); return; }
    if (!password.trim()) { setLocalError('Password is required'); return; }

    try {
      await login(email, password);
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.role === 'TRACKMAN') {
        navigate('/worker/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  const fillCredentials = (emailVal: string) => {
    setEmail(emailVal);
    setPassword('password123');
    setLocalError('');
    clearError();
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      {/* ─── Government Header Band ──────────────────────────────────── */}
      <div className="bg-[#1a237e] text-white">
        {/* Saffron-White-Green Tricolor Band */}
        <div className="h-1 flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Ashoka Chakra inspired logo */}
            <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center bg-white/10">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
                <line x1="12" y1="2" x2="12" y2="7" />
                <line x1="12" y1="17" x2="12" y2="22" />
                <line x1="2" y1="12" x2="7" y2="12" />
                <line x1="17" y1="12" x2="22" y2="12" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-white/60 tracking-wide">भारत सरकार / Government of India</p>
              <p className="text-sm font-semibold tracking-tight">Ministry of Railways / रेल मंत्रालय</p>
            </div>
          </div>
          <p className="text-[11px] text-white/50 hidden sm:block">Indian Railways Safety Directorate</p>
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* System Title Card */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1a237e] text-white mb-4 shadow-lg">
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#1a237e] tracking-tight">
              TrackMan Safety System
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Railway Worker Safety Monitoring Portal
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="bg-[#1a237e] px-6 py-3">
              <h2 className="text-white text-sm font-semibold text-center tracking-wide">
                Authorized Personnel Login
              </h2>
            </div>

            <div className="p-6">
              {/* Error */}
              {displayError && (
                <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{displayError}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email / User ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setLocalError(''); }}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setLocalError(''); }}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#1a237e] text-white font-semibold rounded text-sm hover:bg-[#283593] active:bg-[#0d1642] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-gray-400">Demo Access</span>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="space-y-2">
                {[
                  { role: 'Control Room Admin', email: 'control@trackman.com', roleTag: 'ADMIN' },
                  { role: 'Supervisor', email: 'supervisor@trackman.com', roleTag: 'SUPV' },
                  { role: 'Trackman (Worker)', email: 'amit@trackman.com', roleTag: 'TM' },
                ].map((cred) => (
                  <button
                    key={cred.email}
                    type="button"
                    onClick={() => fillCredentials(cred.email)}
                    className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-[#1a237e] bg-[#1a237e]/8 px-2 py-0.5 rounded tracking-wide">
                        {cred.roleTag}
                      </span>
                      <div className="text-left">
                        <p className="text-sm text-gray-700 font-medium">{cred.role}</p>
                        <p className="text-[11px] text-gray-400">{cred.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to fill →
                    </span>
                  </button>
                ))}
                <p className="text-center text-[11px] text-gray-400 pt-1">
                  Password: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-500 text-[10px]">password123</code>
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-[10px] text-gray-400 mt-6 leading-relaxed max-w-sm mx-auto">
            This system is the property of Indian Railways. Unauthorized access is prohibited
            and subject to prosecution under the IT Act, 2000.
          </p>
        </div>
      </div>

      {/* ─── Government Footer ──────────────────────────────────────── */}
      <div className="bg-[#1a237e] text-white/60 text-[11px] py-3 text-center">
        <p>© 2026 Indian Railways — Ministry of Railways, Government of India</p>
        {/* Tricolor Band */}
        <div className="h-0.5 flex mt-3">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>
      </div>
    </div>
  );
};

export default Login;
