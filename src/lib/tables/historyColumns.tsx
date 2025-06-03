"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { ArrowUpRight, ArrowDownLeft, ArrowUpDown } from "lucide-react";

export type AccountHistory = {
  type: string;
  note: string | null;
  createdAt: Date;
  amount: string;
  status: string;
  fromUser: {
    firstName: string;
    lastName: string;
  } | null;
  toUser: {
    firstName: string;
    lastName: string;
  } | null;
};

export const columnsHistory: ColumnDef<AccountHistory>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      switch (type) {
        case "SEND": {
          return (
            <div className="w-[32px] h-[32px] flex justify-center items-center rounded-full">
              <ArrowUpRight className="text-red-800" />
            </div>
          );
        }
        case "RECEIVED": {
          return (
            <div className="w-[32px] h-[32px] flex justify-center items-center rounded-full">
              <ArrowDownLeft className="text-blue-800" />
            </div>
          );
        }
      }
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const type = row.getValue("type");
      const toUser = row.original.toUser;
      const fromUser = row.original.fromUser;

      if (type === "SEND" && toUser) {
        return `${toUser.firstName} ${toUser.lastName}`;
      }
      if (type === "RECEIVED" && fromUser) {
        return `${fromUser.firstName} ${fromUser.lastName}`;
      }
      return "";
    },
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => {
      const note = row.getValue("note") as string | null;
      if (!note) return "";
      return note.length > 30 ? note.slice(0, 30) + "…" : note;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      const formatted = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return formatted;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type = row.getValue("type");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      switch (type) {
        case "SEND": {
          return `-${formatted}`;
        }
        case "RECEIVED": {
          return `+${formatted}`;
        }
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      switch (status) {
        case "SUCCESS": {
          return (
            <div className="text-green-800 bg-green-200 rounded-sm text-center py-1 px-2 font-medium">
              Success
            </div>
          );
        }
        case "CANCELLED": {
          return (
            <div className="text-red-800 bg-red-200 rounded-sm text-center py-1 px-2 font-medium">
              Success
            </div>
          );
        }
        case "PENDING": {
          return (
            <div className="text-gray-800 bg-gray-200 rounded-sm text-center py-1 px-2 font-medium">
              Success
            </div>
          );
        }
      }
    },
  },
];

export const customColumnsHistory: ColumnDef<AccountHistory>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type");
      switch (type) {
        case "SEND": {
          return (
            <div className="w-[32px] h-[32px] flex justify-center items-center rounded-full">
              <ArrowUpRight className="text-red-800" />
            </div>
          );
        }
        case "RECEIVED": {
          return (
            <div className="w-[32px] h-[32px] flex justify-center items-center rounded-full">
              <ArrowDownLeft className="text-blue-800" />
            </div>
          );
        }
      }
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const type = row.getValue("type");
      const toUser = row.original.toUser;
      const fromUser = row.original.fromUser;

      if (type === "SEND" && toUser) {
        return `${toUser.firstName} ${toUser.lastName}`;
      }
      if (type === "RECEIVED" && fromUser) {
        return `${fromUser.firstName} ${fromUser.lastName}`;
      }
      return "";
    },
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => {
      const note = row.getValue("note") as string | null;
      if (!note) return "";
      return note.length > 30 ? note.slice(0, 30) + "…" : note;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      const formatted = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return formatted;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type = row.getValue("type");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      switch (type) {
        case "SEND": {
          return `-${formatted}`;
        }
        case "RECEIVED": {
          return `+${formatted}`;
        }
      }
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      switch (status) {
        case "SUCCESS": {
          return (
            <div className="text-green-800 bg-green-200 rounded-sm text-center py-1 px-2 font-medium">
              Success
            </div>
          );
        }
        case "CANCELLED": {
          return (
            <div className="text-red-800 bg-red-200 rounded-sm text-center py-1 px-2 font-medium">
              Success
            </div>
          );
        }
        case "PENDING": {
          return (
            <div className="text-gray-800 bg-gray-200 rounded-sm text-center py-1 px-2 font-medium">
              Success
            </div>
          );
        }
      }
    },
  },
];
