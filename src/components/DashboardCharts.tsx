"use client";

import { useMemo, useState } from "react";
import { User } from "@/types/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardChartsProps {
  users: User[];
  total: number;
}

export function DashboardCharts({ users, total }: DashboardChartsProps) {
  const [view, setView] = useState("total");

  const chartData = useMemo(() => {
    const bins: Record<number, { age: number; total: number; male: number; female: number; sumAge: number }> = {};
    
    // Инициализируем данные по всем возрастам, которые есть в выборке
    users.forEach(u => {
      if (!bins[u.age]) {
        bins[u.age] = { age: u.age, total: 0, male: 0, female: 0, sumAge: 0 };
      }
      bins[u.age].total++;
      if (u.gender === "male") bins[u.age].male++;
      if (u.gender === "female") bins[u.age].female++;
      bins[u.age].sumAge += u.age;
    });

    return Object.values(bins).sort((a, b) => a.age - b.age).map(b => ({
      name: `Age ${b.age}`,
      total: b.total,
      male: b.male,
      female: b.female,
      avg: Math.round(b.sumAge / b.total),
    }));
  }, [users]);

  if (users.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <CardTitle>User Analytics</CardTitle>
          <CardDescription>
            {view === "total" && "Total distribution by age"}
            {view === "gender" && "Comparison of Male and Female distribution"}
            {view === "age" && "Average age trend across demographics"}
          </CardDescription>
        </div>
        <Tabs defaultValue="total" className="w-full md:w-auto" onValueChange={setView}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="total">Total Users</TabsTrigger>
            <TabsTrigger value="gender">Gender</TabsTrigger>
            <TabsTrigger value="age">Avg Age</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" hide={true} />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              
              {view === "total" && (
                <Line 
                  name="Total Users"
                  type="linear" 
                  dataKey="total" 
                  stroke="#0ea5e9" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }}
                />
              )}
              
              {view === "gender" && (
                <>
                  <Line 
                    name="Male"
                    type="linear" 
                    dataKey="male" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ r: 3, fill: "#3b82f6" }}
                  />
                  <Line 
                    name="Female"
                    type="linear" 
                    dataKey="female" 
                    stroke="#f43f5e" 
                    strokeWidth={2} 
                    dot={{ r: 3, fill: "#f43f5e" }}
                  />
                </>
              )}
              
              {view === "age" && (
                <Line 
                  name="Average Age"
                  type="linear" 
                  dataKey="avg" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#10b981" }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
