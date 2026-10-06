"use client";

import { ListSkeletonGrid } from "@/components/shared/list-skeleton-grid";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsers, useUpdateUserStatus } from "@/hooks/useUsers";
import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types/session.type";
import { UserType } from "@/types/user.type";
import Link from "next/link";

const UsersList = () => {
  const { data, isLoading } = useGetAllUsers();
  const { mutate: updateUserStatus, isPending } = useUpdateUserStatus();
  const { data: sessionData } = useSession();
  const session = sessionData as AppSession | null;

  if (isLoading) return <ListSkeletonGrid count={10} />;

  const users = data?.data || [];

  return (
    <div>
      <Table>
        <TableCaption>All Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: UserType) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {session?.user.role?.toUpperCase() === "ADMIN" &&
                session.user.id === user.id ? (
                  <span className="text-sm font-medium text-muted-foreground">
                    Me
                  </span>
                ) : user.status === "ACTIVE" ? (
                  <Button
                    className="bg-red-500 text-white"
                    disabled={isPending}
                    onClick={() =>
                      updateUserStatus({ id: user.id, status: "BLOCKED" })
                    }
                  >
                    {isPending ? "Blocking..." : "Block"}
                  </Button>
                ) : (
                  <Button
                    className="bg-green-500 text-white"
                    disabled={isPending}
                    onClick={() =>
                      updateUserStatus({ id: user.id, status: "ACTIVE" })
                    }
                  >
                    {isPending ? "Activating..." : "Activate"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
