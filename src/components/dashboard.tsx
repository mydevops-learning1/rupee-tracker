'use client';

import { useState } from 'react';
import { useTransactions } from '@/hooks/use-transactions';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { PlusCircle } from 'lucide-react';
import { TransactionForm } from './transaction-form';
import { SummaryCards } from './summary-cards';
import { TransactionsTable } from './transactions-table';
import { DashboardChart } from './dashboard-chart';
import type { Transaction } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function Dashboard() {
  const { transactions, addTransaction, dailyTotals, monthlyTotals, yearlyTotals, chartData } = useTransactions();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTransaction = (data: Omit<Transaction, 'id' | 'date'>) => {
    addTransaction(data);
    setIsSheetOpen(false);
    toast({
      title: "Success",
      description: "Your transaction has been added.",
      variant: "default",
    })
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
        <h1 className="text-2xl font-bold text-foreground font-headline">Rupee Tracker</h1>
        <div className="ml-auto">
          <Button onClick={() => setIsSheetOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <SummaryCards daily={dailyTotals} monthly={monthlyTotals} yearly={yearlyTotals} />

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DashboardChart data={chartData} />
          </div>
          <div className="row-start-1 lg:row-start-auto xl:col-span-1">
            <TransactionsTable transactions={transactions.slice(0, 5)} />
          </div>
        </div>
      </main>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a new transaction</SheetTitle>
            <SheetDescription>
              Enter the details of your income or expense.
            </SheetDescription>
          </SheetHeader>
          <TransactionForm onSubmit={handleAddTransaction} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
