import { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Building2, QrCode, CheckCircle2 } from 'lucide-react';

interface PaymentGatewayProps {
  onBack: () => void;
}

export function PaymentGateway({ onBack }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'wallet' | 'bank' | null>(null);
  const [amount, setAmount] = useState('500');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }, 2000);
  };

  const quickAmounts = ['100', '250', '500', '1000'];

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 bg-gradient-to-b from-[#F9F8FF] to-white">
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#6C63FF]/20 text-center">
          <div className="w-20 h-20 bg-[#EDEBFF] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-[#6C63FF]" />
          </div>
          <h2 className="text-[#2E2E3A] text-2xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Payment Successful!
          </h2>
          <p className="text-[#2E2E3A]/60 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Thank you for your generous donation of ₹{amount}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F9F8FF]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#6C63FF] to-[#5a52e6] pt-8 pb-6 px-6 rounded-b-[32px] shadow-lg">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            MAGIC HANDS
          </h1>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Make a Donation
        </h2>
        <p className="text-white/80 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Every contribution helps feed those in need
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Amount Input */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#6C63FF]/10 mb-6">
          <label className="text-[#2E2E3A] text-sm font-medium mb-3 block" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Donation Amount
          </label>
          <div className="relative mb-4">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6C63FF] text-2xl font-semibold">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#F9F8FF] text-[#2E2E3A] text-3xl font-semibold py-4 pl-12 pr-5 rounded-2xl border-2 border-[#EDEBFF] focus:outline-none focus:border-[#6C63FF] transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={`py-2 rounded-xl text-sm font-medium transition-all ${
                  amount === amt
                    ? 'bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/30'
                    : 'bg-[#EDEBFF] text-[#6C63FF]'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#6C63FF]/10 mb-6">
          <h3 className="text-[#2E2E3A] text-sm font-medium mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Select Payment Method
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedMethod('upi')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedMethod === 'upi'
                  ? 'border-[#6C63FF] bg-[#EDEBFF]'
                  : 'border-[#EDEBFF] bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedMethod === 'upi' ? 'bg-[#6C63FF]' : 'bg-[#EDEBFF]'
              }`}>
                <QrCode size={24} className={selectedMethod === 'upi' ? 'text-white' : 'text-[#6C63FF]'} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#2E2E3A] font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  UPI
                </p>
                <p className="text-[#2E2E3A]/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Google Pay, PhonePe, Paytm
                </p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === 'upi'
                  ? 'border-[#6C63FF] bg-[#6C63FF]'
                  : 'border-[#2E2E3A]/20'
              } flex items-center justify-center`}>
                {selectedMethod === 'upi' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('card')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedMethod === 'card'
                  ? 'border-[#6C63FF] bg-[#EDEBFF]'
                  : 'border-[#EDEBFF] bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedMethod === 'card' ? 'bg-[#6C63FF]' : 'bg-[#EDEBFF]'
              }`}>
                <CreditCard size={24} className={selectedMethod === 'card' ? 'text-white' : 'text-[#6C63FF]'} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#2E2E3A] font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Debit / Credit Card
                </p>
                <p className="text-[#2E2E3A]/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Visa, Mastercard, Rupay
                </p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === 'card'
                  ? 'border-[#6C63FF] bg-[#6C63FF]'
                  : 'border-[#2E2E3A]/20'
              } flex items-center justify-center`}>
                {selectedMethod === 'card' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('wallet')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedMethod === 'wallet'
                  ? 'border-[#6C63FF] bg-[#EDEBFF]'
                  : 'border-[#EDEBFF] bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedMethod === 'wallet' ? 'bg-[#6C63FF]' : 'bg-[#EDEBFF]'
              }`}>
                <Wallet size={24} className={selectedMethod === 'wallet' ? 'text-white' : 'text-[#6C63FF]'} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#2E2E3A] font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Wallets
                </p>
                <p className="text-[#2E2E3A]/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Paytm, Amazon Pay, MobiKwik
                </p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === 'wallet'
                  ? 'border-[#6C63FF] bg-[#6C63FF]'
                  : 'border-[#2E2E3A]/20'
              } flex items-center justify-center`}>
                {selectedMethod === 'wallet' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('bank')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedMethod === 'bank'
                  ? 'border-[#6C63FF] bg-[#EDEBFF]'
                  : 'border-[#EDEBFF] bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedMethod === 'bank' ? 'bg-[#6C63FF]' : 'bg-[#EDEBFF]'
              }`}>
                <Building2 size={24} className={selectedMethod === 'bank' ? 'text-white' : 'text-[#6C63FF]'} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#2E2E3A] font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Net Banking
                </p>
                <p className="text-[#2E2E3A]/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  All major banks
                </p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === 'bank'
                  ? 'border-[#6C63FF] bg-[#6C63FF]'
                  : 'border-[#2E2E3A]/20'
              } flex items-center justify-center`}>
                {selectedMethod === 'bank' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="p-6 bg-white border-t border-[#EDEBFF]">
        <button
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all ${
            selectedMethod && !isProcessing
              ? 'bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/30 hover:bg-[#5a52e6] active:scale-[0.98]'
              : 'bg-[#EDEBFF] text-[#6C63FF]/40 cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            `Donate ₹${amount}`
          )}
        </button>
      </div>
    </div>
  );
}
