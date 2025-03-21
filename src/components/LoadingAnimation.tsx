
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingAnimationProps {
  isLoading: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={cn(
      "absolute inset-0 flex flex-col items-center justify-center z-20",
      "bg-background/80 backdrop-blur-sm rounded-3xl",
      "transition-all duration-300",
      isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="flex space-x-2 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-3 h-12 bg-primary/80 rounded-full"
            style={{
              animation: `wave 1s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      <p className="text-primary/90 font-medium mt-4">Analyzing emotion...</p>
    </div>
  );
};

export default LoadingAnimation;
