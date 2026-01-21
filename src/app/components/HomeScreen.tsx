import { useState } from 'react';
import { User, UtensilsCrossed, HandHeart, Utensils, Heart, MessageCircle, Share2, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HomeScreenProps {
  onDonateClick: () => void;
  onHandsClick: () => void;
}

export function HomeScreen({ onDonateClick, onHandsClick }: HomeScreenProps) {
  const [activeMenuItem, setActiveMenuItem] = useState<'donate' | 'hands' | 'feed'>('donate');

  // Mock feed data
  const feedItems = [
    {
      id: 1,
      userName: 'Sarah Community Kitchen',
      userAvatar: '👩‍🍳',
      location: 'Mumbai, Maharashtra',
      timeAgo: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjaGFyaXR5fGVufDF8fHx8MTc2ODkyMTA3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Fresh Meals for 50 People',
      description: 'We have prepared nutritious meals and are looking for volunteers to help distribute them to those in need.',
      servings: 50,
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      userName: 'Green Valley NGO',
      userAvatar: '🌱',
      location: 'Delhi, India',
      timeAgo: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1666819691716-827f78d892f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMGJvd2x8ZW58MXx8fHwxNzY4OTc1MjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Healthy Food Boxes Ready',
      description: 'Packed with fresh vegetables and grains. Perfect for families in need. Available for pickup today.',
      servings: 25,
      likes: 189,
      comments: 32
    },
    {
      id: 3,
      userName: 'Hope Foundation',
      userAvatar: '❤️',
      location: 'Bangalore, Karnataka',
      timeAgo: '1 day ago',
      image: 'https://images.unsplash.com/photo-1763570645098-371723617ee9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBmb29kJTIwc2hhcmluZ3xlbnwxfHx8fDE3Njg5NzkxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Community Food Drive Success',
      description: 'Thanks to all donors! We collected enough food to feed 200 families this week.',
      servings: 200,
      likes: 567,
      comments: 89
    }
  ];

  const handleMenuClick = (menu: 'donate' | 'hands' | 'feed') => {
    setActiveMenuItem(menu);
    if (menu === 'donate') {
      onDonateClick();
    } else if (menu === 'hands') {
      onHandsClick();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Title and Profile */}
      <div className="bg-gradient-to-b from-[#6C63FF] to-[#5a52e6] pt-8 pb-6 px-6 rounded-b-[32px] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            MAGIC HANDS
          </h1>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User size={20} className="text-white" />
          </div>
        </div>

        {/* Balance Section */}
        <div className="text-center mb-4">
          <p className="text-white/80 text-xs mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Available Balance
          </p>
          <h2 className="text-white text-3xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ₹3,345.57
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-md shadow-[#6C63FF]/10">
            <p className="text-[#2E2E3A]/60 text-xs mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Amount Spent
            </p>
            <p className="text-[#6C63FF] text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              ₹12,450
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md shadow-[#6C63FF]/10">
            <p className="text-[#2E2E3A]/60 text-xs mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Amount Got
            </p>
            <p className="text-[#6C63FF] text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              ₹8,920
            </p>
          </div>
        </div>

        {/* Menu Icons */}
        <div className="flex items-center justify-around bg-white rounded-2xl p-3 shadow-md">
          <button
            onClick={() => handleMenuClick('donate')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
              activeMenuItem === 'donate' ? 'bg-[#EDEBFF]' : ''
            }`}
          >
            <UtensilsCrossed 
              size={24} 
              className={activeMenuItem === 'donate' ? 'text-[#6C63FF]' : 'text-[#2E2E3A]/60'}
            />
            <span 
              className={`text-xs ${activeMenuItem === 'donate' ? 'text-[#6C63FF] font-medium' : 'text-[#2E2E3A]/60'}`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Donate
            </span>
          </button>
          
          <button
            onClick={() => handleMenuClick('hands')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
              activeMenuItem === 'hands' ? 'bg-[#EDEBFF]' : ''
            }`}
          >
            <HandHeart 
              size={24} 
              className={activeMenuItem === 'hands' ? 'text-[#6C63FF]' : 'text-[#2E2E3A]/60'}
            />
            <span 
              className={`text-xs ${activeMenuItem === 'hands' ? 'text-[#6C63FF] font-medium' : 'text-[#2E2E3A]/60'}`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Hands
            </span>
          </button>
          
          <button
            onClick={() => handleMenuClick('feed')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
              activeMenuItem === 'feed' ? 'bg-[#EDEBFF]' : ''
            }`}
          >
            <Utensils 
              size={24} 
              className={activeMenuItem === 'feed' ? 'text-[#6C63FF]' : 'text-[#2E2E3A]/60'}
            />
            <span 
              className={`text-xs ${activeMenuItem === 'feed' ? 'text-[#6C63FF] font-medium' : 'text-[#2E2E3A]/60'}`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Feed
            </span>
          </button>
        </div>
      </div>

      {/* Feed Section - Scrollable Instagram Reels Style */}
      <div className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        {feedItems.map((item) => (
          <div key={item.id} className="min-h-full snap-start flex flex-col">
            {/* Feed Card */}
            <div className="flex-1 bg-white m-4 rounded-3xl overflow-hidden shadow-xl shadow-[#6C63FF]/10">
              {/* User Info Header */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-b from-[#F9F8FF] to-white">
                <div className="w-12 h-12 bg-[#EDEBFF] rounded-full flex items-center justify-center text-2xl">
                  {item.userAvatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#2E2E3A] font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.userName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#2E2E3A]/60">
                    <MapPin size={12} />
                    <span style={{ fontFamily: 'Poppins, sans-serif' }}>{item.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#2E2E3A]/50">
                  <Clock size={14} />
                  <span className="text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.timeAgo}
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] bg-[#F9F8FF]">
                <ImageWithFallback 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Serving Badge */}
                <div className="absolute top-4 right-4 bg-[#6C63FF] text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.servings} Servings
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[#2E2E3A] text-lg font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-[#2E2E3A]/70 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-3 border-t border-[#EDEBFF]">
                  <button className="flex items-center gap-2 text-[#6C63FF] transition-all hover:scale-105">
                    <Heart size={20} />
                    <span className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {item.likes}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 text-[#6C63FF] transition-all hover:scale-105">
                    <MessageCircle size={20} />
                    <span className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {item.comments}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 text-[#6C63FF] transition-all hover:scale-105">
                    <Share2 size={20} />
                  </button>
                  <div className="flex-1"></div>
                  <button className="bg-[#6C63FF] text-white px-6 py-2 rounded-full font-medium transition-all hover:bg-[#5a52e6] active:scale-95 shadow-md shadow-[#6C63FF]/30">
                    <span style={{ fontFamily: 'Poppins, sans-serif' }}>Help Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}