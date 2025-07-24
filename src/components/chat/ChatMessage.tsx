import { Bot, User, Volume2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { speak } from '@/lib/speech';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatMessageProps {
  message: Message;
  isSpeechEnabled?: boolean;
  language?: string;
}

export function ChatMessage({ message, isSpeechEnabled, language = 'en' }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  const handleSpeak = () => {
    if (isSpeechEnabled && !isUser) {
      speak(message.text, language);
    }
  };

  return (
    <div className={cn(
      'flex items-start gap-3 group relative',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-lg px-4 py-3 max-w-xl break-words',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      {!isUser && isSpeechEnabled && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSpeak}
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-12 top-0"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
