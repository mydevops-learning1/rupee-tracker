export const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Salary',
  'Freelance',
  'Investment',
  'Other',
] as const;

export type Category = (typeof categories)[number];

export type Transaction = {
  id: string;
  date: string; // ISO string
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: Category;
};
