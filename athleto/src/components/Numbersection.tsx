import React, { useEffect, useRef, useState } from 'react';
import { AnimatedNumber } from "./Numberanimation";
import { SparklesCore } from '@/app/sparkles';

const stats = [
  {
    value: 600,
    suffix: "+",
    label: "Elite Athletes",
    gradient: "from-indigo-600 to-indigo-400",
  },
  {
    value: 200,
    suffix: "+",
    label: "Brands & Agencies",
    gradient: "from-indigo-500 to-indigo-300",
  },
  {
    value: 85,
    label: "Nationalities",
    gradient: "from-indigo-300 to-indigo-100",
  },
];

export default function NumbersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden py-10 md:py-20"
    >
      {/* Sparkles Background */}
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

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid grid-cols-8 gap-x-4 opacity-[0.02]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-full w-px bg-gradient-to-b from-indigo-800" />
          ))}
        </div>

        <div className="relative">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl bg-black/10 backdrop-blur-sm transition-all duration-500 hover:bg-black/20 w-full max-w-sm transform ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-16 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-800/30 to-transparent p-[1px]">
                    <div className="h-full w-full rounded-2xl bg-black/40" />
                  </div>

                  {/* Content */}
                  <div className="relative p-8 space-y-4">
                    <div className="flex h-16 items-end">
                      <span
                        className={`block bg-gradient-to-r ${stat.gradient} bg-clip-text text-5xl font-bold tracking-tight text-transparent transition-transform duration-300 group-hover:scale-110 lg:text-6xl`}
                      >
                        {isVisible && (
                          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                        )}
                      </span>
                    </div>
                    <div className="h-px w-12 bg-gradient-to-r from-indigo-800 to-transparent" />
                    <p className="text-sm font-medium text-indigo-200/80">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}