import { useState } from 'react';
import { OnboardingScreen } from '@/app/components/OnboardingScreen';
import { LoginScreen } from '@/app/components/LoginScreen';
import { HomeScreen } from '@/app/components/HomeScreen';
import { PaymentGateway } from '@/app/components/PaymentGateway';
import { CameraCapture } from '@/app/components/CameraCapture';

type Screen = 'onboarding' | 'login' | 'home' | 'payment' | 'camera';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  return (
    <div className="size-full flex items-center justify-center bg-[#F9F8FF]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Mobile Frame */}
      <div className="relative w-[375px] h-[812px] bg-[#F9F8FF] rounded-[48px] overflow-hidden shadow-2xl border-8 border-[#2E2E3A]">
        {/* Screen Content */}
        {currentScreen === 'onboarding' && (
          <OnboardingScreen onGetStarted={() => setCurrentScreen('login')} />
        )}
        {currentScreen === 'login' && (
          <LoginScreen 
            onLogin={() => setCurrentScreen('home')}
            onBack={() => setCurrentScreen('onboarding')}
          />
        )}
        {currentScreen === 'home' && (
          <HomeScreen 
            onDonateClick={() => setCurrentScreen('payment')}
            onHandsClick={() => setCurrentScreen('camera')}
          />
        )}
        {currentScreen === 'payment' && (
          <PaymentGateway onBack={() => setCurrentScreen('home')} />
        )}
        {currentScreen === 'camera' && (
          <CameraCapture onBack={() => setCurrentScreen('home')} />
        )}

        {/* Navigation Dots (for demonstration - only on onboarding/login) */}
        {(currentScreen === 'onboarding' || currentScreen === 'login') && (
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
            <button 
              onClick={() => setCurrentScreen('onboarding')}
              className={`transition-all ${
                currentScreen === 'onboarding' 
                  ? 'w-8 h-2 bg-[#6C63FF]' 
                  : 'w-2 h-2 bg-[#6C63FF]/30'
              } rounded-full`}
            />
            <button 
              onClick={() => setCurrentScreen('login')}
              className={`transition-all ${
                currentScreen === 'login' 
                  ? 'w-8 h-2 bg-[#6C63FF]' 
                  : 'w-2 h-2 bg-[#6C63FF]/30'
              } rounded-full`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
