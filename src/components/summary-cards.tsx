import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpCircle, ArrowDownCircle, Scale } from 'lucide-react';

type Totals = {
  income: number;
  expense: number;
  balance: number;
};

type SummaryCardsProps = {
  daily: Totals;
  monthly: Totals;
  yearly: Totals;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

function TotalsDisplay({ totals }: { totals: Totals }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{formatCurrency(totals.income)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{formatCurrency(totals.expense)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <Scale className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-accent' : 'text-destructive'}`}>
            {formatCurrency(totals.balance)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SummaryCards({ daily, monthly, yearly }: SummaryCardsProps) {
  return (
    <Tabs defaultValue="monthly" className="space-y-4">
      <TabsList>
        <TabsTrigger value="daily">Daily</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
      </TabsList>
      <TabsContent value="daily">
        <TotalsDisplay totals={daily} />
      </TabsContent>
      <TabsContent value="monthly">
        <TotalsDisplay totals={monthly} />
      </TabsContent>
      <TabsContent value="yearly">
        <TotalsDisplay totals={yearly} />
      </TabsContent>
    </Tabs>
  );
}
