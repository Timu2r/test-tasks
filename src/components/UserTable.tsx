"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { UserModal } from "./UserModal";

interface UserTableProps {
  users: User[];
  total: number;
  limit: number;
  skip: number;
}

export function UserTable({ users, total, limit, skip }: UserTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleSearchTrigger = () => {
    updateQuery({ search: searchTerm || null, skip: "0" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchTrigger();
    }
  };

  const handleSort = (column: string) => {
    const currentSort = searchParams.get("sortBy");
    const currentOrder = searchParams.get("order");

    let nextOrder: "asc" | "desc" = "asc";
    if (currentSort === column && currentOrder === "asc") {
      nextOrder = "desc";
    }

    // Если мы нажимаем на ту же колонку, и она была в desc, то сбрасываем сортировку (опционально)
    // Но для простоты оставим переключение asc/desc
    updateQuery({ sortBy: column, order: nextOrder });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 max-w-sm items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button 
            onClick={handleSearchTrigger} 
            disabled={isPending}
            variant="default"
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select
            defaultValue={limit.toString()}
            onValueChange={(value) => updateQuery({ limit: value, skip: "0" })}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort("firstName")}
              >
                <div className="flex items-center gap-1">
                  Name <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground text-center"
                onClick={() => handleSort("age")}
              >
                <div className="flex items-center justify-center gap-1">
                  Age <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow 
                  key={user.id} 
                  className="cursor-pointer transition-colors"
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell>
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="h-8 w-8 rounded-full bg-muted"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell className="text-center">{user.age}</TableCell>
                  <TableCell className="capitalize">{user.gender}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{user.company.name}</p>
                      <p className="text-xs text-muted-foreground">{user.company.title}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {skip + 1} to {Math.min(skip + limit, total)} of {total} users
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuery({ skip: Math.max(0, skip - limit).toString() })}
            disabled={currentPage === 1 || isPending}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-1 text-sm font-medium">
            {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuery({ skip: (skip + limit).toString() })}
            disabled={currentPage === totalPages || isPending}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <UserModal 
        user={selectedUser} 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />
    </div>
  );
}
