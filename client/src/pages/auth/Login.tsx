import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Train,
  MapPin,
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
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

    if (!email.trim()) {
      setLocalError('Email is required');
      return;
    }
    if (!password.trim()) {
      setLocalError('Password is required');
      return;
    }

    try {
      await login(email, password);
      // Role-based redirect
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

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* ─── Left Panel — Branding ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex-col justify-between p-12 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Animated train track lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[30%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute top-[50%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />
          <div className="absolute top-[70%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

          {/* Moving train dot */}
          <div
            className="absolute top-[30%] w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"
            style={{ animation: 'train-move 8s linear infinite' }}
          />
          <div
            className="absolute top-[50%] w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
            style={{ animation: 'train-move 12s linear infinite', animationDelay: '3s' }}
          />
        </div>

        {/* Floating decoration elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        {/* Logo & Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">TrackMan Safety</h1>
              <p className="text-blue-300 text-sm">Railway Worker Protection System</p>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Protecting Lives on<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Every Track
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Real-time GPS tracking, geofenced safety zones, and instant SOS alerts
              for railway track maintenance workers.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            {[
              { icon: MapPin, title: 'Live Tracking', desc: 'Real-time GPS location', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { icon: Shield, title: 'Geofencing', desc: 'Automated safety zones', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { icon: AlertTriangle, title: 'SOS Alerts', desc: 'Instant emergency response', color: 'text-amber-400', bg: 'bg-amber-500/10' },
              { icon: Train, title: 'Train Warnings', desc: 'Proximity notifications', color: 'text-red-400', bg: 'bg-red-500/10' },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={`w-10 h-10 ${feature.bg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-slate-500 text-sm">
            © 2026 TrackMan Safety • Built for Indian Railways
          </p>
        </div>
      </div>

      {/* ─── Right Panel — Login Form ──────────────────────────────────── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo (hidden on desktop) */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">TrackMan Safety</h1>
          </div>

          {/* Welcome text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500">Sign in to access the safety monitoring dashboard</p>
          </div>

          {/* Error Alert */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-slide-up">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">{displayError}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setLocalError(''); }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLocalError(''); }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 disabled:opacity-60 disabled:cursor-not-allowed text-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Demo Credentials
            </p>
            <div className="space-y-2">
              {[
                { role: 'Supervisor', email: 'supervisor@trackman.com', color: 'text-blue-600 bg-blue-50' },
                { role: 'Control Room', email: 'control@trackman.com', color: 'text-purple-600 bg-purple-50' },
                { role: 'Trackman', email: 'amit@trackman.com', color: 'text-emerald-600 bg-emerald-50' },
              ].map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => { setEmail(cred.email); setPassword('password123'); setLocalError(''); }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cred.color}`}>
                      {cred.role}
                    </span>
                    <span className="text-sm text-slate-600">{cred.email}</span>
                  </div>
                  <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to fill
                  </span>
                </button>
              ))}
              <p className="text-xs text-slate-400 mt-2 pl-1">
                Password for all: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">password123</code>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-8">
            Secured with JWT authentication • End-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
