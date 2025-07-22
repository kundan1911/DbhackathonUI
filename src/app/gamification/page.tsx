import { SavingsChallenge } from '@/components/gamification/SavingsChallenge';

export default function GamificationPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-primary">
          Your Challenges
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Take on financial challenges, track your progress, and earn achievements. Building good habits can be fun!
        </p>
      </div>
      <div className="flex justify-center">
        <SavingsChallenge />
      </div>
    </div>
  );
}
