"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { AchievementModal } from './AchievementModal';
import { PiggyBank, Plus } from 'lucide-react';

const CHALLENGE_GOAL = 100;
const STORAGE_KEY = 'fincoach-savings-challenge';

export function SavingsChallenge() {
  const [savings, setSavings] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    // This effect runs only on the client
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      const parsedProgress = parseFloat(savedProgress);
      if (!isNaN(parsedProgress)) {
        setSavings(parsedProgress);
      }
    }
  }, []);

  const handleLogSaving = () => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      const newSavings = savings + amount;
      setSavings(newSavings);
      localStorage.setItem(STORAGE_KEY, newSavings.toString());
      setInputValue('');

      if (savings < CHALLENGE_GOAL && newSavings >= CHALLENGE_GOAL) {
        setShowAchievement(true);
      }
    }
  };
  
  const progressPercentage = Math.min((savings / CHALLENGE_GOAL) * 100, 100);

  return (
    <>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit mb-2">
            <PiggyBank className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="font-headline text-2xl">Save ${CHALLENGE_GOAL} this month!</CardTitle>
          <CardDescription>Log your daily savings and watch your progress grow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>${savings.toFixed(2)}</span>
              <span>${CHALLENGE_GOAL}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter amount saved"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogSaving()}
            />
            <Button onClick={handleLogSaving} disabled={!inputValue}>
              <Plus className="h-4 w-4 mr-2" />
              Log Saving
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          {progressPercentage >= 100 &&
            <p className="text-center w-full text-accent font-semibold">Challenge Complete! 🎉</p>
          }
        </CardFooter>
      </Card>
      <AchievementModal 
        isOpen={showAchievement} 
        onClose={() => setShowAchievement(false)} 
      />
    </>
  );
}
