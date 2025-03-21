
import React from 'react';
import { 
  Smile, 
  Frown, 
  Laugh, 
  AngryIcon, 
  AlertTriangle, 
  HelpCircle, 
  XCircle, 
  ThumbsUp, 
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmotionDisplayProps {
  emotion: string | null;
  confidence?: number;
}

const emotionConfig: Record<string, { icon: React.ReactNode, color: string, label: string }> = {
  happy: { 
    icon: <Smile className="w-12 h-12" />, 
    color: 'from-yellow-400 to-amber-500',
    label: 'Happy'
  },
  sad: { 
    icon: <Frown className="w-12 h-12" />, 
    color: 'from-blue-400 to-indigo-500',
    label: 'Sad'
  },
  angry: { 
    icon: <AngryIcon className="w-12 h-12" />, 
    color: 'from-red-400 to-rose-500',
    label: 'Angry'
  },
  surprised: { 
    icon: <AlertTriangle className="w-12 h-12" />, 
    color: 'from-purple-400 to-fuchsia-500',
    label: 'Surprised'
  },
  surprise: { 
    icon: <AlertTriangle className="w-12 h-12" />, 
    color: 'from-purple-400 to-fuchsia-500',
    label: 'Surprise'
  },
  fearful: { 
    icon: <XCircle className="w-12 h-12" />, 
    color: 'from-slate-400 to-slate-600',
    label: 'Fearful'
  },
  disgust: { 
    icon: <XCircle className="w-12 h-12" />, 
    color: 'from-emerald-400 to-green-600',
    label: 'Disgust'
  },
  neutral: { 
    icon: <ThumbsUp className="w-12 h-12" />, 
    color: 'from-gray-400 to-gray-500',
    label: 'Neutral'
  },
  calm: { 
    icon: <Heart className="w-12 h-12" />, 
    color: 'from-teal-400 to-cyan-500',
    label: 'Calm'
  }
};

const EmotionDisplay: React.FC<EmotionDisplayProps> = ({ emotion, confidence = 0 }) => {
  if (!emotion) return null;
  
  const emotionData = emotionConfig[emotion.toLowerCase()] || {
    icon: <HelpCircle className="w-12 h-12" />,
    color: 'from-gray-400 to-gray-600',
    label: emotion
  };

  return (
    <div className="w-full animate-scale-up">
      <div className={cn(
        "emotion-card p-6 flex flex-col items-center", 
        "transition-all duration-300"
      )}>
        <div className={cn(
          "p-4 rounded-full mb-4",
          "bg-gradient-to-br",
          emotionData.color,
          "text-white"
        )}>
          {emotionData.icon}
        </div>
        
        <h2 className="text-xl font-semibold mb-1">{emotionData.label}</h2>
        
        {confidence > 0 && (
          <div className="w-full mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Confidence</span>
              <span>{Math.round(confidence * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={cn(
                  "h-full rounded-full", 
                  `bg-gradient-to-r ${emotionData.color}`
                )}
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionDisplay;
