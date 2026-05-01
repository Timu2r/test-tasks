import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchAllUsers } from "@/lib/api";

export function useUsers(params: {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });
}

export function useAllUsers() {
  return useQuery({
    queryKey: ["users", "all"],
    queryFn: fetchAllUsers,
  });
}
