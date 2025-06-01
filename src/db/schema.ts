import {
  integer,
  decimal,
  pgTable,
  varchar,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  dateOfBirth: date().notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }).notNull().defaultNow(),
});

export const userBalanceTable = pgTable("user_balance", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .unique()
    .references(() => usersTable.id),
  balance: decimal({ precision: 12, scale: 2 }).notNull().default("0.00"),
});

export const userCardsTable = pgTable("user_cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  cardNumber: varchar({ length: 20 }).notNull(),
  expirationDate: date().notNull(),
  cvv: varchar({ length: 3 }).notNull(),
});

export const userContactsTable = pgTable("user_contacts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  contactId: integer()
    .notNull()
    .references(() => usersTable.id),
});

export const userHistoryTable = pgTable("user_history", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fromUserId: integer()
    .notNull()
    .references(() => usersTable.id),
  toUserId: integer()
    .notNull()
    .references(() => usersTable.id),
  amount: decimal({ precision: 12, scale: 2 }).notNull(),
  note: varchar({ length: 255 }),
  type: varchar({ length: 10 }).notNull(),
  status: varchar({ length: 10 }).notNull(),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
});
