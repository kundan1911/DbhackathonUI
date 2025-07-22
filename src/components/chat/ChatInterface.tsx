"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAIResponse } from '@/actions/chat';
import { Bot } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiText = await getAIResponse(text, language);
      const aiMessage: Message = { id: (Date.now() + 1).toString(), text: aiText, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, something went wrong.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg shadow-lg w-full max-w-4xl mx-auto my-4 border">
      <ScrollArea className="flex-1 p-6">
        <div className="flex flex-col gap-4">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
               <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Bot className="h-12 w-12 text-primary" />
               </div>
              <h2 className="text-2xl font-semibold text-foreground font-headline">Welcome to FinCoach AI</h2>
              <p className="mt-2 max-w-md">Start by telling me about your financial situation or goals. For example: "I want to save for a down payment" or "How can I reduce my monthly expenses?"</p>
            </div>
          )}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div className="bg-muted rounded-lg p-3 w-full max-w-xl space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background/50">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} language={language} setLanguage={setLanguage} />
      </div>
    </div>
  );
}
