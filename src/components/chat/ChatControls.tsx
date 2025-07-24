import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ChatControlsProps {
  isSpeechEnabled: boolean;
  onToggleSpeech: () => void;
}

export function ChatControls({ isSpeechEnabled, onToggleSpeech }: ChatControlsProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSpeech}
            className="absolute right-4 top-4"
          >
            {isSpeechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isSpeechEnabled ? 'Disable speech' : 'Enable speech'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
