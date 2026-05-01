"use client";

import { useSearchParams } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import { UserTable } from "@/components/UserTable";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardCharts } from "@/components/DashboardCharts";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, LayoutDashboard } from "lucide-react";

export default function DashboardContent() {
  const searchParams = useSearchParams();
  
  const limit = Number(searchParams.get("limit")) || 10;
  const skip = Number(searchParams.get("skip")) || 0;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const order = (searchParams.get("order") as "asc" | "desc") || "asc";

  const { data, isLoading, isError, error } = useUsers({
    limit,
    skip,
    search,
    sortBy,
    order,
  });

  if (isError) {
    return (
      <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">Failed to load users</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "An unknown error occurred while fetching users."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          Users Dashboard
        </h2>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-[350px] w-full" />
            <Skeleton className="h-[350px] w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      ) : (
        <>
          <DashboardStats users={data?.users || []} total={data?.total || 0} />
          <DashboardCharts users={data?.users || []} total={data?.total || 0} />
          <UserTable 
            users={data?.users || []} 
            total={data?.total || 0} 
            limit={limit}
            skip={skip}
          />
        </>
      )}
    </div>
  );
}
