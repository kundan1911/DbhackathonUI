"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AchievementModal } from "./AchievementModal";
import { PiggyBank, Plus, Wallet } from "lucide-react";

// ─────────────────────────────
// Shared Styles + Constants
// ─────────────────────────────
const SAVINGS_GOAL = 100;
const SAVINGS_KEY = "fincoach-savings-challenge";
const BUDGET_KEY = "fincoach-budget-tracker";

// ─────────────────────────────
// Savings Challenge Component
// ─────────────────────────────
function SavingsChallenge() {
  const [savings, setSavings] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(SAVINGS_KEY);
    if (saved) {
      const parsed = parseFloat(saved);
      if (!isNaN(parsed)) setSavings(parsed);
    }
  }, []);

  const handleLogSaving = () => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      const newSavings = savings + amount;
      setSavings(newSavings);
      localStorage.setItem(SAVINGS_KEY, newSavings.toString());
      setInputValue("");

      if (savings < SAVINGS_GOAL && newSavings >= SAVINGS_GOAL) {
        setShowAchievement(true);
      }
    }
  };

  const progressPercentage = Math.min((savings / SAVINGS_GOAL) * 100, 100);

  return (
    <>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit mb-2">
            <PiggyBank className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-2xl">Save ${SAVINGS_GOAL} this month!</CardTitle>
          <CardDescription>Log your daily savings and watch your progress grow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-sm font-medium text-muted-foreground">
            <span>${savings.toFixed(2)}</span>
            <span>${SAVINGS_GOAL}</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter amount saved"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogSaving()}
            />
            <Button onClick={handleLogSaving} disabled={!inputValue}>
              <Plus className="h-4 w-4 mr-2" />
              Log Saving
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          {progressPercentage >= 100 && (
            <p className="text-center w-full text-accent font-semibold">Challenge Complete! 🎉</p>
          )}
        </CardFooter>
      </Card>
      <AchievementModal isOpen={showAchievement} onClose={() => setShowAchievement(false)} />
    </>
  );
}

// ─────────────────────────────
// Budget Tracker Component
// ─────────────────────────────
function BudgetTracker() {
  const [budget, setBudget] = useState<number>(0);
  const [budgetInput, setBudgetInput] = useState<string>("");
  const [expenses, setExpenses] = useState<{ name: string; amount: number }[]>([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(BUDGET_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setBudget(parsed.budget || 0);
      setExpenses(parsed.expenses || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, JSON.stringify({ budget, expenses }));
  }, [budget, expenses]);

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = Math.max(budget - totalSpent, 0);
  const progress = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;

  const handleSetBudget = () => {
    const amt = parseFloat(budgetInput);
    if (!isNaN(amt) && amt > 0) {
      setBudget(amt);
      setBudgetInput("");
    }
  };

  const handleAddExpense = () => {
    const amt = parseFloat(expenseAmount);
    if (expenseName.trim() !== "" && !isNaN(amt) && amt > 0) {
      setExpenses((prev) => [...prev, { name: expenseName, amount: amt }]);
      setExpenseName("");
      setExpenseAmount("");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit mb-2">
          <Wallet className="h-8 w-8 text-accent" />
        </div>
        <CardTitle className="text-2xl">Monthly Budget Tracker</CardTitle>
        <CardDescription>Track your expenses and stick to your plan.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budget === 0 ? (
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Enter monthly budget"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetBudget()}
            />
            <Button onClick={handleSetBudget} disabled={!budgetInput}>
              Set Budget
            </Button>
          </div>
        ) : (
          <>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>Spent: ₹{totalSpent.toFixed(2)}</span>
              <span>Budget: ₹{budget.toFixed(2)}</span>
            </div>
            <div className="text-right text-green-600 font-semibold">
              Remaining: ₹{remaining.toFixed(2)}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Expense name"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddExpense()}
              />
              <Button onClick={handleAddExpense} disabled={!expenseName || !expenseAmount}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {expenses.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Expenses</h3>
                <ul className="text-sm space-y-1">
                  {expenses.map((e, i) => (
                    <li key={i} className="flex justify-between border-b pb-1">
                      <span>{e.name}</span>
                      <span>₹{e.amount.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        {budget > 0 && progress >= 100 && (
          <p className="text-center w-full text-accent font-semibold">Budget Exceeded! 🚨</p>
        )}
      </CardFooter>
    </Card>
  );
}

// ─────────────────────────────
// Main Component Exporting Both
// ─────────────────────────────
export default function FinancialChallenges() {
  return (
    <div className="flex flex-col items-center gap-10 px-4 py-8">
      <SavingsChallenge />
      <BudgetTracker />
    </div>
  );
}
