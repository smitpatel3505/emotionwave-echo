
// This file contains utility functions for audio recording and processing

export const startRecording = async (): Promise<MediaRecorder> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    return mediaRecorder;
  } catch (err) {
    console.error("Error accessing microphone:", err);
    throw new Error("Could not access microphone. Please allow microphone access and try again.");
  }
};

export const stopRecording = (mediaRecorder: MediaRecorder): Promise<Blob> => {
  return new Promise((resolve) => {
    const chunks: BlobPart[] = [];
    
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      resolve(blob);
      
      // Stop all tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    };
    
    mediaRecorder.stop();
  });
};

// Function to convert blob to base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix
      const base64 = base64String.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Mock function to analyze audio emotion (since we don't have a backend yet)
export const analyzeAudio = async (audioBlob: Blob): Promise<{ emotion: string, confidence: number }> => {
  // In a real implementation, this would send the audio to your backend API
  // For now, we'll simulate a delay and return a random emotion
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // List of possible emotions
  const emotions = ['happy', 'sad', 'angry', 'fearful', 'surprised', 'neutral', 'calm', 'disgust'];
  
  // Return a random emotion with random confidence
  const randomIndex = Math.floor(Math.random() * emotions.length);
  const randomConfidence = 0.5 + Math.random() * 0.5; // Between 0.5 and 1.0
  
  return {
    emotion: emotions[randomIndex],
    confidence: randomConfidence
  };
};
