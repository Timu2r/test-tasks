import { UsersResponse } from "@/types/user";

const BASE_URL = "https://dummyjson.com";

export async function fetchUsers(params: {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}): Promise<UsersResponse> {
  const url = new URL(`${BASE_URL}/users${params.search ? "/search" : ""}`);
  
  if (params.search) url.searchParams.set("q", params.search);
  if (params.limit) url.searchParams.set("limit", params.limit.toString());
  if (params.skip) url.searchParams.set("skip", params.skip.toString());
  if (params.sortBy) url.searchParams.set("sortBy", params.sortBy);
  if (params.order) url.searchParams.set("order", params.order);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchAllUsers(): Promise<UsersResponse> {
  const res = await fetch(`${BASE_URL}/users?limit=0`);
  if (!res.ok) throw new Error("Failed to fetch all users");
  return res.json();
}
