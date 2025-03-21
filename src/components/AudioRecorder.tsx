
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import RecordButton from './RecordButton';
import LoadingAnimation from './LoadingAnimation';
import EmotionDisplay from './EmotionDisplay';
import { startRecording, stopRecording, analyzeAudio } from '@/lib/audioUtils';

const MAX_RECORDING_TIME = 5; // 5 seconds maximum

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [remainingTime, setRemainingTime] = useState(MAX_RECORDING_TIME);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup function to stop recording and clear timer
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const handleStartRecording = async () => {
    try {
      setEmotion(null);
      setIsRecording(true);
      setRemainingTime(MAX_RECORDING_TIME);
      
      // Start recording
      const recorder = await startRecording();
      mediaRecorderRef.current = recorder;
      
      // Start countdown timer
      timerRef.current = window.setInterval(() => {
        setRemainingTime(prev => {
          const newTime = prev - 0.1;
          if (newTime <= 0) {
            handleStopRecording();
            return 0;
          }
          return newTime;
        });
      }, 100);
      
    } catch (error) {
      console.error("Failed to start recording:", error);
      setIsRecording(false);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      toast.error("Failed to access microphone. Please check permissions.");
    }
  };

  const handleStopRecording = async () => {
    if (!mediaRecorderRef.current) return;
    
    // Clear timer
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsRecording(false);
    setIsAnalyzing(true);
    
    try {
      // Stop the recording and get the audio blob
      const audioBlob = await stopRecording(mediaRecorderRef.current);
      
      // Send to analysis
      const result = await analyzeAudio(audioBlob);
      
      // Update with results
      setEmotion(result.emotion);
      setConfidence(result.confidence);
    } catch (error) {
      console.error("Error during recording or analysis:", error);
      toast.error("Something went wrong during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="relative w-full p-8 overflow-hidden rounded-3xl glass">
        <LoadingAnimation isLoading={isAnalyzing} />
        
        {emotion ? (
          <div className="my-4">
            <EmotionDisplay emotion={emotion} confidence={confidence} />
            <button 
              onClick={() => setEmotion(null)}
              className="mt-8 px-6 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Record Again
            </button>
          </div>
        ) : (
          <RecordButton 
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            remainingTime={remainingTime}
            maxRecordingTime={MAX_RECORDING_TIME}
            disabled={isAnalyzing}
          />
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
