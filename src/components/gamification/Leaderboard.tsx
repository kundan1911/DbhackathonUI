"use client"

import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

type LeaderboardEntry = {
  rank: number
  username: string
  points: number
  avatarUrl?: string
}

export function Leaderboard() {
  // This would typically come from an API
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, username: "SavingsPro", points: 2500, avatarUrl: "" },
    { rank: 2, username: "MoneyWise", points: 2200, avatarUrl: "" },
    { rank: 3, username: "SmartSaver", points: 2000, avatarUrl: "" },
    { rank: 4, username: "BudgetMaster", points: 1800, avatarUrl: "" },
    { rank: 5, username: "WealthBuilder", points: 1600, avatarUrl: "" },
  ]

  return (
    <Card className="w-full max-w-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Top Savers</h2>
      <div className="space-y-4">
        {leaderboardData.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center justify-between p-3 bg-secondary rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className={`text-lg font-bold ${
                entry.rank <= 3 ? "text-primary" : "text-muted-foreground"
              }`}>
                #{entry.rank}
              </span>
              <Avatar className="h-8 w-8">
                <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center text-sm font-semibold">
                  {entry.username.charAt(0)}
                </div>
              </Avatar>
              <span className="font-medium">{entry.username}</span>
            </div>
            <span className="font-semibold text-primary">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </Card>
  )
}