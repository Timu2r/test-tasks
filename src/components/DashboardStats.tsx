"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserPlus, TrendingUp } from "lucide-react";
import { User } from "@/types/user";

interface DashboardStatsProps {
  users: User[];
  total: number;
}

export function DashboardStats({ users, total }: DashboardStatsProps) {
  const avgAge = users.length > 0 
    ? Math.round(users.reduce((acc, user) => acc + user.age, 0) / users.length) 
    : 0;
  
  const maleCount = users.filter(u => u.gender === 'male').length;
  const femaleCount = users.filter(u => u.gender === 'female').length;

  const stats = [
    {
      title: "Total Users",
      value: total.toLocaleString(),
      icon: Users,
      description: "Total registered users",
    },
    {
      title: "Average Age",
      value: avgAge,
      icon: TrendingUp,
      description: "Average age of users",
    },
    {
      title: "Male Users",
      value: maleCount,
      icon: UserCheck,
      description: `${Math.round((maleCount / users.length) * 100) || 0}% of displayed`,
    },
    {
      title: "Female Users",
      value: femaleCount,
      icon: UserPlus,
      description: `${Math.round((femaleCount / users.length) * 100) || 0}% of displayed`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
