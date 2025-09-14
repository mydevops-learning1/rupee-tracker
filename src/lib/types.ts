export type Transaction = {
  id: string;
  date: string; // ISO string
  description: string;
  amount: number;
  type: 'income' | 'expense';
};
