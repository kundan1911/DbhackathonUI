'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, LoaderCircle, Languages } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languageVoiceMap: { [key: string]: string } = {
  en: 'en-US',
  es: 'es-ES',
  hi: 'hi-IN'
};

export default function PhoneConversation() {
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = languageVoiceMap[language];
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("User said:", transcript);
      handleSend(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      retryListening();
    };

    recognition.onend = () => {
        setIsListening(false);
      
        // Don't restart if currently speaking
        if (!isSpeaking && isSessionActive) {
          console.log('🔁 Mic ended, restarting...');
          retryListening();
        }
      };
      

    // speech synthesis listeners
    const synth = window.speechSynthesis;
    synth.addEventListener('start', () => setIsSpeaking(true));
    synth.addEventListener('end', () => {
      setIsSpeaking(false);
      if (isSessionActive) {
        retryListening();
      }
    });

    return () => {
      synth.removeEventListener('start', () => setIsSpeaking(true));
      synth.removeEventListener('end', () => setIsSpeaking(false));
    };
  }, [language, isSessionActive]);

  const retryListening = () => {
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    restartTimerRef.current = setTimeout(() => {
      startListening();
    }, 500); // slightly longer delay
  };

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
  
    // Cancel speech output if user interrupts
    if (window.speechSynthesis.speaking || isSpeaking) {
      console.log('🛑 User interrupted. Cancelling speech.');
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  
    try {
      recognition.lang = languageVoiceMap[language];
  
      // Stop if it's already listening
      recognition.abort();
  
      setTimeout(() => {
        try {
          recognition.start();
          console.log('🎤 Listening started');
          setIsListening(true);
        } catch (err: any) {
          console.error('❌ Mic start error:', err.message || err);
        }
      }, 200); // Add slight delay to allow abort to finish
    } catch (err) {
      console.error("Mic start outer error:", err);
    }
  };
  

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    stopListening(); // ensure no mic overlap
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageVoiceMap[language];
    const voice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith(languageVoiceMap[language]));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.cancel(); // cancel any ongoing
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (text: string) => {
    stopListening();
    try {
        const res = await fetch("http://127.0.0.1:8000/advisor", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "user_id": 3,
                "question": text
              , language })
          });
      const data = await res.json();
      console.log("Bot reply:", data.response);
      speak(data.response);
    } catch (e) {
      console.error("Backend error:", e);
    }
  };

  const handleMicStart = () => {
    if (!isSessionActive) {
      setIsSessionActive(true);
      startListening();
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Select value={language} onValueChange={(val) => { setLanguage(val); }} disabled={isSessionActive}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="hi">हिन्दी</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleMicStart} disabled={isSessionActive}>
          {isListening ? <LoaderCircle className="animate-spin w-5 h-5" /> : <Mic className="w-5 h-5" />}
          <span className="ml-2">{isSessionActive ? "Active" : "Start"}</span>
        </Button>
      </div>
      <p className="text-sm text-gray-500 text-center">Speak anytime. You'll hear the reply. Interrupt to speak again.</p>
    </div>
  );
}
