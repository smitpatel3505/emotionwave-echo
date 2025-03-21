
import React, { useState, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordButtonProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  remainingTime: number;
  maxRecordingTime: number;
  disabled?: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  remainingTime,
  maxRecordingTime,
  disabled = false
}) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isRecording) {
      setPulse(true);
    } else {
      setPulse(false);
    }
  }, [isRecording]);

  const progressPercentage = (remainingTime / maxRecordingTime) * 100;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {isRecording && (
        <div className="absolute -top-12 font-medium text-lg text-center opacity-90 animate-fade-in">
          {remainingTime.toFixed(1)}s
        </div>
      )}
      
      <button
        onClick={isRecording ? onStopRecording : onStartRecording}
        disabled={disabled}
        className={cn(
          "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300",
          isRecording 
            ? "bg-red-500 hover:bg-red-600"
            : "bg-primary hover:bg-primary/90",
          disabled && "opacity-50 cursor-not-allowed",
          pulse && "before:absolute before:inset-0 before:rounded-full before:animate-pulse-ring before:bg-red-400/30"
        )}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? (
          <Square className="w-10 h-10 text-white" />
        ) : (
          <Mic className="w-10 h-10 text-white" />
        )}
        
        {isRecording && (
          <svg className="absolute inset-0 w-full h-full rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="8"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              stroke="white" 
              strokeWidth="8"
              strokeDasharray="289.03"
              strokeDashoffset={289.03 * (1 - progressPercentage / 100)}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
          </svg>
        )}
      </button>
      
      <div className="mt-5 text-center">
        {isRecording ? (
          <span className="text-red-500 font-medium animate-pulse">Recording...</span>
        ) : (
          <span className="text-muted-foreground">Tap to record</span>
        )}
      </div>
    </div>
  );
};

export default RecordButton;
