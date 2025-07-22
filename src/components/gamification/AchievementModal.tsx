"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Share2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute w-2 h-4 rounded-sm" style={style}></div>
);

export function AchievementModal({ isOpen, onClose }: AchievementModalProps) {
  const [confetti, setConfetti] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (isOpen) {
      const newConfetti = Array.from({ length: 50 }).map((_, i) => {
        const style: React.CSSProperties = {
          left: `${Math.random() * 100}%`,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
          animation: `confetti-fall ${2 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`,
        };
        return <ConfettiPiece key={i} style={style} />;
      });
      setConfetti(newConfetti);
    }
  }, [isOpen]);

  const handleShare = async () => {
    const shareData = {
      title: 'I completed a challenge on FinCoach AI!',
      text: "I just saved $100 this month with FinCoach AI! It's helping me build better financial habits.",
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing is not supported on your browser, but you can copy this message:\n" + shareData.text);
      }
    } catch (err) {
      console.error("Couldn't share achievement", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {confetti}
        </div>
        <DialogHeader className="text-center z-10 pt-8">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 border-4 border-primary/20">
            <Trophy className="h-16 w-16 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-headline">Achievement Unlocked!</DialogTitle>
          <DialogDescription>
            Congratulations! You've successfully saved $100.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2 z-10">
          <Button onClick={handleShare} className="w-full bg-accent hover:bg-accent/90">
            <Share2 className="mr-2 h-4 w-4" />
            Share Achievement
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
