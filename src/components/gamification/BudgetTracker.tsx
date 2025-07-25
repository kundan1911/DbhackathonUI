"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wallet, Plus } from "lucide-react";

const STORAGE_KEY = "fincoach-budget-tracker";

interface Expense {
  name: string;
  amount: number;
}

export function BudgetTracker() {
  const [budget, setBudget] = useState<number>(0);
  const [budgetInput, setBudgetInput] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setBudget(parsed.budget || 0);
      setExpenses(parsed.expenses || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ budget, expenses })
    );
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
        <CardTitle className="font-headline text-2xl">Monthly Budget Challenge</CardTitle>
        <CardDescription>Track your spending and stay within your budget.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {budget === 0 ? (
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Enter your monthly budget"
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
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>Spent: ₹{totalSpent.toFixed(2)}</span>
                <span>Budget: ₹{budget.toFixed(2)}</span>
              </div>
              <div className="text-right text-green-600 font-semibold">
                Remaining: ₹{remaining.toFixed(2)}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
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
                Add Expense
              </Button>
            </div>

            {expenses.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Expenses:</h3>
                <ul className="text-sm space-y-1">
                  {expenses.map((exp, idx) => (
                    <li key={idx} className="flex justify-between border-b pb-1">
                      <span>{exp.name}</span>
                      <span className="font-medium">₹{exp.amount.toFixed(2)}</span>
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
          <p className="text-center w-full text-accent font-semibold">Budget Limit Reached! 🚨</p>
        )}
      </CardFooter>
    </Card>
  );
}
