"use client";

import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Mic, Send, Languages } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

export function ChatInput({ onSendMessage, isLoading, language, setLanguage }: ChatInputProps) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeechApiAvailable, setIsSpeechApiAvailable] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechApiAvailable(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(prevText => prevText + transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      const langMap: {[key: string]: string} = { en: 'en-US', es: 'es-ES', hi: 'hi-IN'};
      recognitionRef.current.lang = langMap[language] || 'en-US';
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SelectTrigger className="w-auto h-10 px-2.5">
                  <SelectValue asChild>
                    <Languages className="h-5 w-5" />
                  </SelectValue>
                </SelectTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select Language</p>
              </TooltipContent>
            </Tooltip>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
            </SelectContent>
          </Select>

          {isSpeechApiAvailable && (
             <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" size="icon" variant={isListening ? "destructive" : "outline"} onClick={handleMicClick} disabled={isLoading}>
                  <Mic className={cn("h-5 w-5", isListening && "animate-pulse")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voice Input</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your financial question..."
          className="flex-1 resize-none"
          rows={1}
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !text.trim()}>
          {isLoading ? <LoaderCircle className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
        </Button>
      </form>
    </TooltipProvider>
  );
}
