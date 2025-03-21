
import React from 'react';
import AudioRecorder from '@/components/AudioRecorder';
import { Toaster } from 'sonner';
import { Mic } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-background p-4 sm:p-8">
      <Toaster position="top-center" />
      
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <header className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10">
          <Mic className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2 tracking-tight">
          Speech Emotion Recognition
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Record a 5-second audio clip and our AI will detect your emotional tone.
        </p>
      </header>
      
      <main className="w-full max-w-md mx-auto relative z-10">
        <AudioRecorder />
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>For demonstration purposes only. Emotions are simulated.</p>
        <p className="mt-1">To implement real emotion detection, connect the app to a backend API.</p>
      </footer>
    </div>
  );
};

export default Index;
