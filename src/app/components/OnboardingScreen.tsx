import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-between px-8 py-12 h-full">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mt-8">
        <div className="text-[#6C63FF] mb-8">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="#EDEBFF"/>
            <path d="M25 40C25 40 30 35 35 40C35 40 32 45 35 50C38 55 45 52 45 52C45 52 48 55 45 60C42 65 35 62 30 57C25 52 25 40 25 40Z" fill="#6C63FF"/>
            <path d="M55 40C55 40 50 35 45 40C45 40 48 45 45 50C42 55 35 52 35 52C35 52 32 55 35 60C38 65 45 62 50 57C55 52 55 40 55 40Z" fill="#6C63FF"/>
          </svg>
        </div>
        <h1 className="text-[#2E2E3A] text-center mb-2 text-2xl font-semibold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
          MAGIC HANDS
        </h1>
      </div>

      {/* Hero Image */}
      <div className="flex-1 flex items-center justify-center w-full max-w-[280px] my-8">
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1629552049369-39a7388565c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMHRvZ2V0aGVyJTIwY29tcGFzc2lvbnxlbnwxfHx8fDE3Njg5NzkxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hands together in compassion"
            className="w-full h-full object-cover"
          />
          {/* Lavender overlay */}
          <div className="absolute inset-0 bg-[#EDEBFF] opacity-20"></div>
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-8">
        <h2 className="text-[#2E2E3A] text-3xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Where technology
        </h2>
        <h2 className="text-[#2E2E3A] text-3xl font-semibold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          feed Humanity
        </h2>
        <p className="text-[#6C63FF] text-xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          share it with love 💜
        </p>
        <p className="text-[#2E2E3A] text-sm opacity-70 px-4 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Join us in reducing food waste and feeding those in need. Every meal shared is a step towards a better tomorrow.
        </p>
      </div>

      {/* Swipe Indicator in Rounded Rectangle */}
      <div className="bg-[#EDEBFF] px-6 py-3 rounded-2xl mb-4 flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-pulse">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[#6C63FF] text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Swipe to continue
        </span>
      </div>

      {/* Get Started Button */}
      <button
        onClick={onGetStarted}
        className="w-full bg-[#6C63FF] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-[#5a52e6] active:scale-[0.98] shadow-lg shadow-[#6C63FF]/30"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <span className="text-lg font-medium">Get Started</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}