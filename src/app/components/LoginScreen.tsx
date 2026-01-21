import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onBack?: () => void;
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex flex-col px-8 py-12 h-full">
      {/* Header with Back Button and Title */}
      <div className="flex items-center mb-12 mt-4">
        {onBack && (
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-[#EDEBFF] rounded-full flex items-center justify-center mr-4"
          >
            <ArrowLeft size={20} className="text-[#6C63FF]" />
          </button>
        )}
        <h1 className="text-[#2E2E3A] text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
          MAGIC HANDS
        </h1>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center mb-12">
        <div className="text-[#6C63FF]">
          <svg width="60" height="60" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="#EDEBFF"/>
            <path d="M25 40C25 40 30 35 35 40C35 40 32 45 35 50C38 55 45 52 45 52C45 52 48 55 45 60C42 65 35 62 30 57C25 52 25 40 25 40Z" fill="#6C63FF"/>
            <path d="M55 40C55 40 50 35 45 40C45 40 48 45 45 50C42 55 35 52 35 52C35 52 32 55 35 60C38 65 45 62 50 57C55 52 55 40 55 40Z" fill="#6C63FF"/>
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="mb-10">
        <h2 className="text-[#2E2E3A] text-3xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Be a Donor
        </h2>
        <p className="text-[#2E2E3A] text-sm opacity-60" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Sign in to start making a difference
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        {/* Input Field */}
        <div className="mb-6">
          <label className="text-[#2E2E3A] text-sm font-medium mb-2 block" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Email or Phone
          </label>
          <div className="relative">
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter your email or phone number"
              className="w-full bg-white border-2 border-[#EDEBFF] text-[#2E2E3A] py-4 px-5 pr-12 rounded-2xl focus:outline-none focus:border-[#6C63FF] transition-colors placeholder:text-[#2E2E3A]/40"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
            <Mail size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C63FF] opacity-50" />
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-[#6C63FF] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-[#5a52e6] active:scale-[0.98] shadow-lg shadow-[#6C63FF]/30 mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <span className="text-lg font-medium">Sign In</span>
          <ArrowRight size={20} />
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#EDEBFF]"></div>
          <span className="px-4 text-[#2E2E3A] text-sm opacity-50" style={{ fontFamily: 'Poppins, sans-serif' }}>or</span>
          <div className="flex-1 h-px bg-[#EDEBFF]"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={onLogin}
          className="w-full bg-[#EDEBFF] text-[#6C63FF] py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-[#e0dcff] active:scale-[0.98]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="flex-1"></div>

        {/* Footer Text */}
        <p className="text-[#2E2E3A] text-xs text-center opacity-50 mt-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </form>
    </div>
  );
}