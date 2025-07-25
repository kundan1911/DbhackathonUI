'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { speak, stopSpeaking } from '@/lib/speech';
import { ChatControls } from '@/components/chat/ChatControls';

export default function Home() {
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [language, setLanguage] = useState('en');
  // Remove the unused 'response' variable and expect the response as a parameter
  

  const handleSendMessage = async (message: string, response?: { content: string }) => {
    // ...existing message sending logic...
    
    if (response && isSpeechEnabled) {
      speak(response.content, language);
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeechEnabled) {
      stopSpeaking();
    }
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  return (
    <div className="container relative mx-auto p-4 flex flex-col h-full">
      <ChatControls 
        isSpeechEnabled={isSpeechEnabled}
        onToggleSpeech={handleToggleSpeech}
      />
      
      <div className="flex-1 w-full h-full">
        <ChatInterface 
          isSpeechEnabled={isSpeechEnabled}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
}
