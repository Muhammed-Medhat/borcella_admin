"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "productTitle",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original.product;
      return product ? (
        <Link href={`/products/${product.id}`} className="hover:text-red-1">
          {row.original.productTitle}
        </Link>
      ) : (
        "No product available"
      );
    }
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
