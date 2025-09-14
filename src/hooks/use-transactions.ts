'use client';
import { useState, useEffect, useMemo } from 'react';
import type { Transaction } from '@/lib/types';
import { startOfToday, startOfMonth, startOfYear, isSameDay, isSameMonth, isSameYear, subDays } from 'date-fns';

const STORAGE_KEY = 'rupee-tracker-transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem(STORAGE_KEY);
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error("Failed to load transactions from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (transactions.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      }
    } catch (error) {
      console.error("Failed to save transactions to localStorage", error);
    }
  }, [transactions]);
  
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const calculateTotals = (filteredTransactions: Transaction[]) => {
    return filteredTransactions.reduce(
      (acc, t) => {
        if (t.type === 'income') {
          acc.income += t.amount;
        } else {
          acc.expense += t.amount;
        }
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  };
  
  const dailyTotals = useMemo(() => {
    const today = startOfToday();
    const dailyTransactions = transactions.filter(t => isSameDay(new Date(t.date), today));
    return calculateTotals(dailyTransactions);
  }, [transactions]);

  const monthlyTotals = useMemo(() => {
    const thisMonth = startOfMonth(new Date());
    const monthlyTransactions = transactions.filter(t => isSameMonth(new Date(t.date), thisMonth));
    return calculateTotals(monthlyTransactions);
  }, [transactions]);

  const yearlyTotals = useMemo(() => {
    const thisYear = startOfYear(new Date());
    const yearlyTransactions = transactions.filter(t => isSameYear(new Date(t.date), thisYear));
    return calculateTotals(yearlyTransactions);
  }, [transactions]);
  
  const chartData = useMemo(() => {
    const data = Array.from({ length: 7 }).map((_, i) => {
      const date = subDays(new Date(), i);
      const daily = transactions.filter(t => isSameDay(new Date(t.date), date));
      const totals = calculateTotals(daily);
      return {
        date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        Income: totals.income,
        Expense: totals.expense
      };
    }).reverse();
    return data;
  }, [transactions]);


  return {
    transactions,
    addTransaction,
    dailyTotals,
    monthlyTotals,
    yearlyTotals,
    chartData
  };
}
