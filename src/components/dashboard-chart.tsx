'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface ChartData {
  date: string;
  Income: number;
  Expense: number;
}

interface DashboardChartProps {
  data: ChartData[];
}

const chartConfig = {
  Income: {
    label: 'Income',
    color: 'hsl(var(--accent))',
  },
  Expense: {
    label: 'Expense',
    color: 'hsl(var(--destructive))',
  },
} satisfies ChartConfig;

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Income and expenses for the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `₹${Number(value) / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent
                indicator="dot"
                formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value as number)}
                />}
            />
            <Bar dataKey="Income" fill="var(--color-Income)" radius={4} />
            <Bar dataKey="Expense" fill="var(--color-Expense)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
