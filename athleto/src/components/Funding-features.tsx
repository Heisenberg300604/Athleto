import React, { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/app/sparkles';

// Define FundingOption interface without dependency on Lucide icons
interface FundingOption {
  id: number;
  title: string;
  description: string;
  svgPath: string; // SVG path data instead of Lucide icon
}

// Custom SVG icons defined via path data
const fundingOptions: FundingOption[] = [
  {
    id: 1,
    title: "Crowdfunding for Athletes",
    description: "Empower athletes with community-driven funding. Supporters can contribute via UPI, PayPal, or crypto, ensuring seamless and transparent transactions.",
    svgPath: "M16 16V21.5C16 22.3284 15.3284 23 14.5 23H2.5C1.67157 23 1 22.3284 1 21.5V9.5C1 8.67157 1.67157 8 2.5 8H8M13.5 1H11C9.89543 1 9 1.89543 9 3V8C9 9.10457 9.89543 10 11 10H13.5C14.6046 10 15.5 9.10457 15.5 8V3C15.5 1.89543 14.6046 1 13.5 1ZM1 14H8M20.5 9.5L19 8L16 11L14.5 9.5L13 11L16 14L20.5 9.5Z"
  },
  {
    id: 2,
    title: "Train Now, Pay Later",
    description: "Athletes receive zero-interest loans for training and repay later through fixed installments or a percentage of future earnings, ensuring financial flexibility.",
    svgPath: "M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z"
  },
  {
    id: 3,
    title: "Micro-Investment Model",
    description: "Athletes tokenize a portion of their future earnings in exchange for immediate funding, providing investors with a share in their success.",
    svgPath: "M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
  },
  {
    id: 4,
    title: "Athlete Marketplace for Paid Collaborations",
    description: "A platform where brands can directly hire athletes for workshops, demos, motivational talks, and training sessions, ensuring secure payments.",
    svgPath: "M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22ZM7 13H10V17H14V13H17L12 8L7 13Z"
  },
  {
    id: 5,
    title: "Scholarship & Grants Portal",
    description: "A centralized hub for athletes to discover and apply for scholarships and grants from governments, NGOs, and private organizations.",
    svgPath: "M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"
  },
  {
    id: 6,
    title: "Brand Leaderboard & Rewards Model",
    description: "A gamified system that ranks athletes and brands based on sponsorships and engagement, rewarding top performers with funding and premium platform benefits.",
    svgPath: "M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3ZM15.1 17H18.1V8.8H15.1V17ZM10.5 17H13.5V12.1H10.5V17ZM5.9 17H8.9V14.2H5.9V17Z"
  }
];

const FundingShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Starting with Train Now, Pay Later option

  // Responsive scaling for the hexagon
  const getHexagonSize = (): number => {
    // Using window check for client-side rendering
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 260; // sm
      if (window.innerWidth < 768) return 300; // md
      if (window.innerWidth < 1024) return 350; // lg
      return 400; // xl and above
    }
    return 350; // Default for server-side rendering
  };

  // Function to render SVG icon
  const renderIcon = (svgPath: string, isActive: boolean): ReactNode => {
    const size = isActive ? 28 : 24;
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-white transition-all duration-300"
      >
        <path d={svgPath} />
      </svg>
    );
  };

  return (
    <section className="w-full py-12 md:py-20 relative overflow-hidden">
      {/* Sparkles background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticles-numbers"
          background="transparent"
          particleColor="#4A90E2"
          particleDensity={70}
          className="h-full w-full"
          minSize={0.9}
          maxSize={2.2}
        />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
            Innovative Funding Solutions
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base">
            Discover our six unique funding models designed to empower underprivileged athletes and transform Indian football.
          </p>
        </div>

        {/* Responsive flex layout that works on all screen sizes */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center justify-center">
          {/* Hexagon selector with responsive sizing */}
          <div className="relative w-full lg:w-1/2 h-72 sm:h-80 md:h-96">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Responsive SVG hexagon */}
              <svg 
                width={getHexagonSize()} 
                height={getHexagonSize()} 
                viewBox="0 0 400 400" 
                className="transform scale-75 sm:scale-90 md:scale-100"
              >
                <defs>
                  <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                
                {/* Outer hexagon background */}
                <path 
                  d="M200,40 L320,108 L320,268 L200,336 L80,268 L80,108 Z" 
                  fill="rgba(59, 130, 246, 0.1)" 
                  stroke="url(#hexGradient)" 
                  strokeWidth="2"
                />

                {/* Inner connecting lines */}
                <line x1="200" y1="40" x2="200" y2="336" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                <line x1="80" y1="108" x2="320" y2="268" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                <line x1="80" y1="268" x2="320" y2="108" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />

                {/* Individual hexagon nodes */}
                {fundingOptions.map((option, index) => {
                  // Calculate position around the hexagon
                  const angle = (index * (2 * Math.PI / 6)) - Math.PI/6;
                  const radius = 140;
                  const x = 200 + radius * Math.cos(angle);
                  const y = 200 + radius * Math.sin(angle);

                  return (
                    <g key={option.id} onClick={() => setActiveIndex(index)} style={{ cursor: 'pointer' }}>
                      {/* Node circle */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={activeIndex === index ? 36 : 30}
                        fill={activeIndex === index ? "url(#hexGradient)" : "rgba(59, 130, 246, 0.2)"}
                        stroke={activeIndex === index ? "#fff" : "rgba(139, 92, 246, 0.5)"}
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                      
                      {/* For SVG-based icons, we need to use foreignObject to embed React components */}
                      <foreignObject x={x - 18} y={y - 18} width="36" height="36">
                        <div className="flex items-center justify-center h-full w-full text-white">
                          {renderIcon(option.svgPath, activeIndex === index)}
                        </div>
                      </foreignObject>
                      
                      {/* Number labels with background */}
                      <circle 
                        cx={x} 
                        cy={y + 46}
                        r="14"
                        fill="rgba(59, 130, 246, 0.8)" 
                        className="transition-opacity duration-300"
                        opacity={activeIndex === index ? 1 : 0.8}
                      />
                      <text 
                        x={x} 
                        y={y + 46}
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill="#fff" 
                        fontSize="14"
                        fontWeight="bold"
                        className="transition-opacity duration-300"
                      >
                        {index + 1}
                      </text>
                    </g>
                  );
                })}

                {/* Center circle with Athleto */}
                <circle cx="200" cy="200" r="58" fill="rgba(59, 130, 246, 0.2)" stroke="url(#hexGradient)" strokeWidth="2" />
                <text x="200" y="190" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="24" fontWeight="bold">
                  Athleto
                </text>
                <text x="200" y="220" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="16">
                  Funding
                </text>
              </svg>
            </div>
          </div>

          {/* Funding details panel */}
          <motion.div 
            className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700 shadow-xl backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            key={activeIndex}
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white"
                >
                  <path d={fundingOptions[activeIndex].svgPath} />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {fundingOptions[activeIndex].title}
              </h3>
            </div>
            
            <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm sm:text-base md:text-lg">
              {fundingOptions[activeIndex].description}
            </p>
            
            {/* Progress indicators */}
            <div className="flex justify-center mt-4 md:mt-8 gap-2 md:gap-3">
              {fundingOptions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'w-6 md:w-8 bg-blue-400' : 'bg-gray-600'
                  }`}
                  aria-label={`View funding option ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FundingShowcase;