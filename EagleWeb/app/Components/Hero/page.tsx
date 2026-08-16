"use client";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiPlayCircle,
  FiTrendingUp,
  FiUsers,
  FiActivity,
} from "react-icons/fi";
import API_URL from "@/app/api/url";

export default function Hero() {
  const [reels, setReels] = useState<any[]>([]);
  const [playReel, setPlayReel] = useState(false);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await fetch(`${API_URL}/reels`);
        const data = await res.json();
        const reelsData = Array.isArray(data) ? data : data?.data ?? [];
        setReels(reelsData);
      } catch (err) {
        console.error("Failed to fetch reels:", err);
      }
    };
    fetchReels();
  }, []);

  const handlePlayReel = () => {
    if (reels.length > 0) {
      setPlayReel(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black text-white py-20 md:py-32">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-[-40%] left-[20%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[140px] mix-blend-screen animate-pulse-slow delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 w-full">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in-up">
              
              <span className="text-xs sm:text-sm font-medium text-blue-200">
                Accepting New Clients
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight px-2 sm:px-0">
              We Build
              <br className="hidden sm:block" /> Products <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                That Go
                <br className="sm:hidden" /> Beyond Expectations
              </span>
            </h1> 

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
             Great ideas deserve more than just execution — they deserve thoughtful strategy, smart design, and strong engineering.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 px-4 sm:px-0">
              <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] overflow-hidden text-sm sm:text-base">
                <a href="/projects/archived">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="flex items-center justify-center gap-2">
                    Start Your Project
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </button>

              <button
                onClick={handlePlayReel}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full font-semibold backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <FiPlayCircle className="text-lg sm:text-xl" />
                  Watch Showreel
                </span>
              </button>
            </div>

            <div className="pt-4 md:pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 text-gray-400 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2">
                <FiUsers className="text-blue-400 text-base sm:text-lg" />
                <span>50+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <FiActivity className="text-green-400 text-base sm:text-lg" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Glassmorphism Card */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none perspective-1000 px-4 sm:px-0 mt-8 lg:mt-0">
            <div className="relative transform transition-transform hover:scale-[1.02] duration-500">
              {/* Main Card */}
              <div className="relative z-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
                {/* Fake Browser Header */}
                <div className="flex items-center gap-2 mb-4 sm:mb-6 border-b border-white/5 pb-3 sm:pb-4">
                  <div className="flex gap-1 sm:gap-1.5">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="ml-2 sm:ml-4 h-2 w-24 sm:w-32 bg-white/10 rounded-full"></div>
                </div>

                {/* Abstract Content */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-1/3 h-24 sm:h-32 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <FiTrendingUp className="text-2xl sm:text-4xl text-blue-400" />
                    </div>
                    <div className="w-2/3 space-y-2 sm:space-y-3">
                      <div className="h-3 sm:h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-3 sm:h-4 w-1/2 bg-white/10 rounded animate-pulse delay-75"></div>
                      <div className="h-16 sm:h-20 w-full bg-white/5 rounded-lg sm:rounded-xl mt-2"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <div className="h-20 sm:h-24 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-500/20"></div>
                    <div className="h-20 sm:h-24 rounded-lg sm:rounded-xl bg-pink-500/10 border border-pink-500/20"></div>
                    <div className="h-20 sm:h-24 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20"></div>
                  </div>
                </div>
              </div>

              {playReel && reels.length > 0 && (
                <video
                  src={reels[0].videoUrl}
                  controls
                  autoPlay
                  className="w-full h-64 sm:h-80 rounded-xl object-cover mt-4"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
