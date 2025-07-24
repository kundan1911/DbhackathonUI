import Link from 'next/link';
import { Bot, Coins, Gamepad2 , GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Bot className="h-8 w-8" />
              <span className="text-xl font-bold font-headline">FinCoach AI</span>
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">
                <Coins className="h-4 w-4 mr-2" />
                Chat Coach
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/gamification">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Challenges
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/education">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
