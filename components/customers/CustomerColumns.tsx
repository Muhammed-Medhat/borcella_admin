"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "clerkId",
    header: "ClerkId",
  },
  {
    accessorKey: "name",
    header: "Names",
  },
  {
    accessorKey: "email",
    header: "Emails",
  },
];